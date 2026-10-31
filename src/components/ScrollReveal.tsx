"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DURATION_MS = 800; // matches the transition in globals.css
const STAGGER_MS = 90;
// Later children of a long grid don't wait more than this many steps
const MAX_STAGGER_STEPS = 5;

/**
 * Fades content up as it scrolls into view: every `data-reveal` element, and the children of a
 * `data-reveal-stagger` container one after another. Styles live in globals.css. Content added
 * later (e.g. a filtered grid) is picked up too. Don't mark content that is visible on load, or it
 * will blink out before animating in.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");

    const timers: number[] = [];
    const watched = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add("is-revealed");
          // Once the fade has played, hand the element back to its own styles and transitions
          const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
          timers.push(window.setTimeout(() => el.classList.add("reveal-done"), DURATION_MS + delay + 50));
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const watch = (el: HTMLElement) => {
      if (watched.has(el) || el.classList.contains("reveal-done")) return;
      watched.add(el);
      observer.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(watch);
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        [...group.children].forEach((child, i) => {
          if (!(child instanceof HTMLElement) || watched.has(child)) return;
          child.style.setProperty("--reveal-delay", `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
          watch(child);
        });
      });
    };

    scan();
    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          scan();
        });
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
