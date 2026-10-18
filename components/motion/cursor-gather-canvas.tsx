"use client";

import * as React from "react";

type Point = { x: number; y: number };

type OrbitParticle = {
  angle: number;
  orbit: 0 | 1;
  phase: number;
  size: number;
  startRadius: number;
  accent: boolean;
};

const TAU = Math.PI * 2;
const IDLE_DELAY = 420;
const ENTER_DURATION = 560;
const EXIT_DURATION = 380;
const MOVEMENT_THRESHOLD = 4;
const PARTICLE_COUNT = 24;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - clamp(value, 0, 1), 3);
}

function createParticles(): OrbitParticle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
    angle: (index / PARTICLE_COUNT) * TAU + (index % 3) * 0.045,
    orbit: (index % 2) as 0 | 1,
    phase: index * 0.71,
    size: index % 6 === 0 ? 3 : index % 3 === 0 ? 2.25 : 1.6,
    startRadius: 164 + (index % 5) * 23,
    accent: index % 6 === 0,
  }));
}

function getForegroundColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#000000";
}

function getOrbitPoint(target: Point, particle: OrbitParticle, time: number): Point {
  const direction = particle.orbit === 0 ? 1 : -1;
  const angle = particle.angle + time * 0.00034 * direction;
  const centerX = target.x + (particle.orbit === 0 ? -17 : 17);
  const centerY = target.y + Math.sin(time * 0.001 + particle.phase) * 1.5;
  const radiusX = particle.orbit === 0 ? 76 : 70;
  const radiusY = particle.orbit === 0 ? 30 : 39;
  const rotation = particle.orbit === 0 ? -0.28 : 0.28;
  const ellipseX = Math.cos(angle) * radiusX;
  const ellipseY = Math.sin(angle) * radiusY;

  return {
    x: centerX + ellipseX * Math.cos(rotation) - ellipseY * Math.sin(rotation),
    y: centerY + ellipseX * Math.sin(rotation) + ellipseY * Math.cos(rotation),
  };
}

export function CursorGatherCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (hover: hover)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles = createParticles();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let target: Point = { x: width / 2, y: height / 2 };
    let previousPointer: Point | null = null;
    let foreground = getForegroundColor();
    let idleTimer: number | null = null;
    let animationFrame: number | null = null;
    let activationTime = 0;
    let exitTime: number | null = null;
    let active = false;
    let isDisposed = false;

    const clearCanvas = () => {
      context.clearRect(0, 0, width, height);
    };

    const cancelIdleTimer = () => {
      if (idleTimer !== null) {
        window.clearTimeout(idleTimer);
        idleTimer = null;
      }
    };

    const cancelAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const deviceScale = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
      clearCanvas();
    };

    const drawOrbit = (
      centerX: number,
      centerY: number,
      radiusX: number,
      radiusY: number,
      rotation: number,
      startAngle: number,
      endAngle: number,
      lineWidth: number,
      opacity: number,
      dashOffset = 0
    ) => {
      context.save();
      context.strokeStyle = foreground;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.globalAlpha = opacity;
      context.setLineDash([72, 18]);
      context.lineDashOffset = dashOffset;
      context.beginPath();
      context.ellipse(centerX, centerY, radiusX, radiusY, rotation, startAngle, endAngle);
      context.stroke();
      context.restore();
    };

    const drawSignatureStructure = (now: number, opacity: number, gatherProgress: number) => {
      const pulse = Math.sin(now * 0.002) * 1.8;
      const orbitVisibility = opacity * (0.24 + gatherProgress * 0.76);
      const dashOffset = -now * 0.025;

      // The two interlocking loops echo an SS monogram while staying abstract.
      drawOrbit(target.x - 17, target.y, 76 + pulse, 30, -0.28, 0.12, TAU - 0.22, 1.7, 0.64 * orbitVisibility, dashOffset);
      drawOrbit(target.x + 17, target.y, 70 + pulse, 39, 0.28, 0.28, TAU - 0.08, 1.35, 0.38 * orbitVisibility, -dashOffset * 0.82);

      // A low-opacity ghost orbit gives the mark depth without using a blur filter.
      drawOrbit(target.x, target.y, 94 + pulse, 50, -0.04, 0.45, TAU - 0.7, 4.5, 0.055 * orbitVisibility, dashOffset * 0.5);

      context.save();
      context.strokeStyle = foreground;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.globalAlpha = 0.72 * orbitVisibility;
      context.lineWidth = 1.9;
      context.beginPath();
      context.moveTo(target.x - 92, target.y + 5);
      context.bezierCurveTo(target.x - 65, target.y + 42, target.x + 12, target.y + 42, target.x + 78, target.y - 13);
      context.bezierCurveTo(target.x + 89, target.y - 22, target.x + 99, target.y - 19, target.x + 104, target.y - 8);
      context.stroke();
      context.restore();

      // Technical crosshair and central node make the gathered point feel intentional.
      context.save();
      context.strokeStyle = foreground;
      context.fillStyle = foreground;
      context.lineWidth = 1;
      context.globalAlpha = 0.42 * orbitVisibility;
      context.beginPath();
      context.arc(target.x, target.y, 8 + pulse * 0.25, 0, TAU);
      context.moveTo(target.x - 19, target.y);
      context.lineTo(target.x - 11, target.y);
      context.moveTo(target.x + 11, target.y);
      context.lineTo(target.x + 19, target.y);
      context.moveTo(target.x, target.y - 19);
      context.lineTo(target.x, target.y - 11);
      context.moveTo(target.x, target.y + 11);
      context.lineTo(target.x, target.y + 19);
      context.stroke();
      context.globalAlpha = 0.9 * orbitVisibility;
      context.beginPath();
      context.arc(target.x, target.y, 2.4, 0, TAU);
      context.fill();
      context.restore();

      // Small square nodes reinforce the portfolio's architectural language.
      [
        { x: target.x - 92, y: target.y + 5 },
        { x: target.x + 78, y: target.y - 13 },
        { x: target.x - 17 - 76, y: target.y },
        { x: target.x + 17 + 70, y: target.y },
      ].forEach((node, index) => {
        context.save();
        context.strokeStyle = foreground;
        context.globalAlpha = (index < 2 ? 0.72 : 0.48) * orbitVisibility;
        context.lineWidth = index < 2 ? 1.5 : 1;
        context.strokeRect(node.x - 2.5, node.y - 2.5, 5, 5);
        context.restore();
      });
    };

    const drawParticle = (particle: OrbitParticle, point: Point, opacity: number, now: number) => {
      context.save();
      context.translate(point.x, point.y);
      context.rotate(particle.angle + now * 0.0002);
      context.strokeStyle = foreground;
      context.fillStyle = foreground;
      context.lineWidth = particle.accent ? 1.35 : 1;
      context.globalAlpha = opacity;

      if (particle.accent) {
        context.beginPath();
        context.moveTo(-particle.size, 0);
        context.lineTo(particle.size, 0);
        context.moveTo(0, -particle.size);
        context.lineTo(0, particle.size);
        context.stroke();
      } else {
        context.beginPath();
        context.arc(0, 0, particle.size / 2, 0, TAU);
        context.fill();
      }
      context.restore();
    };

    const drawScene = (now: number) => {
      if (isDisposed) return;

      const elapsed = now - activationTime;
      const gatherProgress = active ? easeOutCubic(elapsed / ENTER_DURATION) : 1;
      const fadeProgress = exitTime === null ? 1 : 1 - easeOutCubic((now - exitTime) / EXIT_DURATION);
      const opacity = fadeProgress;
      clearCanvas();

      if (opacity <= 0.001) {
        cancelAnimation();
        exitTime = null;
        return;
      }

      drawSignatureStructure(now, opacity, gatherProgress);

      particles.forEach((particle, index) => {
        const destination = getOrbitPoint(target, particle, now);
        const startAngle = particle.angle + (index % 2 === 0 ? 0.2 : -0.2);
        const start = {
          x: target.x + Math.cos(startAngle) * particle.startRadius,
          y: target.y + Math.sin(startAngle) * particle.startRadius,
        };
        const point = {
          x: start.x + (destination.x - start.x) * gatherProgress,
          y: start.y + (destination.y - start.y) * gatherProgress,
        };

        drawParticle(particle, point, (particle.accent ? 0.95 : 0.72) * opacity, now);

        if (gatherProgress < 0.98) {
          context.save();
          context.strokeStyle = foreground;
          context.globalAlpha = 0.12 * opacity * (1 - gatherProgress);
          context.lineWidth = 1;
          context.setLineDash([3, 8]);
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(destination.x, destination.y);
          context.stroke();
          context.restore();
        }
      });

      animationFrame = window.requestAnimationFrame(drawScene);
    };

    const beginAnimation = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(drawScene);
    };

    const fadeOut = (now: number) => {
      active = false;
      exitTime = now;
      beginAnimation();
    };

    const activate = () => {
      if (isDisposed || reducedMotionQuery.matches || !mediaQuery.matches) return;
      active = true;
      exitTime = null;
      activationTime = performance.now();
      beginAnimation();
    };

    const scheduleActivation = () => {
      cancelIdleTimer();
      idleTimer = window.setTimeout(activate, IDLE_DELAY);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotionQuery.matches || !mediaQuery.matches) return;

      const nextTarget = { x: event.clientX, y: event.clientY };
      const movement = previousPointer
        ? Math.hypot(nextTarget.x - previousPointer.x, nextTarget.y - previousPointer.y)
        : MOVEMENT_THRESHOLD + 1;
      target = nextTarget;
      previousPointer = nextTarget;

      if (movement > MOVEMENT_THRESHOLD) {
        cancelIdleTimer();
        if (active) fadeOut(performance.now());
        scheduleActivation();
      }
    };

    const handlePointerLeave = () => {
      cancelIdleTimer();
      previousPointer = null;
      if (active) fadeOut(performance.now());
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handlePointerLeave();
    };

    const handleCapabilityChange = () => {
      if (!mediaQuery.matches || reducedMotionQuery.matches) {
        handlePointerLeave();
        cancelAnimation();
        clearCanvas();
      }
    };

    const handleThemeChange = () => {
      foreground = getForegroundColor();
    };

    resizeCanvas();
    mediaQuery.addEventListener("change", handleCapabilityChange);
    reducedMotionQuery.addEventListener("change", handleCapabilityChange);
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      isDisposed = true;
      cancelIdleTimer();
      cancelAnimation();
      mediaQuery.removeEventListener("change", handleCapabilityChange);
      reducedMotionQuery.removeEventListener("change", handleCapabilityChange);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      themeObserver.disconnect();
      clearCanvas();
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-gather-canvas" aria-hidden="true" />;
}
