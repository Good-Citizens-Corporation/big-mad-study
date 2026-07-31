"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Slide, SlideBodyItem, SlideCTA } from "@/lib/types";
import { track } from "@/lib/telemetry";
import { StartScreenerLink } from "./StartScreenerLink";

export function SlideSection({
  slide,
  index,
}: {
  slide: Slide;
  index: number;
}) {
  const marker = String(index + 1).padStart(2, "0");
  const ref = useRef<HTMLElement>(null);

  // The deck is one document, so the first slide's title is the page's h1 and
  // every subsequent slide is a section beneath it. Rendering them all as h2
  // left the landing page with no h1 at all.
  const Heading = index === 0 ? "h1" : "h2";

  // landingInfoSectionViewed — fires once per section, the first time it
  // enters the viewport. Guarded because jsdom has no IntersectionObserver.
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          track("landingInfoSectionViewed", {
            section_id: slide.id ?? "",
            section_title: slide.title,
            position: index + 1,
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [slide.id, slide.title, index]);

  const renderBody = (body: SlideBodyItem[]) => {
    return body.map((item, idx) => {
      if (item.type === "p") {
        return <p key={idx}>{item.text}</p>;
      }
      if (item.type === "ul") {
        return (
          <ul key={idx} className="space-y-3">
            {item.items?.map((li, liIdx) => (
              <li key={liIdx} className="border-t border-hairline pt-3">
                {li}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  // Two registers only: the outlined pill that carries the next step, and the
  // quiet rule beneath a word for everything else.
  const renderCTAs = (ctas: SlideCTA[]) => {
    return ctas.map((cta) => {
      const className =
        cta.variant === "primary"
          ? "rounded-full border border-accent px-6 py-3 font-data text-[0.63rem] uppercase tracking-[0.18em] text-accent no-underline"
          : "border-b border-rule pb-[0.15rem] font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft no-underline hover:border-accent hover:text-accent";

      // The primary CTA is the funnel step EPIC-01 is measured on, so it
      // reports where on the page the click came from.
      if (cta.variant === "primary") {
        return (
          <StartScreenerLink
            key={cta.href}
            href={cta.href}
            location={slide.id || slide.title}
            className={className}
          >
            {cta.label}
          </StartScreenerLink>
        );
      }

      return (
        <Link key={cta.href} href={cta.href} className={className}>
          {cta.label}
        </Link>
      );
    });
  };

  return (
    <section
      ref={ref}
      id={slide.id}
      className="w-full scroll-mt-8 border-t border-hairline"
    >
      <div className="mx-auto flex max-w-3xl flex-col px-6 py-20 md:py-28">
        {/* Ordinal only — the heading below carries the meaning, so this is
            hidden rather than read out as "zero one" before every section. */}
        <p
          aria-hidden="true"
          className="mb-8 font-data text-[0.63rem] uppercase tracking-[0.18em] text-accent"
        >
          {marker}
        </p>
        <Heading className="font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
          {slide.title}
        </Heading>
        {slide.subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {slide.subtitle}
          </p>
        )}
        {slide.body && (
          <div className="mt-10 space-y-6 text-[1.05rem] leading-[1.7]">
            {renderBody(slide.body)}
          </div>
        )}
        {slide.ctas && slide.ctas.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-8">
            {renderCTAs(slide.ctas)}
          </div>
        )}
      </div>
    </section>
  );
}
