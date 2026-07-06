"use client";

import { useEffect } from "react";

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
        const progressElements = gsap.utils.toArray<HTMLElement>("[data-premium-progress]");

        revealElements.forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 30, filter: "blur(12px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%"
              }
            }
          );
        });

        parallaxElements.forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });

        progressElements.forEach((element) => {
          const target = element.getAttribute("data-premium-progress") ?? "0";
          gsap.fromTo(
            element,
            { width: "0%" },
            {
              width: `${target}%`,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 92%"
              }
            }
          );
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
