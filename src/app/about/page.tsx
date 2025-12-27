export default function AboutPage() {
  return (
    <section className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">About</p>
      <h1 className="text-4xl font-semibold text-white">About the Study</h1>
      <p className="text-lg text-slate-300">
        The Big Mad Study is a public-facing orientation that outlines how we
        explore daily experiences, context, and resilience. This page summarizes
        the goals while the navigation above takes you to supporting sections.
      </p>
      <div className="space-y-3 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Snapshot
        </p>
        <ul className="space-y-1 text-slate-300">
          <li>
            Goal: Understand how communities sense opportunity in uncertain
            settings.
          </li>
          <li>Scope: Public orientation, not the participant portal.</li>
          <li>
            Next steps: Follow the navigation to learn methods and access
            pathways.
          </li>
        </ul>
      </div>
    </section>
  );
}
