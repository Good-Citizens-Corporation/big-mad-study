/**
 * The consent content shown at the gate, SLICE-00-03 (issue #32).
 *
 * This is the web rendering of docs/compliance/informed-consent.md, kept in
 * lockstep with it. The version string is stored on every consent decision
 * and on every entry accepted under it, so it must change whenever this text
 * changes meaning, never edit the words and keep the version.
 *
 * "draft-" versions render a visible not-yet-approved banner; the gate
 * mechanism can be built and tested now, and counsel's edits later are a
 * text change plus a version bump, not a rebuild.
 */

export const CONSENT_VERSION = "draft-2";

export type ConsentSection = { heading: string; body: string[] };

export const consentSections: ConsentSection[] = [
  {
    heading: "What this study is",
    body: [
      "We are studying what modern work does to mood, patience, and behavior, and where the frustration goes. We are not assuming a cause; we are looking for patterns.",
      "If you join, you'll answer a short screener, send short check-ins for about a week (a text, or a voice note if you choose), and answer two brief surveys. Most days this is 5–10 minutes.",
    ],
  },
  {
    heading: "This is voluntary, and you can stop",
    body: [
      "You can skip a day, skip any question, or stop entirely, at any point, without telling us why. Nothing bad happens if you do.",
      "This study is unpaid. There is no reward to lose, and we would rather say that plainly than imply otherwise. What you get is access to your own entries and patterns, and the findings we publish for everyone.",
    ],
  },
  {
    heading: "What we collect, and who sees it",
    body: [
      "Your screener and survey answers, your check-in entries, and contact details for sending prompts, stored separately from your answers.",
      "Nobody at your job. We never contact employers, and nothing you say is shared with them. We publish patterns across all participants, never your raw entries, and never raw audio.",
      "Please don't include your employer's name or anything that identifies your workplace. If you do by accident, tell us and we'll remove it.",
    ],
  },
  {
    heading: "If you choose voice",
    body: [
      "A recording of your voice can identify you the way a fingerprint can, so voice gets its own separate permission below, and you can complete the entire study by text with exactly the same standing.",
      "Recordings are transcribed on our own computers. Your audio is never sent to an outside company, and we will never sell or profit from it.",
    ],
  },
  {
    heading: "The honest limits",
    body: [
      "We are researchers, not clinicians. This is not therapy or medical care, and it cannot respond to an emergency. If you are in crisis, call or text 988 (US), or 911 if someone is in immediate danger.",
      "Thinking about frustrating parts of your day can itself be unpleasant. Any storage of personal information carries some breach risk, however carefully handled.",
    ],
  },
  {
    heading: "Your data, your call",
    body: [
      "Email privacy@bigmadstudy.com and ask, and we will delete your entries and contact details, then confirm. You don't need to give a reason.",
      "Anything else, what this is, how it works, whether it's for you, goes to study@bigmadstudy.com, where a person reads it.",
    ],
  },
];

export const agreements = {
  study:
    "I agree to take part in this study. I've read the above, I understand what I'd be doing, and I know I can stop at any time.",
  age: "I am 18 or older.",
  voice:
    "I agree to record voice check-ins, and I specifically agree to Good Citizens collecting and storing a recording of my voice as described above. (Optional, you can complete the study without this.)",
  sms: "I agree to receive text messages with check-in prompts. I understand these are recurring and I can reply STOP at any time. (Optional.)",
} as const;
