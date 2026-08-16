import { describe, expect, it } from "vitest";
import type { CheckInEntry, NewCheckIn } from "./types";
import {
  analysisEntries,
  storeCheckIn,
  type CheckInRepository,
  type ConsentLookup,
} from "./store";
import type { ConsentRecord } from "@/lib/consent/types";

/**
 * SLICE-04-01 (issue #44) — entry schema & consent-linkage guard.
 *
 * The two structural promises: nothing is stored without a linkable consent
 * record of the required scopes, and pilot data can never reach an analysis
 * query. Both are the kind of guarantee that must be proven by a failing
 * test, not read off the code.
 */

const CONSENT: ConsentRecord = {
  hashedParticipantId: "hp_abc",
  consentVersion: "draft-0",
  scopes: { study: true, voice: false, sms: true },
  agreedAt: "2026-08-01T00:00:00Z",
};

const smsEntry = (overrides: Partial<NewCheckIn> = {}): NewCheckIn => ({
  hashedParticipantId: "hp_abc",
  channel: "sms",
  narrative: "the routing app rerouted me twice",
  destination: "tool",
  intensity: 7,
  recency: "just_now",
  pilot: false,
  ...overrides,
});

function harness(consents: ConsentRecord[] = [CONSENT]) {
  const stored: CheckInEntry[] = [];
  const refusals: { reason: string }[] = [];
  const repo: CheckInRepository = {
    persist: async (entry) => {
      stored.push(entry);
      return entry;
    },
    all: async () => stored,
  };
  const lookup: ConsentLookup = async (id) =>
    consents.find((c) => c.hashedParticipantId === id) ?? null;
  return {
    repo,
    lookup,
    stored,
    refusals,
    logRefusal: (reason: string) => refusals.push({ reason }),
  };
}

describe("SLICE-04-01 check-in storage", () => {
  // ── Zero: everything optional skipped ────────────────────────────────────
  it("stores an entry with every optional field skipped", async () => {
    const h = harness();
    const result = await storeCheckIn(
      smsEntry({
        destination: "skipped",
        intensity: "skipped",
        recency: "skipped",
      }),
      h.repo,
      h.lookup,
      h.logRefusal,
    );

    expect(result.stored).toBe(true);
    expect(h.stored[0].destination).toBe("skipped");
    expect(h.stored[0].intensity).toBe("skipped");
    expect(h.stored[0].recency).toBe("skipped");
  });

  // ── One / Simple ─────────────────────────────────────────────────────────
  it("round-trips a full entry with all fields typed and the consent version stamped", async () => {
    const h = harness();
    await storeCheckIn(smsEntry(), h.repo, h.lookup, h.logRefusal);

    expect(h.stored).toHaveLength(1);
    const entry = h.stored[0];
    expect(entry.destination).toBe("tool");
    expect(entry.intensity).toBe(7);
    expect(entry.recency).toBe("just_now");
    expect(entry.consentVersion).toBe("draft-0");
    expect(entry.receivedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  // ── Exception: the consent guard ─────────────────────────────────────────
  describe("consent-linkage guard", () => {
    it("refuses an entry with no linkable consent record", async () => {
      const h = harness([]);
      const result = await storeCheckIn(
        smsEntry(),
        h.repo,
        h.lookup,
        h.logRefusal,
      );

      expect(result.stored).toBe(false);
      expect(h.stored).toHaveLength(0);
      expect(h.refusals).toHaveLength(1);
      expect(h.refusals[0].reason).toBe("no_consent_record");
    });

    it("refuses a voice entry when the biometric scope is missing", async () => {
      const h = harness(); // CONSENT has voice: false
      const result = await storeCheckIn(
        smsEntry({ channel: "voice" }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );

      expect(result.stored).toBe(false);
      expect(h.refusals[0].reason).toBe("missing_scope_voice");
    });

    it("refuses when study consent itself is revoked", async () => {
      const h = harness([
        { ...CONSENT, scopes: { ...CONSENT.scopes, study: false } },
      ]);
      const result = await storeCheckIn(
        smsEntry(),
        h.repo,
        h.lookup,
        h.logRefusal,
      );

      expect(result.stored).toBe(false);
      expect(h.refusals[0].reason).toBe("missing_scope_study");
    });

    it("logs the refusal without the entry content", async () => {
      const h = harness([]);
      await storeCheckIn(
        smsEntry({ narrative: "something deeply personal" }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );

      expect(JSON.stringify(h.refusals)).not.toContain("deeply personal");
    });
  });

  // ── Boundary: intensity edges ────────────────────────────────────────────
  it.each([0, 10])(
    "accepts intensity %i at the boundary",
    async (intensity) => {
      const h = harness();
      const result = await storeCheckIn(
        smsEntry({ intensity }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );
      expect(result.stored).toBe(true);
    },
  );

  it("rejects an out-of-range intensity rather than clamping it", async () => {
    const h = harness();
    const result = await storeCheckIn(
      smsEntry({ intensity: 11 as never }),
      h.repo,
      h.lookup,
      h.logRefusal,
    );
    expect(result.stored).toBe(false);
    expect(h.refusals[0].reason).toBe("invalid_intensity");
  });

  // ── Interface / Many: pilot separation ───────────────────────────────────
  describe("pilot separation", () => {
    it("excludes pilot rows from analysis queries by construction", async () => {
      const h = harness();
      await storeCheckIn(
        smsEntry({ pilot: true, narrative: "pilot one" }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );
      await storeCheckIn(
        smsEntry({ narrative: "study one" }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );
      await storeCheckIn(
        smsEntry({ pilot: true, narrative: "pilot two" }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );

      const analysable = await analysisEntries(h.repo);

      expect(analysable).toHaveLength(1);
      expect(analysable[0].narrative).toBe("study one");
    });

    it("marks pilot on the stored entry immutably at ingest", async () => {
      const h = harness();
      await storeCheckIn(
        smsEntry({ pilot: true }),
        h.repo,
        h.lookup,
        h.logRefusal,
      );
      expect(h.stored[0].pilot).toBe(true);
    });
  });
});
