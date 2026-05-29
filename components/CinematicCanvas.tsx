"use client";

import { clamp, getFallbackFrame, getFrameSrc } from "@/lib/frames";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

gsap.registerPlugin(ScrollTrigger);

type CinematicCanvasProps = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  mode?: "hero" | "showcase";
  folder?: string;
  frameCount?: number;
  align?: "left" | "right" | "center";
  /** Scroll progress (0–1) at which text begins to reveal. 0 = immediate. */
  textRevealAt?: number;
  children?: React.ReactNode;
};

export function CinematicCanvas({
  eyebrow,
  title,
  copy,
  mode = "hero",
  folder,
  frameCount = 160,
  align = "left",
  textRevealAt = 0,
  children,
}: CinematicCanvasProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 720px)");

  const fallbackFrame = getFallbackFrame(folder);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const copyEl = copyRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !section || !ctx) return;

    let disposed = false;

    imagesRef.current = [];
    targetFrame.current = 0;
    currentFrame.current = 0;

    // If text should be delayed, hide it initially
    if (copyEl && textRevealAt > 0) {
      gsap.set(copyEl, { opacity: 0, y: 60 });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(Math.round(currentFrame.current));
    };

    const draw = (index: number) => {
      const image = imagesRef.current[index];
      if (!image?.complete) return;

      const canvasRatio = window.innerWidth / window.innerHeight;
      const imageRatio = image.width / image.height;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let x = 0;
      let y = 0;

      if (imageRatio > canvasRatio) {
        height = window.innerHeight;
        width = height * imageRatio;
        x = (window.innerWidth - width) / 2;
      } else {
        width = window.innerWidth;
        height = width / imageRatio;
        y = (window.innerHeight - height) / 2;
      }

      ctx.fillStyle = "#02030a";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.drawImage(image, x, y, width, height);
    };

    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.18;
      draw(Math.round(currentFrame.current));
      rafRef.current = requestAnimationFrame(tick);
    };

    const loadImage = (index: number) => {
      if (imagesRef.current[index]) return;
      const image = new window.Image();
      image.decoding = "async";
      image.src = getFrameSrc(index + 1, folder);
      image.onload = () => {
        if (!disposed && index === 0) draw(0);
      };
      imagesRef.current[index] = image;
    };

    const eagerCount = mode === "hero" ? 38 : 24;
    for (let i = 0; i < Math.min(eagerCount, frameCount); i += 1) loadImage(i);

    const idle = window.setTimeout(() => {
      for (let i = eagerCount; i < frameCount; i += 1) loadImage(i);
    }, 500);

    resize();
    rafRef.current = requestAnimationFrame(tick);

    let textRevealed = false;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: mode === "hero" ? "+=220%" : "+=260%",
      pin: true,
      scrub: 0.65,
      onUpdate: (self) => {
        const progress = clamp(self.progress);
        targetFrame.current = progress * (frameCount - 1);

        // Reveal text after scroll threshold
        if (copyEl && textRevealAt > 0 && !textRevealed && progress >= textRevealAt) {
          textRevealed = true;
          gsap.to(copyEl, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        }
        // Hide text if user scrolls back up
        if (copyEl && textRevealAt > 0 && textRevealed && progress < textRevealAt * 0.8) {
          textRevealed = false;
          gsap.to(copyEl, {
            opacity: 0,
            y: 60,
            duration: 0.6,
            ease: "power2.in",
          });
        }
      },
    });

    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      clearTimeout(idle);
      window.removeEventListener("resize", resize);
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, mode, folder, frameCount, textRevealAt]);

  return (
    <section ref={sectionRef} className={`cinematic-section ${mode}`}>
      {isMobile ? (
        <Image src={fallbackFrame} alt="" fill priority className="cinematic-fallback" sizes="100vw" />
      ) : (
        <canvas ref={canvasRef} className="cinematic-canvas" aria-hidden="true" />
      )}
      <div className={`cinematic-vignette align-${align}`} />
      <div className="cinematic-grid" />
      {(title || copy || children) && (
        <div className="cinematic-copy" ref={copyRef}>
          <div className={`copy-inner align-${align}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h1>{title}</h1>}
            {copy && <p className="lead">{copy}</p>}
            {children}
            {mode === "hero" && (
              <div className="hero-actions">
                <a href="#contact" className="button primary">Get Started</a>
                <a href="#services" className="button ghost">View Services</a>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="scroll-meter">
        <span />
      </div>
    </section>
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
