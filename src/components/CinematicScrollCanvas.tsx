"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  AVIF_PROBE,
  FRAME_SIZE,
  MOBILE_MEDIA,
  TOTAL_FRAMES,
  framePath,
  stillPath,
  type FrameVariant,
} from "@/lib/frames";
import { FrameSequenceLoader, type FrameImage } from "@/lib/frame-loader";
import {
  SCENE_MARKERS,
  progressToFrame,
  getSceneOverlayState,
} from "@/lib/scenes";

interface CinematicScrollCanvasProps {
  height?: string;
  onExploreMore?: () => void;
  className?: string;
}

const KEYFRAMES = SCENE_MARKERS.map((s) => s.keyframe);

// Share of the remaining distance to the target frame covered per 60 Hz frame
const EASE_PER_FRAME = 0.22;

// Must cover the loader's decode window (24 ahead + 8 behind + current) plus the 5 keyframes
const MAX_DECODED: Record<FrameVariant, number> = { desktop: 48, mobile: 40 };

let avifSupport: Promise<boolean> | undefined;
function supportsAvif() {
  avifSupport ??= new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth > 0);
    img.onerror = () => resolve(false);
    img.src = AVIF_PROBE;
  });
  return avifSupport;
}

/** Show only the scene keyframes, without the camera motion between them. */
function prefersStills() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return (
    connection?.saveData === true ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function frameUrls(variant: FrameVariant, stills: boolean, avif: boolean) {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    if (avif && !stills) return framePath(variant, i);
    if (!KEYFRAMES.includes(i)) return null;
    return avif ? framePath(variant, i) : stillPath(variant, i);
  });
}

export const CinematicScrollCanvas: React.FC<CinematicScrollCanvasProps> = ({
  height = "700vh",
  onExploreMore,
  className = "",
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Only the rare changes live in React state; per-frame updates are written straight to the DOM
  const [activeSceneNumber, setActiveSceneNumber] = useState<number | null>(1);
  const [isNearEnd, setIsNearEnd] = useState(false);

  // Smooth scroll to a specific scene checkpoint (via navigation pips)
  const jumpToScene = useCallback((sceneNumber: number) => {
    const cp = SCENE_MARKERS.find((s) => s.number === sceneNumber);
    if (!cp || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const containerTop = rect.top + scrollTop;
    const scrollableDistance = rect.height - window.innerHeight;

    const targetProgress = (cp.pStart + cp.pEnd) / 2;
    const targetScrollY = containerTop + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  }, []);

  const handleNextClick = useCallback(() => {
    if (activeSceneNumber !== null && activeSceneNumber < 5) {
      jumpToScene(activeSceneNumber + 1);
    } else if (onExploreMore) {
      onExploreMore();
      const nextSection =
        document.getElementById("room") || document.getElementById("suites");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }
  }, [activeSceneNumber, jumpToScene, onExploreMore]);

  // Jump straight past the intro, without playing the whole sequence on the way
  const skipIntro = useCallback(() => {
    const section = containerRef.current;
    if (!section) return;
    window.scrollTo({ top: section.offsetTop + section.offsetHeight, behavior: "instant" });
  }, []);

  useEffect(() => {
    const section = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!section || !canvas || !ctx) return;

    const mobileQuery = window.matchMedia(MOBILE_MEDIA);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let variant: FrameVariant = mobileQuery.matches ? "mobile" : "desktop";
    let stills = prefersStills();
    let avif: boolean | null = null; // unknown until the probe answers
    let loader: FrameSequenceLoader | null = null;
    let unsubscribe = () => {};
    let disposed = false;

    let sectionTop = 0;
    let scrollable = 1;
    let target = 0; // frame the scroll position asks for (fractional during transitions)
    let display = 0; // eased playhead chasing the target
    let lastDrawn = -1; // frame on the canvas, -1 when blank
    let direction: 1 | -1 = 1;
    let lastScrollY = window.scrollY;
    let lastTime = 0;
    let rafId = 0;
    let activeScene: number | null = 1;
    let nearEnd = false;
    const overlayOpacity: number[] = SCENE_MARKERS.map((_, i) => (i === 0 ? 1 : 0));

    const progressAt = (scrollY: number) =>
      Math.min(1, Math.max(0, (scrollY - sectionTop) / scrollable));

    const measure = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollable = Math.max(1, rect.height - window.innerHeight);
    };

    // Cover-fit, centred, like object-fit: cover on the poster underneath
    const draw = (image: FrameImage) => {
      const iw = image instanceof HTMLImageElement ? image.naturalWidth : image.width;
      const ih = image instanceof HTMLImageElement ? image.naturalHeight : image.height;
      const scale = Math.max(canvas.width / iw, canvas.height / ih);
      const sw = canvas.width / scale;
      const sh = canvas.height / scale;
      ctx.drawImage(image, (iw - sw) / 2, (ih - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
      canvas.style.opacity = "1";
    };

    // The backing store holds only as many pixels as the visible part of the frame has, capped at the
    // screen's density: drawing stays a ~1:1 copy and the browser scales the canvas up for free.
    const sizeCanvas = () => {
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (!cssW || !cssH) return;
      const { width, height } = FRAME_SIZE[variant];
      const cover = Math.max(cssW / width, cssH / height);
      const density = Math.min(window.devicePixelRatio || 1, 1 / cover);
      const w = Math.round(cssW * density);
      const h = Math.round(cssH * density);
      if (canvas.width === w && canvas.height === h) return;

      canvas.width = w;
      canvas.height = h;
      // Resizing clears the canvas: repaint now rather than flash black until the next frame
      lastDrawn = -1;
      const frame = loader?.getFrame(Math.round(display), -1);
      if (frame) {
        draw(frame.image);
        lastDrawn = frame.index;
      }
    };

    const updateOverlays = (progress: number) => {
      const { activeSceneNumber: active, opacity } = getSceneOverlayState(progress);
      SCENE_MARKERS.forEach((scene, i) => {
        const el = overlayRefs.current[i];
        const value = scene.number === active ? Math.round(opacity * 1000) / 1000 : 0;
        if (!el || value === overlayOpacity[i]) return;
        overlayOpacity[i] = value;
        const visible = value > 0.02;
        el.style.opacity = String(value);
        el.style.transform = `translateY(${Math.round((1 - value) * 8)}px)`;
        el.style.visibility = visible ? "visible" : "hidden";
        el.setAttribute("aria-hidden", String(!visible));
      });

      if (active !== activeScene) {
        activeScene = active;
        setActiveSceneNumber(active);
      }
      const end = progress > 0.92;
      if (end !== nearEnd) {
        nearEnd = end;
        setIsNearEnd(end);
      }
    };

    const requestTick = () => {
      if (!rafId && !disposed) rafId = requestAnimationFrame(tick);
    };

    const tick = (now: number) => {
      rafId = 0;

      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY) {
        direction = scrollY > lastScrollY ? 1 : -1;
        lastScrollY = scrollY;
      }
      const progress = progressAt(scrollY);
      const nextTarget = progressToFrame(progress);
      if (nextTarget !== target) {
        target = nextTarget;
        loader?.setPlayhead(target, direction);
      }
      updateOverlays(progress);

      if (stills) {
        display = target;
      } else {
        // Frame-rate independent, so it feels the same at 60 Hz and 120 Hz
        const dt = lastTime ? Math.min(now - lastTime, 100) : 1000 / 60;
        display += (target - display) * (1 - Math.pow(1 - EASE_PER_FRAME, dt / (1000 / 60)));
        if (Math.abs(target - display) < 0.05) display = target;
      }

      const wanted = Math.round(display);
      if (loader && wanted !== lastDrawn) {
        // Stills cut to the nearest scene; the sequence never steps back against the scroll
        const frame = loader.getFrame(wanted, stills ? -1 : lastDrawn);
        if (frame && frame.index !== lastDrawn) {
          draw(frame.image);
          lastDrawn = frame.index;
        }
      }

      // Run only while easing. Scrolling, resizing and newly decoded frames restart the loop, so it
      // costs nothing once the hero is settled or scrolled out of view.
      if (display !== target) {
        lastTime = now;
        requestTick();
      } else {
        lastTime = 0;
      }
    };

    const startLoader = () => {
      if (avif === null) return;
      unsubscribe();
      loader?.destroy();
      loader = new FrameSequenceLoader(frameUrls(variant, stills, avif), {
        pinned: KEYFRAMES,
        maxDecoded: MAX_DECODED[variant],
      });
      unsubscribe = loader.subscribe(requestTick);
      loader.setPlayhead(target, direction);
      lastDrawn = -1;
      requestTick();
    };

    const onScroll = () => requestTick();
    const onResize = () => {
      measure();
      sizeCanvas();
      requestTick();
    };
    const onVariantChange = () => {
      variant = mobileQuery.matches ? "mobile" : "desktop";
      sizeCanvas();
      startLoader();
    };
    const onMotionChange = () => {
      stills = prefersStills();
      startLoader();
    };

    measure();
    sizeCanvas();
    // The page may open part-way down (reload, back button)
    target = display = progressToFrame(progressAt(window.scrollY));

    void supportsAvif().then((supported) => {
      if (disposed) return;
      avif = supported;
      startLoader();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mobileQuery.addEventListener("change", onVariantChange);
    motionQuery.addEventListener("change", onMotionChange);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(section);
    requestTick();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mobileQuery.removeEventListener("change", onVariantChange);
      motionQuery.removeEventListener("change", onMotionChange);
      resizeObserver.disconnect();
      unsubscribe();
      loader?.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience" // the header waits for this section's end before showing its links
      style={{ height }}
      // pb-10: a strip of black after the pinned frames for the next section's rounded top to rise over
      className={`relative w-full bg-black pb-10 ${className}`}
      aria-label="ZOD Living Cinematic Experience"
    >
      {/* Pinned Viewport Container */}
      <div className="hero-viewport sticky top-0 w-full overflow-hidden bg-black select-none">
        {/* First frame as plain HTML, so it shows before JavaScript runs; the canvas covers it once drawing */}
        <picture>
          <source media={MOBILE_MEDIA} type="image/avif" srcSet={framePath("mobile", 0)} />
          <source media={MOBILE_MEDIA} srcSet={stillPath("mobile", 0)} />
          <source type="image/avif" srcSet={framePath("desktop", 0)} />
          <img
            src={stillPath("desktop", 0)}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* Main GPU Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Cinematic architectural sequence scroll animation"
          className="absolute inset-0 block h-full w-full"
          style={{ opacity: 0 }}
        />

        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-radial-[at_center_center] from-transparent via-transparent to-black/50" />

        {/* Five Scene Text Overlays (shown at checkpoints, hidden during transit; driven from the scroll loop) */}
        {SCENE_MARKERS.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            // Phones: centred at the bottom for every scene, matching the centred frame crop.
            // From sm up: each scene's own placement.
            className={`pointer-events-none absolute z-20 flex flex-col max-w-[440px] px-6 sm:px-0 transition-transform duration-300 ease-out inset-x-0 mx-auto bottom-[14%] items-center text-center sm:inset-x-auto sm:mx-0 ${
              scene.placement.desktopContainerClass
            }`}
            style={{
              opacity: i === 0 ? 1 : 0,
              transform: `translateY(${i === 0 ? 0 : 8}px)`,
              visibility: i === 0 ? "visible" : "hidden",
            }}
            aria-hidden={i !== 0}
          >
            {/* Eyebrow */}
            <span className="cinematic-shadow tracking-[0.24em] text-xs sm:text-[13px] font-semibold uppercase text-gold mb-2 sm:mb-3">
              {scene.eyebrow}
            </span>

            {/* Heading */}
            <h2 className="cinematic-shadow text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#FBFBFA] leading-[1.12]">
              {scene.heading}
            </h2>

            {/* Supporting text */}
            <p className="cinematic-shadow text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed mt-2 sm:mt-3">
              {scene.supportingText}
            </p>
          </div>
        ))}

        {/* Scene Navigation Rail (Pips) */}
        <nav
          aria-label="Scene checkpoints"
          className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5 items-end"
        >
          {SCENE_MARKERS.map((scene) => {
            const isActive = activeSceneNumber === scene.number;
            return (
              <button
                key={scene.id}
                onClick={() => jumpToScene(scene.number)}
                className="group flex items-center gap-3 py-1 cursor-pointer"
                aria-label={`Jump to Scene ${scene.number}: ${scene.label}`}
                title={scene.label}
              >
                <span
                  className={`text-[11px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-gold opacity-100 translate-x-0"
                      : "text-neutral-400 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                  } hidden sm:inline-block`}
                >
                  0{scene.number} {scene.label}
                </span>
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "h-2.5 w-2.5 bg-gold shadow-[0_0_10px_#D4AF37]"
                      : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/80 group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Skip the intro (top right on phones, clear of the scroll prompter; bottom right on desktop) */}
        <button
          type="button"
          onClick={skipIntro}
          className={`absolute right-4 top-20 sm:top-auto sm:bottom-8 sm:right-10 z-30 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-200 backdrop-blur-md transition-[opacity,color,border-color] duration-300 cursor-pointer hover:border-gold/60 hover:text-gold ${
            isNearEnd ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          tabIndex={isNearEnd ? -1 : undefined}
        >
          Skip intro ↓
        </button>

        {/* Minimalist Bottom Scroll Prompter */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            onClick={handleNextClick}
            className="group flex flex-col items-center gap-2 cursor-pointer"
            aria-label={isNearEnd ? "Explore ZOD Living suites" : "Scroll to continue"}
          >
            <span className="cinematic-shadow text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-neutral-300 group-hover:text-gold transition-colors">
              {isNearEnd ? "Explore ZOD Living ↓" : "Scroll to Experience"}
            </span>
            <div className="h-6 w-3.5 border border-white/25 rounded-full flex justify-center p-0.5 group-hover:border-gold/60 transition-colors">
              <div className="h-1.5 w-1 bg-gold rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollCanvas;
