"use client";

import { useEffect } from "react";

export function AOSInit() {
  useEffect(() => {
    // Dynamically import AOS to avoid SSR issues
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 500,
        easing: "ease-out-cubic",
        once: true,
        offset: 40,
        delay: 0,
      });
    });
  }, []);

  return null;
}
