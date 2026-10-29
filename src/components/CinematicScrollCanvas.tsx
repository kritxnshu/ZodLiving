"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FRAME_PATHS,
  FRAME_WIDTH,
  FRAME_HEIGHT,
} from "@/lib/frames";
import { ProgressiveFrameLoader } from "@/lib/frame-loader";
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

export const CinematicScrollCanvas: React.FC<CinematicScrollCanvasProps> = ({
  height = "700vh",
  onExploreMore,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<ProgressiveFrameLoader | null>(null);

  // Animation & Frame tracking refs
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);
  const isDirtyRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const lastScrollYRef = useRef<number>(0);
  const scrollDirectionRef = useRef<1 | -1>(1);

  // React state for overlay presentation
  const [activeSceneNumber, setActiveSceneNumber] = useState<number | null>(1);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(1);
  const [currentProgress, setCurrentProgress] = useState<number>(0);

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

  useEffect(() => {
    // 1. Accessibility: Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;

    const handleMotionPreference = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        currentFrameRef.current = targetFrameRef.current;
        isDirtyRef.current = true;
      }
    };
    mediaQuery.addEventListener("change", handleMotionPreference);

    // 2. Initialize Progressive Frame Loader with pinned keyframes
    const pinnedKeyframes = SCENE_MARKERS.map((s) => s.keyframe);
    const loader = new ProgressiveFrameLoader(FRAME_PATHS, pinnedKeyframes, 140, 6);
    loaderRef.current = loader;

    const unsubscribe = loader.subscribe((loadedIndex: number) => {
      const activeDisplay = Math.round(currentFrameRef.current);
      if (
        loadedIndex === activeDisplay ||
        lastRenderedIndexRef.current === -1 ||
        Math.abs(loadedIndex - activeDisplay) <= 1
      ) {
        isDirtyRef.current = true;
      }
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 3. Retina / High-DPI buffer sizing (capped at 2.0 DPR)
    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const displayWidth = Math.max(1, Math.round(rect.width * dpr));
      const displayHeight = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
        }
        isDirtyRef.current = true;
      }
    };

    updateCanvasDimensions();

    // 4. Drawing routine with aspect-ratio preserving cover fit
    const renderFrame = (img: HTMLImageElement) => {
      if (!canvas || !ctx) return;
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasW = canvas.width;
      const canvasH = canvas.height;
      if (canvasW === 0 || canvasH === 0) return;

      const imgW = img.naturalWidth || FRAME_WIDTH;
      const imgH = img.naturalHeight || FRAME_HEIGHT;
      const canvasAspect = canvasW / canvasH;
      const imgAspect = imgW / imgH;

      let sW = imgW;
      let sH = imgH;
      let sx = 0;
      let sy = 0;

      if (canvasAspect > imgAspect) {
        sH = imgW / canvasAspect;
        sy = (imgH - sH) / 2;
      } else {
        sW = imgH * canvasAspect;
        sx = (imgW - sW) / 2;
      }

      ctx.drawImage(img, sx, sy, sW, sH, 0, 0, canvasW, canvasH);
    };

    // 5. Scroll calculation: maps continuous native scroll to frame & overlay state
    const updateScrollState = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > lastScrollYRef.current) {
        scrollDirectionRef.current = 1;
      } else if (scrollY < lastScrollYRef.current) {
        scrollDirectionRef.current = -1;
      }
      lastScrollYRef.current = scrollY;

      const totalScrollableDistance = rect.height - viewportHeight;
      const currentScrollWithinSection = -rect.top;

      let p = 0;
      if (totalScrollableDistance > 0) {
        p = currentScrollWithinSection / totalScrollableDistance;
      }
      const clampedP = Math.max(0, Math.min(1, p));
      setCurrentProgress(clampedP);

      // Continuous transfer function maps progress to frame with natural plateaus
      const newTarget = progressToFrame(clampedP);
      if (newTarget !== targetFrameRef.current) {
        targetFrameRef.current = newTarget;
        isDirtyRef.current = true;

        loader.updatePriority(
          Math.round(newTarget),
          scrollDirectionRef.current
        );
      }

      // Check text visibility at checkpoints
      const { activeSceneNumber: sceneNum, opacity } = getSceneOverlayState(clampedP);
      setActiveSceneNumber(sceneNum);
      setOverlayOpacity(opacity);
    };

    updateScrollState();

    // 6. Animation tick with smooth interpolation
    const interpolationFactor = 0.22;

    const tick = () => {
      if (isReducedMotionRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        const delta = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(delta) < 0.05) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          currentFrameRef.current += delta * interpolationFactor;
          isDirtyRef.current = true;
        }
      }

      const displayIndex = Math.round(currentFrameRef.current);

      if (isDirtyRef.current || displayIndex !== lastRenderedIndexRef.current) {
        const img = loader.getClosestLoaded(displayIndex);
        if (img) {
          renderFrame(img);
          lastRenderedIndexRef.current = displayIndex;
          isDirtyRef.current = false;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // 7. Event listeners (pure native scrolling, zero timer interference)
    const handleScroll = () => {
      updateScrollState();
    };

    const handleResize = () => {
      updateCanvasDimensions();
      updateScrollState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionPreference);
      resizeObserver.disconnect();
      unsubscribe();
      loader.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height }}
      className={`relative w-full bg-black ${className}`}
      aria-label="ZOD Living Cinematic Experience"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black select-none">
        {/* Main GPU Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Cinematic architectural sequence scroll animation"
          className="absolute inset-0 block h-full w-full object-cover"
        />

        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-radial-[at_center_center] from-transparent via-transparent to-black/50" />

        {/* Five Scene Text Overlays (Rendered at exact checkpoints, hidden during transit) */}
        {SCENE_MARKERS.map((scene) => {
          const isThisScene = activeSceneNumber === scene.number;
          const currentOpacity = isThisScene ? overlayOpacity : 0;
          const isVisible = currentOpacity > 0.02;

          return (
            <div
              key={scene.id}
              className={`pointer-events-none absolute z-20 flex flex-col max-w-[440px] px-6 sm:px-0 transition-transform duration-300 ease-out ${
                scene.placement.desktopContainerClass
              }`}
              style={{
                opacity: currentOpacity,
                transform: `translateY(${Math.round((1 - currentOpacity) * 8)}px)`,
                visibility: isVisible ? "visible" : "hidden",
              }}
              aria-hidden={!isVisible}
            >
              {/* Eyebrow */}
              <span className="cinematic-shadow tracking-[0.24em] text-xs sm:text-[13px] font-semibold uppercase text-[#D4AF37] mb-2 sm:mb-3">
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
          );
        })}

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
                className="group flex items-center gap-3 py-1 cursor-pointer focus:outline-none"
                aria-label={`Jump to Scene ${scene.number}: ${scene.label}`}
                title={scene.label}
              >
                <span
                  className={`text-[11px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#D4AF37] opacity-100 translate-x-0"
                      : "text-neutral-400 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                  } hidden sm:inline-block`}
                >
                  0{scene.number} {scene.label}
                </span>
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "h-2.5 w-2.5 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                      : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/80 group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Minimalist Bottom Scroll Prompter */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <button
            onClick={handleNextClick}
            className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
            aria-label={
              currentProgress > 0.92
                ? "Explore ZOD Living suites"
                : "Scroll to continue"
            }
          >
            <span className="cinematic-shadow text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-neutral-300 group-hover:text-[#D4AF37] transition-colors">
              {currentProgress > 0.92
                ? "Explore ZOD Living ↓"
                : "Scroll to Experience"}
            </span>
            <div className="h-6 w-3.5 border border-white/25 rounded-full flex justify-center p-0.5 group-hover:border-[#D4AF37]/60 transition-colors">
              <div className="h-1.5 w-1 bg-[#D4AF37] rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicScrollCanvas;
