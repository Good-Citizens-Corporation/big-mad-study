export default function MethodsPage() {
  return (
    <section className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
        Methods
      </p>
      <h1 className="text-4xl font-semibold text-white">Research Methods</h1>
      <p className="text-lg text-slate-300">
        The study is assembled from three high-level modules that capture
        experience, context, and perception. Each one is measured through a
        blend of surveys, rapid check-ins, and interviews.
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <article className="flex-1 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Experience Logs</h2>
          <p className="text-slate-300">
            Short-form entries submitted daily so we can see moment-to-moment
            shifts in the target population.
          </p>
        </article>
        <article className="flex-1 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5">
          <h2 className="text-xl font-semibold text-white">Context Mapping</h2>
          <p className="text-slate-300">
            Periodic check-ins with location, time, and social context data to
            ground the narrative.
          </p>
        </article>
      </div>
    </section>
  );
}
