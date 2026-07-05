"use client";

import { useEffect, useState } from "react";

/**
 * Persist edilmiş Zustand verileri hydration sonrası güvenli göstermek için kullanılır.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
