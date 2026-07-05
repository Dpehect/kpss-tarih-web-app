"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useTimelineScrollTrigger() {
  const scopeRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!scopeRef.current || reducedMotion) return;

      const chapters = gsap.utils.toArray<HTMLElement>("[data-timeline-chapter]");
      const progress = progressRef.current;

      chapters.forEach((chapter) => {
        const visual = chapter.querySelector("[data-chapter-visual]");
        const content = chapter.querySelector("[data-chapter-content]");
        const metrics = chapter.querySelectorAll("[data-chapter-metric]");

        gsap.fromTo(
          visual,
          { scale: 0.92, opacity: 0.45, rotateX: 8 },
          {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              start: "top 72%",
              end: "bottom 38%",
              scrub: true
            }
          }
        );

        gsap.fromTo(
          content,
          { y: 72, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: chapter,
              start: "top 68%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(
          metrics,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 58%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      if (progress && scopeRef.current) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: scopeRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true
            }
          }
        );
      }
    },
    { scope: scopeRef }
  );

  return { scopeRef, progressRef };
}
