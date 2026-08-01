import type { Destination, Intensity, Recency } from "./types";

/**
 * SMS check-in parser — SLICE-04-02 (issue #45).
 *
 * The prompt teaches a format; this parser accommodates what people actually
 * send. It scans for the three structured pieces anywhere in the message,
 * but a piece only counts when it sits in *answer position* — delimited by
 * punctuation or the message edge — never when the same word is embedded in
 * the story ("the app ate my shift" is narrative; ", the app," is an
 * answer). It never throws and never fails: missing pieces are "skipped",
 * and `complete` tells the caller whether a repair prompt is worth sending.
 */

export type ParsedSms = {
  narrative: string;
  destination: Destination;
  intensity: Intensity;
  recency: Recency;
  /** True when all three structured fields were found. */
  complete: boolean;
};

type ConcreteDestination = Exclude<Destination, "skipped" | { other: string }>;

const DESTINATION_PATTERNS: [RegExp, ConcreteDestination][] = [
  [/(the )?(tool|app|system|software|dashboard|machine)/i, "tool"],
  [
    /(them|other people|others|coworkers?|my (coworkers?|team|boss|family|partner|kids?))/i,
    "other_people",
  ],
  [/(myself|me)/i, "myself"],
  [/(nowhere|no ?one|nobody|nothing)/i, "nowhere"],
];

const RECENCY_PATTERNS: [RegExp, Exclude<Recency, "skipped">][] = [
  [/(just now|right now|a (minute|moment|second) ago|minutes ago)/i, "just_now"],
  [/(within the (last )?hour|an hour ago|past hour)/i, "within_hour"],
  [/(earlier today|this (morning|afternoon)|today)/i, "earlier_today"],
  [/(yesterday|last (night|week)|days? ago|before today)/i, "before_today"],
];

const DELIM = "[,.;\\u2014\\u2013-]";

/**
 * Matches `inner` only in answer position: preceded by start-of-message or a
 * delimiter, followed by end-of-message or a delimiter.
 */
function delimited(inner: string): RegExp {
  return new RegExp(
    `(?:^|${DELIM})\\s*(?:${inner})\\s*(?=$|${DELIM})`,
    "i",
  );
}

function claim(
  text: string,
  inner: string,
): { found: boolean; rest: string } {
  const match = text.match(delimited(inner));
  if (!match) return { found: false, rest: text };
  return { found: true, rest: text.replace(match[0], " ") };
}

function clean(narrative: string): string {
  return narrative
    .replace(/\s*[,.;—–-]\s*[,.;—–-]+\s*/g, ", ")
    .replace(/^[\s,.;—–-]+|[\s,.;—–-]+$/g, "")
    .replace(/\s{2,}/g, " ");
}

export function parseSms(body: string): ParsedSms {
  let rest = body.trim();

  // A rating counts at the very start of the message ("9 them ...", the
  // taught format) or delimited anywhere — never embedded ("waited 2 hours").
  let intensity: Intensity = "skipped";
  const leading = rest.match(/^(10|[0-9])(?=\s|$)/);
  if (leading) {
    intensity = Number(leading[1]);
    rest = rest.slice(leading[0].length);
  } else {
    const ratingClaim = claim(rest, "10|[0-9]");
    if (ratingClaim.found) {
      const value = rest.match(delimited("10|[0-9]"))?.[0].match(/10|[0-9]/);
      intensity = Number(value?.[0]);
      rest = ratingClaim.rest;
    }
  }

  // Recency phrases are distinctive enough to claim wherever they appear.
  let recency: Recency = "skipped";
  for (const [pattern, value] of RECENCY_PATTERNS) {
    const match = rest.match(pattern);
    if (match) {
      recency = value;
      rest = rest.replace(match[0], " ");
      break;
    }
  }

  // Destinations are ordinary words, so only answer position counts. The
  // first pattern with a *delimited* occurrence wins — an embedded "the app"
  // in the story never outranks a delimited "them".
  let destination: Destination = "skipped";
  for (const [pattern, value] of DESTINATION_PATTERNS) {
    const result = claim(rest, pattern.source);
    if (result.found) {
      destination = value;
      rest = result.rest;
      break;
    }
  }

  return {
    narrative: clean(rest),
    destination,
    intensity,
    recency,
    complete:
      destination !== "skipped" &&
      intensity !== "skipped" &&
      recency !== "skipped",
  };
}
