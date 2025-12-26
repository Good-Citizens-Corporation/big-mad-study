// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – The Big-Mad Behavioral Study",
  description:
    "Why Good Citizens Corporation is running The Big-Mad Behavioral Study and how we think about public, accessible research.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          About The Big-Mad Behavioral Study
        </h1>
        <p className="text-sm text-neutral-500">
          A <a href="https://goodcitizens.us/big-mad-study" target="_blank" rel="noopener noreferrer">Good Citizens Corporation</a> research project.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What this study is about</h2>
        <p>
          The Big-Mad Behavioral Study looks at how frustration builds up and
          where it goes in a world full of automation, AI, and algorithmic
          nudging. We&apos;re curious about what happens when everyday people
          work, commute, parent, deliver, or care for others alongside systems
          that are always measuring and optimizing.
        </p>
        <p>
          We&apos;re especially interested in whether tools like AI actually
          help people cope, or whether they just move the frustration around:
          from apps to coworkers, from riders to drivers, from &quot;the
          system&quot; to whoever happens to be in front of us.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Who is running this?</h2>
        <p>
          The study is run by <a href="https://goodcitizens.us/big-mad-study" target="_blank" rel="noopener noreferrer">Good Citizens Corporation</a>, a small,
          design-led software studio. We build products and research pipelines
          for real-world problems, and we try to keep the work legible enough
          that other teams can reuse it.
        </p>
        <p>
          This site and its code are public on purpose. They&apos;re meant to be
          both: a working research tool, and a reference implementation for
          anyone who wants to run similar studies in their own context.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How we try to do this responsibly</h2>
        <p>
          Participation is voluntary. People can stop at any time. Contact
          details are stored separately from responses, and anything we publish
          publicly will be anonymized and aggregated.
        </p>
        <p>
          We don&apos;t share raw, identifiable data. We do share our methods:
          the screener questions, journaling prompts, technical stack, and how
          we think about analysis. We’ll also publish a plain-language methods summary so other teams can critique or adapt what we’ve done. If you&apos;re here to learn or to replicate
          the approach: you&apos;re very welcome.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Who this is for</h2>
        <p>
          This study is for people whose work or daily life is shaped by
          systems: gig workers, office workers, care workers, students, and
          anyone else who feels like they&apos;re living inside other people&apos;s
          dashboards.
        </p>
        <p>
          It&apos;s also for researchers, designers, and engineers who want a
          concrete example of how to run accessible, voice-first studies without
          a giant budget or a closed platform.
        </p>
      </section>
    </main>
  );
}