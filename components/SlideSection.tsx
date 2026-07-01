import Link from "next/link";
import type { Slide, SlideBodyItem, SlideCTA } from "@/lib/types";

export function SlideSection({ slide }: { slide: Slide }) {
  const renderBody = (body: SlideBodyItem[]) => {
    return body.map((item, idx) => {
      if (item.type === "p") {
        return (
          <p key={idx} className="text-opacity-90">
            {item.text}
          </p>
        );
      }
      if (item.type === "ul") {
        return (
          <ul key={idx} className="ml-6 list-disc space-y-2">
            {item.items?.map((li, liIdx) => (
              <li key={liIdx}>{li}</li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  const renderCTAs = (ctas: SlideCTA[]) => {
    return ctas.map((cta) => (
      <Link
        key={cta.href}
        href={cta.href}
        className={`rounded-xl px-5 py-3 font-semibold ${
          cta.variant === "primary"
            ? "bg-slate-900 text-white shadow"
            : "border border-slate-200/70 text-slate-900/90"
        }`}
      >
        {cta.label}
      </Link>
    ));
  };

  return (
    <section id={slide.id} className="w-screen min-h-[100vh] snap-start">
      <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-6 py-16">
        {slide.emoji && (
          <div
            aria-hidden="true"
            className="mb-6 flex flex-wrap items-end gap-3 text-[clamp(56px,10vw,160px)] leading-none"
          >
            <span>{slide.emoji}</span>
          </div>
        )}
        <h2 className="text-4xl font-semibold tracking-tight">{slide.title}</h2>
        {slide.subtitle && (
          <p className="mt-3 text-lg opacity-80">{slide.subtitle}</p>
        )}
        {slide.body && (
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {renderBody(slide.body)}
          </div>
        )}
        {slide.ctas && slide.ctas.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {renderCTAs(slide.ctas)}
          </div>
        )}
      </div>
    </section>
  );
}
