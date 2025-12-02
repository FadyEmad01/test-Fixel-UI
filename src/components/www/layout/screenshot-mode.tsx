"use client";

import { useEffect } from "react";

export default function ScreenshotMode() {
  useEffect(() => {
    const enableScreenshotMode = () => {
      document.documentElement.classList.add("screenshot-mode");
    };

    // detect print
    const beforePrint = () => enableScreenshotMode();
    window.addEventListener("beforeprint", beforePrint);

    // detect ctrl+p / cmd+p
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        enableScreenshotMode();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null; // no UI
}
