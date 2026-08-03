import type { ConsentRecord } from "@/lib/consent/types";
import type { Channel, CheckInEntry, NewCheckIn } from "./types";

/**
 * Check-in storage with the consent-linkage guard, SLICE-04-01 (issue #44).
 *
 * Collection without consent must be impossible, not discouraged, so the
 * guard lives in the one function every channel must pass through rather
 * than in each channel's good intentions. Refusals are logged by reason
 * only, a refused entry's content is exactly the thing we had no right
 * to keep.
 */

export type CheckInRepository = {
  persist(entry: CheckInEntry): Promise<CheckInEntry>;
  all(): Promise<readonly CheckInEntry[]>;
};

export type ConsentLookup = (
  hashedParticipantId: string,
) => Promise<ConsentRecord | null>;

export type RefusalLog = (reason: string) => void;

export type StoreResult =
  | { stored: true; entry: CheckInEntry }
  | { stored: false; reason: string };

const SCOPE_FOR_CHANNEL: Record<Channel, "voice" | null> = {
  sms: null, // receiving an SMS needs study consent only; sending needs sms scope (#35, #49)
  voice: "voice",
};

function invalidIntensity(intensity: NewCheckIn["intensity"]): boolean {
  if (intensity === "skipped") return false;
  return !Number.isInteger(intensity) || intensity < 0 || intensity > 10;
}

export async function storeCheckIn(
  incoming: NewCheckIn,
  repo: CheckInRepository,
  findConsent: ConsentLookup,
  logRefusal: RefusalLog,
): Promise<StoreResult> {
  const refuse = (reason: string): StoreResult => {
    logRefusal(reason);
    return { stored: false, reason };
  };

  const consent = await findConsent(incoming.hashedParticipantId);
  if (!consent) return refuse("no_consent_record");
  if (!consent.scopes.study) return refuse("missing_scope_study");

  const channelScope = SCOPE_FOR_CHANNEL[incoming.channel];
  if (channelScope && !consent.scopes[channelScope]) {
    return refuse(`missing_scope_${channelScope}`);
  }

  if (invalidIntensity(incoming.intensity)) return refuse("invalid_intensity");

  const entry: CheckInEntry = Object.freeze({
    ...incoming,
    receivedAt: new Date().toISOString(),
    consentVersion: consent.consentVersion,
  });

  await repo.persist(entry);
  return { stored: true, entry };
}

/**
 * The only sanctioned read path for analysis. Pilot rows are excluded here,
 * by construction, an analysis that wants pilot data has to go around this
 * function, and doing so is the defect the tests exist to catch.
 */
export async function analysisEntries(
  repo: CheckInRepository,
): Promise<readonly CheckInEntry[]> {
  const entries = await repo.all();
  return entries.filter((entry) => !entry.pilot);
}
