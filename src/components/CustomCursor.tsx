"use client";

import React, { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position refs for direct high-framerate animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const rafId = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    // Only mount on desktop pointer devices
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        ("ontouchstart" in window && !window.matchMedia("(hover: hover)").matches));

    if (isTouch) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Fast direct transform on inner dot for zero perceived latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor], [data-cursor-text]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        const tagName = interactiveEl.tagName.toLowerCase();
        const isInput =
          tagName === "input" || tagName === "textarea" || interactiveEl.isContentEditable;

        if (isInput) {
          setIsTextInput(true);
          setIsHovered(false);
          setCursorText(null);
          targetScaleRef.current = 0.4;
        } else {
          setIsTextInput(false);
          setIsHovered(true);

          const explicitText =
            interactiveEl.getAttribute("data-cursor-text") ||
            interactiveEl.getAttribute("data-cursor");

          if (
            explicitText &&
            explicitText !== "true" &&
            explicitText !== "pointer" &&
            explicitText !== "hover"
          ) {
            setCursorText(explicitText.toUpperCase());
            targetScaleRef.current = 1.9;
          } else {
            setCursorText(null);
            targetScaleRef.current = 1.6;
          }
        }
      } else {
        setIsHovered(false);
        setIsTextInput(false);
        setCursorText(null);
        targetScaleRef.current = 1;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      targetScaleRef.current = isHovered ? 1.3 : 0.85;

      // Spawn click ripple
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      targetScaleRef.current = isHovered ? (cursorText ? 1.9 : 1.6) : 1;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp physics loop (60-120fps)
    const animate = () => {
      // Lerp position: position += (target - position) * easing
      const ease = 0.17;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Lerp scale
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scaleRef.current})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isHovered, cursorText, isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Instant Precision Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -ml-[4px] -mt-[4px] z-[99999] rounded-full transition-opacity duration-300 ${
          isVisible && !isTextInput ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#D4AF37",
          boxShadow:
            "0 0 10px rgba(212, 175, 55, 0.95), 0 0 2px rgba(255, 255, 255, 0.9), 0 0 0 1px rgba(0,0,0,0.4)",
          transform: `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`,
          willChange: "transform",
        }}
      />

      {/* 2. Fluid Trailing Luxury Circle Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -ml-[22px] -mt-[22px] z-[99998] flex items-center justify-center rounded-full transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "44px",
          height: "44px",
          border: isHovered
            ? "1.5px solid rgba(212, 175, 55, 0.95)"
            : "1.5px solid rgba(212, 175, 55, 0.55)",
          backgroundColor: isHovered
            ? "rgba(212, 175, 55, 0.12)"
            : "rgba(212, 175, 55, 0.03)",
          boxShadow: isHovered
            ? "0 0 25px rgba(212, 175, 55, 0.45), inset 0 0 12px rgba(212, 175, 55, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.35)"
            : "0 0 14px rgba(212, 175, 55, 0.25), inset 0 0 6px rgba(212, 175, 55, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.3)",
          backdropFilter: isHovered ? "blur(2px)" : "none",
          transform: `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scaleRef.current})`,
          willChange: "transform",
          transition:
            "border 240ms ease-out, background-color 240ms ease-out, box-shadow 240ms ease-out",
        }}
      >
        {/* Subtle rotating horology orbital particle on the ring circumference */}
        <div
          className={`absolute inset-0 rounded-full animate-spin pointer-events-none ${
            isHovered ? "opacity-30" : "opacity-80"
          }`}
          style={{ animationDuration: isHovered ? "4s" : "9s" }}
        >
          <div
            className="absolute top-0 left-1/2 -ml-[2px] -mt-[2px] rounded-full bg-[#E8CA7A]"
            style={{
              width: "4px",
              height: "4px",
              boxShadow: "0 0 6px rgba(232, 202, 122, 0.9)",
            }}
          />
        </div>

        {/* Optional Contextual Action Label inside circle */}
        {cursorText && (
          <span
            className="text-[8px] font-mono font-bold tracking-[0.22em] text-[#F3E5AB] uppercase select-none pointer-events-none transition-all duration-200"
            style={{
              textShadow:
                "0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(212,175,55,0.7)",
            }}
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* 3. Concentric Click Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[99997] rounded-full"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: "16px",
            height: "16px",
            marginLeft: "-8px",
            marginTop: "-8px",
            border: "1.5px solid rgba(212, 175, 55, 0.8)",
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.6)",
            animation: "cursorRipple 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
