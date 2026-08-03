"use client";

import { useEffect, useState } from "react";
import {
  agreements,
  CONSENT_VERSION,
  consentSections,
} from "@/content/consent";
import type { ConsentScopes } from "@/lib/consent/types";
import { track, trackOnce } from "@/lib/telemetry";

export type ConsentDecision =
  | { declined: true }
  | { declined: false; consentVersion: string; scopes: ConsentScopes };

/**
 * The consent gate, SLICE-00-03 (issue #32).
 *
 * Renders before any personal-data question and collects agreement, never
 * data: there are no text inputs here by design, and a test asserts it.
 * The three agreements are independently refusable; declining is a single
 * click that needs no checkboxes, it must never be harder than accepting.
 */
export function ConsentGate({
  onDecision,
}: {
  onDecision: (decision: ConsentDecision) => void;
}) {
  const [study, setStudy] = useState(false);
  const [age, setAge] = useState(false);
  const [voice, setVoice] = useState(false);
  const [sms, setSms] = useState(false);

  useEffect(() => {
    trackOnce("consentPresented", { consent_version: CONSENT_VERSION });
  }, []);

  const accept = () => {
    track("consentAccepted", {
      consent_version: CONSENT_VERSION,
      biometric_scope: voice,
      sms_scope: sms,
    });
    onDecision({
      declined: false,
      consentVersion: CONSENT_VERSION,
      scopes: { study: true, voice, sms },
    });
  };

  const decline = () => {
    track("consentDeclined", { consent_version: CONSENT_VERSION });
    onDecision({ declined: true });
  };

  const checkboxRow = (
    checked: boolean,
    onChange: (next: boolean) => void,
    label: string,
  ) => (
    <label className="flex items-start gap-3 border-t border-hairline pt-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-[var(--accent)]"
      />
      <span className="text-[0.95rem] leading-[1.6]">{label}</span>
    </label>
  );

  return (
    <div>
      {CONSENT_VERSION.startsWith("draft") && (
        <p className="mb-8 border border-rule px-4 py-3 font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft">
          Draft consent, not yet approved for participant use
        </p>
      )}

      <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
        Before anything else
      </p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
        What you&rsquo;d be agreeing to
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        Read this first. We don&rsquo;t ask you a single question until
        you&rsquo;ve decided, and deciding no takes one click.
      </p>

      {consentSections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-normal">
            {section.heading}
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-[1.7]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-12">
        <h2 className="font-display text-xl font-normal">Your agreement</h2>
        <p className="mt-3 leading-[1.7] text-ink-soft">
          These are separate on purpose. You can say yes to some and no to
          others; only the first two are required to take part.
        </p>
        <div className="mt-6 space-y-4">
          {checkboxRow(study, setStudy, agreements.study)}
          {checkboxRow(age, setAge, agreements.age)}
          {checkboxRow(voice, setVoice, agreements.voice)}
          {checkboxRow(sms, setSms, agreements.sms)}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap items-center gap-8">
        <button
          type="button"
          onClick={accept}
          disabled={!study || !age}
          className="rounded-full border border-accent px-6 py-3 font-data text-[0.63rem] uppercase tracking-[0.18em] text-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          I agree, continue
        </button>
        <button
          type="button"
          onClick={decline}
          className="border-b border-rule pb-[0.15rem] font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft hover:border-accent hover:text-accent"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
