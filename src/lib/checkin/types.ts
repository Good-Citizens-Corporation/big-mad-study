/**
 * The check-in entry, SLICE-04-01 (issue #44).
 *
 * Field names mirror the pre-registration's Operational definitions verbatim
 * (docs/compliance/pre-registration.md). The registration is the spec; the
 * code follows it, and changes to the instrument go through the registration
 * first.
 *
 * Skips are first-class values, not nulls: the landing page promises any
 * question can be skipped, and a skipped answer is data (it is counted),
 * where a null is an accident.
 */

export type Destination =
  | "tool"
  | "other_people"
  | "myself"
  | "nowhere"
  /** Pilot-only fifth option; frozen out or in by SLICE-04-03. */
  | { other: string }
  | "skipped";

export type Recency =
  | "just_now"
  | "within_hour"
  | "earlier_today"
  | "before_today"
  | "skipped";

export type Intensity = number | "skipped"; // 0–10 integer when present

export type Channel = "sms" | "voice";

/** What a channel hands to storage. */
export type NewCheckIn = {
  hashedParticipantId: string;
  channel: Channel;
  narrative: string;
  destination: Destination;
  intensity: Intensity;
  recency: Recency;
  /** Immutable at ingest, pilot data must never mix with study data. */
  pilot: boolean;
};

/** What storage persists: the entry plus what only storage may stamp. */
export type CheckInEntry = Readonly<
  NewCheckIn & {
    receivedAt: string;
    /** The consent text version in force when this entry was accepted. */
    consentVersion: string;
  }
>;
