export default function ParticipantsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <section>
        <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
          Participants
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
          Participants
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.7]">
          This page describes who can join the study, what participation looks
          like, and how we respect privacy across every interaction.
        </p>
        <ul className="mt-16 space-y-4">
          <li className="border-t border-hairline pt-4">
            Adults 18+ from any background are welcome.
          </li>
          <li className="border-t border-hairline pt-4">
            Participation is fully remote and self-paced.
          </li>
          <li className="border-t border-hairline pt-4">
            Data is de-identified before analysis to protect identities.
          </li>
        </ul>
      </section>
    </main>
  );
}
