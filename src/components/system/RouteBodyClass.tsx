"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ROUTE_CLASSES = ["route-admin"];

export function RouteBodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    for (const className of ROUTE_CLASSES) {
      body.classList.remove(className);
    }

    if (pathname?.startsWith("/admin")) {
      body.classList.add("route-admin");
    }

    return () => {
      for (const className of ROUTE_CLASSES) {
        body.classList.remove(className);
      }
    };
  }, [pathname]);

  return null;
}
