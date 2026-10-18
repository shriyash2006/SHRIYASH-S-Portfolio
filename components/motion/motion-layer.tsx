"use client";

import * as React from "react";
import { CursorGatherCanvas } from "@/components/motion/cursor-gather-canvas";

const interactiveSelector = "a, button, [role='button'], [data-cursor]";
const revealSelector = "main > section, [data-reveal]";

function getInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>(interactiveSelector);
}

function getCursorLabel(element: HTMLElement) {
  const explicitLabel = element.dataset.cursor;
  if (explicitLabel) return explicitLabel.toUpperCase();
  return element.tagName === "BUTTON" ? "CLICK" : "OPEN";
}

export function MotionLayer() {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const cursorDotRef = React.useRef<HTMLDivElement>(null);
  const cursorLabelRef = React.useRef<HTMLSpanElement>(null);
  const progressLabelRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Wait for hydration to complete before adding motion classes
    // This prevents hydration mismatches
    const initMotion = () => {
      root.classList.add("motion-ready");

      const observer =
        !prefersReducedMotion && "IntersectionObserver" in window
          ? new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer?.unobserve(entry.target);
                  }
                });
              },
              { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
            )
          : null;

      const seenElements = new WeakSet<HTMLElement>();
      let revealIndex = 0;

      const register = (element: HTMLElement) => {
        if (seenElements.has(element)) return;
        seenElements.add(element);
        element.dataset.reveal = "";
        element.style.setProperty("--reveal-delay", `${Math.min((revealIndex++ % 5) * 55, 220)}ms`);

        if (prefersReducedMotion || !observer) {
          element.classList.add("is-visible");
        } else {
          observer.observe(element);
        }
      };

      const scan = (node: ParentNode) => {
        if (node instanceof Element && node.matches(revealSelector)) {
          register(node as HTMLElement);
        }
        node.querySelectorAll<HTMLElement>(revealSelector).forEach(register);
      };

      scan(document);

      const mutations = new MutationObserver((records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) scan(node);
          });
        });
      });
      mutations.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer?.disconnect();
        mutations.disconnect();
        root.classList.remove("motion-ready");
      };
    };

    // Defer motion initialization to after hydration
    const cleanup = initMotion();
    
    return cleanup;
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    let frame: number | null = null;

    const updateScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1) : 0;
      root.style.setProperty("--scroll-progress", progress.toString());
      if (progressLabelRef.current) {
        progressLabelRef.current.textContent = `${Math.round(progress * 100)
          .toString()
          .padStart(3, "0")}%`;
      }
      frame = null;
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorLabel = cursorLabelRef.current;

    if (prefersReducedMotion || !finePointer || !cursor || !cursorDot || !cursorLabel) return;

    root.classList.add("has-custom-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(animateCursor);
    };

    const setCursorVisibility = (visible: boolean) => {
      cursor.dataset.visible = visible ? "true" : "false";
      cursorDot.dataset.visible = visible ? "true" : "false";
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setCursorVisibility(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const interactive = getInteractiveElement(event.target);
      if (!interactive) return;
      cursor.dataset.active = "true";
      cursorLabel.textContent = getCursorLabel(interactive);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const currentInteractive = getInteractiveElement(event.target);
      const nextInteractive = getInteractiveElement(event.relatedTarget);
      if (!currentInteractive || currentInteractive === nextInteractive) return;
      cursor.dataset.active = "false";
      cursorLabel.textContent = "";
    };

    const handlePointerLeave = () => setCursorVisibility(false);

    frame = window.requestAnimationFrame(animateCursor);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <CursorGatherCanvas />
      <div className="scroll-progress" aria-hidden="true" />

      <aside className="scroll-rail" aria-hidden="true">
        <span className="scroll-rail__label">READING</span>
        <span className="scroll-rail__track">
          <span className="scroll-rail__fill" />
        </span>
        <span ref={progressLabelRef} className="scroll-rail__value">
          000%
        </span>
      </aside>

      <div ref={cursorRef} className="cursor-follower" data-active="false" data-visible="false" aria-hidden="true">
        <span ref={cursorLabelRef} className="cursor-follower__label" />
      </div>
      <div ref={cursorDotRef} className="cursor-follower__dot" data-visible="false" aria-hidden="true" />
    </>
  );
}
