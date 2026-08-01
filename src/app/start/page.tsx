"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ConsentGate,
  type ConsentDecision,
} from "../../../components/ConsentGate";
import { PageViewTracker } from "../../../components/PageViewTracker";

/**
 * /start — the entry to participation, SLICE-00-03 (issue #32).
 *
 * Consent comes before the screener by construction: the screener (EPIC-02)
 * mounts behind this gate and cannot render without an accepting decision.
 * Until the screener exists, acceptance lands on an honest holding state.
 */
export default function StartPage() {
  const [decision, setDecision] = useState<ConsentDecision | null>(null);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <PageViewTracker event="startPageViewed" />

      {decision === null && <ConsentGate onDecision={setDecision} />}

      {decision?.declined && (
        <section>
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
            No problem.
          </h1>
          <p className="mt-6 text-[1.05rem] leading-[1.7]">
            Nothing was collected — not your answer to this page, not anything.
            The study will still publish everything it learns publicly, so you
            can follow along without taking part.
          </p>
          <p className="mt-8">
            <Link
              href="/"
              className="border-b border-rule pb-[0.15rem] font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft no-underline hover:border-accent hover:text-accent"
            >
              Back to the study
            </Link>
          </p>
        </section>
      )}

      {decision && !decision.declined && (
        <section>
          <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
            Consent recorded · {decision.consentVersion}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
            Thank you.
          </h1>
          <p className="mt-6 text-[1.05rem] leading-[1.7]">
            The screener isn&rsquo;t open yet — the study doesn&rsquo;t collect
            anything until its ethics review and registration are complete, and
            we&rsquo;d rather be slow than casual about that. When it opens,
            this page is where it starts.
          </p>
          <p className="mt-4 leading-[1.7] text-ink-soft">
            Your consent choices are not stored anywhere yet either: enrollment
            begins only when the study does.
          </p>
        </section>
      )}
    </main>
  );
}
