// src/app/methods/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methods – The Big-Mad Behavioral Study",
  description:
    "How The Big-Mad Behavioral Study is designed: cohorts, screener, journaling, and the technical stack behind it.",
};

export default function MethodsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Methods</h1>
        <p className="text-sm text-neutral-500">
          How The Big-Mad Behavioral Study works under the hood.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Cohorts</h2>
        <p>
          We sort participants into three broad cohorts based on how often they
          use AI tools like ChatGPT, Midjourney, or GitHub Copilot in their
          work:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>AI-heavy:</strong> Use AI tools daily as part of their job.
          </li>
          <li>
            <strong>AI-light:</strong> Use AI occasionally, for side tasks or
            exploration.
          </li>
          <li>
            <strong>Low-AI control:</strong> Rarely or never use AI tools.
          </li>
        </ul>
        <p>
          The goal is not to judge individuals, but to see whether different
          patterns of tool use are linked to different patterns of frustration
          and coping.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Pre-study screener</h2>
        <p>
          Before joining the study, people complete a short screener that asks
          about:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>How they work and what tools they use</li>
          <li>How often they&apos;ve felt frustrated recently</li>
          <li>How they usually respond when something sets them off</li>
          <li>Basic logistics: when and how they&apos;d prefer to journal</li>
        </ul>
        <p>
          The screener also checks for conflicts of interest (for example,
          people who helped design the study won&apos;t be included as
          participants) to keep the dataset as clean as possible.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Journaling flow</h2>
        <p>
          Selected participants are invited to journal for a short period (for
          example, seven days), using one of several paths:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Voice calls into a dedicated number (transcribed with Whisper)</li>
          <li>SMS replies to daily prompts</li>
          <li>An accessible, mobile-first web form</li>
        </ul>
        <p>
          Prompts focus on concrete moments: what happened, how it felt, what
          they did next, and whether any tools or systems were involved.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stack and telemetry</h2>
        <p>
          Technically, this site runs on Next.js with a small, test-driven
          backend that coordinates:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Twilio for SMS and voice</li>
          <li>OpenAI Whisper for transcription</li>
          <li>
            A database layer (Firestore / BigQuery or similar) for storing
            anonymized entries and metadata
          </li>
        </ul>
        <p>
          We track basic operational telemetry (for example, whether prompts are
          sent and responses are received) to keep the system healthy. We are
          careful not to over-instrument in ways that would turn participants
          into &quot;engagement metrics&quot; instead of people.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Replicating this study</h2>
        <p>
          If you want to run a similar study in your own context, you can use
          this repo as a starting point:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Fork the codebase</li>
          <li>Adjust the screener and journaling prompts</li>
          <li>Point the integrations at your own Twilio / Whisper / storage</li>
          <li>
            Keep or adapt the CI and testing setup so you can ship changes with
            confidence
          </li>
        </ul>
        <p>
          As the project matures, we&apos;ll publish more detailed guides and
          examples for teams who want to replicate or extend this work.
        </p>
      </section>
    </main>
  );
}