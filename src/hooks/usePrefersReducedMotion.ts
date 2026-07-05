"use client";

import { useEffect, useState } from "react";

/**
 * Kullanıcının işletim sistemi motion tercihini okur.
 * Performans ve erişilebilirlik için animasyon yoğunluğunu azaltmada kullanılır.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);

    const onChange = () => setPrefersReducedMotion(media.matches);
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
