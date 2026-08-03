/**
 * Consent records, shared between the screener gate (SLICE-00-03, #32) and
 * check-in storage (SLICE-04-01, #44).
 *
 * The three scopes mirror the consent document's three separately-refusable
 * agreements. Bundled consent is not consent, so they are independent
 * booleans rather than a single flag.
 */

export type ConsentScopes = {
  /** The study itself. Required, without it nothing may be stored. */
  study: boolean;
  /** Biometric consent for voice recordings (BIPA-grade, separate). */
  voice: boolean;
  /** TCPA consent to receive recurring SMS prompts. */
  sms: boolean;
};

export type ConsentRecord = {
  hashedParticipantId: string;
  /** Which text they agreed to, the exact version shown, never inferred. */
  consentVersion: string;
  scopes: ConsentScopes;
  agreedAt: string;
};
