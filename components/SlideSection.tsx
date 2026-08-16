"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Slide, SlideBodyItem, SlideCTA } from "@/lib/types";
import { track } from "@/lib/telemetry";
import { StartScreenerLink } from "./StartScreenerLink";
import { Divider } from "./Divider";

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

  // landingInfoSectionViewed, fires once per section, the first time it
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
      className="slide-viewport relative w-full scroll-mt-8"
    >
      <div className="absolute inset-x-0 top-0 mx-auto max-w-3xl px-6">
        {slide.figure ? (
          <Divider figure={slide.figure} />
        ) : (
          <div className="h-px w-full bg-hairline" />
        )}
      </div>
      {/* Set as a type specimen: ordinal, title, lead, running text, each at
          a named step of the √2 scale, each at the measure its role wants.
          No font-size, gap, or max-width here is hand-picked; every one is
          drawn from the proportional system in globals.css. */}
      <div className="specimen mx-auto w-full max-w-3xl px-6 py-rhythm-7">
        {/* Ordinal only, the heading below carries the meaning, so this is
            hidden rather than read out as "zero one" before every section. */}
        <p aria-hidden="true" className="specimen-ordinal">
          {marker}
        </p>
        <div className="flow-rhythm-4">
          <Heading className="specimen-title">{slide.title}</Heading>
          {slide.subtitle && <p className="specimen-lead">{slide.subtitle}</p>}
        </div>
        {slide.body && (
          <div className="specimen-body flow-rhythm-5">
            {renderBody(slide.body)}
          </div>
        )}
        {slide.ctas && slide.ctas.length > 0 && (
          <div className="flex flex-wrap items-center gap-rhythm-6">
            {renderCTAs(slide.ctas)}
          </div>
        )}
      </div>
    </section>
  );
}
