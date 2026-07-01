"use client";

import type { Slide } from "@/lib/types";
import { SlideSection } from "./SlideSection";

export function SlideDeck({ slides }: { slides: Slide[] }) {
  return (
    <main className="h-screen w-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory pt-20 md:pt-24">
      {slides.map((slide) => (
        <SlideSection key={slide.id || slide.title} slide={slide} />
      ))}
    </main>
  );
}
