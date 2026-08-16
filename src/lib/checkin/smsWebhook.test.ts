import { beforeEach, describe, expect, it } from "vitest";
import type { CheckInEntry } from "./types";
import type { CheckInRepository, ConsentLookup } from "./store";
import { handleInboundSms, type SmsDeps } from "./smsWebhook";
import type { ConsentRecord } from "@/lib/consent/types";

/**
 * SLICE-04-02 (issue #45) — the inbound SMS webhook, tested against Twilio
 * fixture payloads. The consent guard is exercised through the whole path:
 * an un-consented number produces no stored entry and no study content in
 * the reply.
 */

const CONSENT: ConsentRecord = {
  hashedParticipantId: "hp_abc",
  consentVersion: "draft-0",
  scopes: { study: true, voice: false, sms: true },
  agreedAt: "2026-08-01T00:00:00Z",
};

function fixture(body: string, from = "+15551230000") {
  return { From: from, Body: body };
}

function harness(consents: ConsentRecord[] = [CONSENT]) {
  const stored: CheckInEntry[] = [];
  const repairPending = new Map<string, string>();
  const repo: CheckInRepository = {
    persist: async (entry) => (stored.push(entry), entry),
    all: async () => stored,
  };
  const findConsent: ConsentLookup = async (id) =>
    consents.find((c) => c.hashedParticipantId === id) ?? null;
  const deps: SmsDeps = {
    repo,
    findConsent,
    // A real hash never embeds the number; the fake must not either, or the
    // never-stores-raw-phone assertion tests the fixture instead of the code.
    hashPhone: (phone) => (phone === "+15551230000" ? "hp_abc" : "hp_unknown"),
    logRefusal: () => {},
    repairPending: {
      get: (id) => repairPending.get(id) ?? null,
      set: (id, narrative) => void repairPending.set(id, narrative),
      delete: (id) => void repairPending.delete(id),
    },
    pilot: false,
  };
  return { deps, stored, repairPending };
}

describe("SLICE-04-02 inbound SMS", () => {
  let h: ReturnType<typeof harness>;
  beforeEach(() => {
    h = harness();
  });

  it("stores a well-formed message and confirms", async () => {
    const reply = await handleInboundSms(
      fixture("7, the tool, just now, the routing app rerouted me twice"),
      h.deps,
    );

    expect(h.stored).toHaveLength(1);
    expect(h.stored[0].intensity).toBe(7);
    expect(h.stored[0].destination).toBe("tool");
    expect(reply).toMatch(/got it/i);
  });

  it("asks once for the missing pieces, then stores what it has", async () => {
    const first = await handleInboundSms(
      fixture("the scheduler double-booked me"),
      h.deps,
    );
    expect(h.stored).toHaveLength(0);
    expect(first).toMatch(/0.*10/); // the repair prompt reteaches the format

    const second = await handleInboundSms(fixture("8, me"), h.deps);
    expect(h.stored).toHaveLength(1);
    // The first message's story is not lost — it merges with the repair reply.
    expect(h.stored[0].narrative).toContain("the scheduler double-booked me");
    expect(h.stored[0].intensity).toBe(8);
    expect(h.stored[0].destination).toBe("myself");
    expect(second).toMatch(/got it/i);
  });

  it("does not loop: a complete entry clears the repair state", async () => {
    await handleInboundSms(fixture("only a story"), h.deps);
    await handleInboundSms(fixture("8, me, just now, rough one"), h.deps);
    expect(h.repairPending.size).toBe(0);
  });

  it("refuses an un-consented number: nothing stored, no study content echoed", async () => {
    const reply = await handleInboundSms(
      fixture("7, tool, just now, something personal", "+19998887777"),
      h.deps,
    );

    expect(h.stored).toHaveLength(0);
    expect(reply).not.toContain("something personal");
    expect(reply).toMatch(/isn.t enrolled/i);
  });

  it("marks entries as pilot when the flow runs in pilot mode", async () => {
    const pilotDeps = { ...h.deps, pilot: true };
    await handleInboundSms(
      fixture("5, them, just now, pilot story"),
      pilotDeps,
    );
    expect(h.stored[0].pilot).toBe(true);
  });

  it("never stores the raw phone number", async () => {
    await handleInboundSms(fixture("5, them, just now, a story"), h.deps);
    expect(JSON.stringify(h.stored)).not.toContain("+15551230000");
  });
});
