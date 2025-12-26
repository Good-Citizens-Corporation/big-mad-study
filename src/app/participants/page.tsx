// src/app/participants/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participants – The Big-Mad Behavioral Study",
  description:
    "Information for participants in The Big-Mad Behavioral Study: how journaling works, what you get back, and how we handle your data.",
};

export default function ParticipantsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Participant guide
        </h1>
        <p className="text-sm text-neutral-500">
          What to expect if you take part in The Big-Mad Behavioral Study.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What you&apos;re signing up for</h2>
        <p>
          If you join the study, you&apos;ll be asked to journal about your day
          for a short run (about 7 days). We&apos;re interested in moments of
          calm as much as moments of &quot;big mad&quot; — especially when
          tools, apps, AI systems, or other people are in the mix. You don’t have to have ‘big feelings’ every day for your entries to matter; uneventful days are part of the picture.
        </p>
        <p>
          You don&apos;t have to be a &quot;research person&quot; to take part.
          You just need a phone or a browser and a few honest minutes each day.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How journaling works</h2>
        <p>
          We&apos;re building this to be as low-friction and accessible as we
          can. Depending on your preferences and what&apos;s available during
          the pilot, you&apos;ll be able to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Get a daily prompt by SMS and reply by text, or
          </li>
          <li>
            Call a number, listen to your prompt, and leave a short voicemail, or
          </li>
          <li>
            Use a simple web form to type or paste your response.
          </li>
        </ul>
        <p>
          Voice responses are transcribed so we can analyze patterns.
          The audio and transcripts are only used for research, handled by a small team and trusted service providers, and never shared publicly in raw form.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What you get back</h2>
        <p>
          We don&apos;t believe participation should disappear into a black box.
          As the study runs, we plan to share:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Simple, anonymized snapshots of how frustration shows up across the
            group (no individual names or quotes).
          </li>
          <li>
            Reflections on what we&apos;re learning — especially where tools,
            systems, and &quot;quiet rules&quot; seem to make things better or
            worse.
          </li>
          <li>
            A plain-language summary of findings you can read or share.
          </li>
        </ul>
        <p>
          Wherever possible, we’ll let you see your own responses alongside aggregate patterns, so your time spent reflecting actually gives you
          something to reflect on in return.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How we handle your data</h2>
        <p>
          Your contact info (name, email, phone) is stored separately from your
          journal entries. When we analyze the data, entries are detached from
          identifying details and grouped with others in your cohort.
        </p>
        <p>
          We don&apos;t share raw, identifiable data with employers, platforms,
          or third parties. If we publish anything, it will be aggregated
          patterns and anonymous examples.
        </p>
        <p>
          You can ask to stop participating at any time. If you want us to stop
          contacting you, or to remove your data from the study where possible,
          we&apos;ll honor that.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What happens next</h2>
        <p>
          If you were invited through LinkedIn or a direct message, you&apos;ll
          receive a unique link or code that connects you to your cohort and
          journaling method. Until then, this page is here so you can see what&apos;s
          coming and decide if it feels right for you.
        </p>
        <p>
          If you&apos;re not sure but curious, that&apos;s okay. You&apos;re
          welcome to follow along with the public updates without opting in.
        </p>
      </section>
    </main>
  );
}