export default function ParticipantsPage() {
  return (
    <section className="space-y-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
        Participants
      </p>
      <h1 className="text-4xl font-semibold text-white">Participants</h1>
      <p className="text-lg text-slate-300">
        This page describes who can join the study, what participation looks
        like, and how we respect privacy across every interaction.
      </p>
      <ul className="space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 text-slate-300">
        <li>• Adults 18+ from any background are welcome.</li>
        <li>• Participation is fully remote and self-paced.</li>
        <li>• Data is de-identified before analysis to protect identities.</li>
      </ul>
    </section>
  );
}
