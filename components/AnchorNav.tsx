"use client";

import { useEffect, useState } from "react";
import type { Slide } from "@/lib/types";

export function AnchorNav({ slides }: { slides: Slide[] }) {
  const [activeId, setActiveId] = useState<string | undefined>();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -66% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.target.id) {
          setActiveId(entry.target.id);
          break;
        }
      }
    }, observerOptions);

    // Observe all sections with IDs
    slides.forEach((slide) => {
      if (slide.id) {
        const element = document.getElementById(slide.id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => observer.disconnect();
  }, [slides]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isLargeScreen) return null;

  // Only show sections that have an ID
  const navItems = slides.filter((s) => s.id);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-6 top-32 z-40 flex max-h-[60vh] flex-col gap-3 overflow-y-auto text-right text-[0.63rem] uppercase tracking-[0.18em]"
    >
      {navItems.map((slide) => (
        <a
          key={slide.id}
          href={`#${slide.id}`}
          className={`no-underline transition-colors ${
            activeId === slide.id
              ? "text-accent font-medium"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {slide.title}
        </a>
      ))}
    </nav>
  );
}
