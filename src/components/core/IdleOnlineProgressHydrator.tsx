"use client";

import { useEffect, useState } from "react";
import { OnlineProgressHydrator } from "@/components/core/OnlineProgressHydrator";

type WindowWithIdle = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function IdleOnlineProgressHydrator() {
  const [canHydrate, setCanHydrate] = useState(false);

  useEffect(() => {
    const win = window as WindowWithIdle;

    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(
        () => {
          setCanHydrate(true);
        },
        { timeout: 1600 }
      );

      return () => {
        win.cancelIdleCallback?.(id);
      };
    }

    const timeout = window.setTimeout(() => {
      setCanHydrate(true);
    }, 900);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  if (!canHydrate) return null;

  return <OnlineProgressHydrator />;
}
