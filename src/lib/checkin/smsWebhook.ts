import type { ConsentRecord } from "@/lib/consent/types";
import { parseSms } from "./parseSms";
import {
  storeCheckIn,
  type CheckInRepository,
  type ConsentLookup,
  type RefusalLog,
} from "./store";

/**
 * Inbound SMS handling — SLICE-04-02 (issue #45).
 *
 * One gentle repair prompt, never a loop: an incomplete first message gets
 * one reteach of the format; whatever comes next is stored with skips for
 * anything still missing. The consent guard runs on the receive path too —
 * an un-consented sender gets a neutral reply that echoes nothing they
 * wrote, because content we refuse to store is content we refuse to handle.
 */

export type SmsDeps = {
  repo: CheckInRepository;
  findConsent: ConsentLookup;
  /** Raw phone → hashed participant id. The raw number is never persisted. */
  hashPhone: (phone: string) => string;
  logRefusal: RefusalLog;
  /** Holds the first message's narrative while the repair prompt is out. */
  repairPending: {
    get(id: string): string | null;
    set(id: string, narrative: string): void;
    delete(id: string): void;
  };
  /** True while the flow serves the design pilot (SLICE-04-03). */
  pilot: boolean;
};

export type InboundSms = { From: string; Body: string };

const REPLIES = {
  notEnrolled:
    "This number isn't enrolled in the Big-Mad Study, so nothing was saved. If you meant to join, start at the study website.",
  repair:
    "Got the story — could you add a number 0–10 for how much it got to you, where it went (tool / them / me / nowhere), and when it happened? One text is fine.",
  confirmed: "Got it — thank you. Skip any day you need to.",
} as const;

export async function handleInboundSms(
  message: InboundSms,
  deps: SmsDeps,
): Promise<string> {
  const hashedParticipantId = deps.hashPhone(message.From);

  const consent: ConsentRecord | null =
    await deps.findConsent(hashedParticipantId);
  if (!consent || !consent.scopes.study) {
    deps.logRefusal("sms_from_unconsented_number");
    return REPLIES.notEnrolled;
  }

  const parsed = parseSms(message.Body);
  const pendingNarrative = deps.repairPending.get(hashedParticipantId);

  // First incomplete message: one repair prompt, holding the story so it is
  // never lost. Second message, complete or not: store, merging narratives.
  // The format teaches; it never gatekeeps and it never discards.
  if (!parsed.complete && pendingNarrative === null) {
    deps.repairPending.set(hashedParticipantId, parsed.narrative);
    return REPLIES.repair;
  }
  deps.repairPending.delete(hashedParticipantId);
  const narrative = [pendingNarrative, parsed.narrative]
    .filter((part) => part && part.length > 0)
    .join(" — ");

  const result = await storeCheckIn(
    {
      hashedParticipantId,
      channel: "sms",
      narrative,
      destination: parsed.destination,
      intensity: parsed.intensity,
      recency: parsed.recency,
      pilot: deps.pilot,
    },
    deps.repo,
    deps.findConsent,
    deps.logRefusal,
  );

  return result.stored ? REPLIES.confirmed : REPLIES.notEnrolled;
}
