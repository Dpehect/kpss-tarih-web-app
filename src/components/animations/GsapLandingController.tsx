"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Landing sayfasındaki sinematik scroll animasyonlarını merkezi olarak yönetir.
 * Component markup içinde data-attribute hedefleri kullanarak animation logic ile UI ayrılır.
 */
export function GsapLandingController({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.from("[data-hero-copy]", {
        y: 70,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.14
      });

      gsap.to("[data-hero-orb]", {
        yPercent: 18,
        rotate: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero-section]",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-cinematic-card]").forEach((card, index) => {
        gsap.from(card, {
          y: 84,
          opacity: 0,
          rotateX: 8,
          filter: "blur(12px)",
          duration: 0.85,
          ease: "power3.out",
          delay: index * 0.04,
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse"
          }
        });
      });

      gsap.to("[data-time-ribbon]", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-ribbon-section]",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
