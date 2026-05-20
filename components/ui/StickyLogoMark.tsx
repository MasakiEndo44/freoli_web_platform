"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";

export function StickyLogoMark({ targetSelector = "header[data-hero]" }: { targetSelector?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetSelector]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed top-3 left-3 md:top-4 md:left-4 z-50 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LogoMark />
    </div>
  );
}
