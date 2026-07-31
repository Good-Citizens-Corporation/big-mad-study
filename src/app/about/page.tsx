export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <section>
        <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
          About
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
          About the Study
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.7]">
          The Big Mad Study is a public-facing orientation that outlines how we
          explore daily experiences, context, and resilience. This page
          summarizes the goals while the navigation above takes you to
          supporting sections.
        </p>
        <div className="mt-16">
          <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
            Snapshot
          </p>
          <ul className="mt-6 space-y-4">
            <li className="border-t border-hairline pt-4">
              Goal: Understand how communities sense opportunity in uncertain
              settings.
            </li>
            <li className="border-t border-hairline pt-4">
              Scope: Public orientation, not the participant portal.
            </li>
            <li className="border-t border-hairline pt-4">
              Next steps: Follow the navigation to learn methods and access
              pathways.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
