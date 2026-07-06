"use client";

import { useEffect } from "react";

/**
 * Lightweight GSAP layer.
 * Elements can opt-in with:
 * - data-premium-reveal
 * - data-premium-parallax
 *
 * If GSAP is unavailable for any reason, the app continues normally.
 */
export function GSAPPremiumEffects() {
  useEffect(() => {
    let cleanup = () => {};

    async function run() {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");

        const gsap = gsapModule.gsap ?? gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        const revealElements = gsap.utils.toArray<HTMLElement>("[data-premium-reveal]");
        const parallaxElements = gsap.utils.toArray<HTMLElement>("[data-premium-parallax]");

        revealElements.forEach((element) => {
          gsap.fromTo(
            element,
            {
              autoAlpha: 0,
              y: 28,
              filter: "blur(10px)"
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%"
              }
            }
          );
        });

        parallaxElements.forEach((element) => {
          gsap.to(element, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      } catch {
        cleanup = () => {};
      }
    }

    void run();

    return () => cleanup();
  }, []);

  return null;
}
