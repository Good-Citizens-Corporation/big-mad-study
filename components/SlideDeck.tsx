"use client";

import type { Slide } from "@/lib/types";
import { SlideSection } from "./SlideSection";

export function SlideDeck({ slides }: { slides: Slide[] }) {
  return (
    <main className="w-full overflow-x-hidden">
      {slides.map((slide) => (
        <SlideSection key={slide.id || slide.title} slide={slide} />
      ))}
    </main>
  );
}
