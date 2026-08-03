import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { handleInboundSms, type SmsDeps } from "@/lib/checkin/smsWebhook";
import type { CheckInEntry } from "@/lib/checkin/types";

/**
 * Twilio inbound-SMS webhook, SLICE-04-02 (issue #45).
 *
 * Wiring only: all behavior lives in handleInboundSms, which is where the
 * tests are. Until persistence exists, the consent lookup returns null for
 * everyone, so every real message gets the not-enrolled reply and nothing
 * is ever stored. The safe default is the deliberate one: this endpoint can
 * ship to staging today without being able to collect a single entry.
 */

const entries: CheckInEntry[] = [];
const repairs = new Map<string, string>();

function hashPhone(phone: string): string {
  // HMAC, not plain SHA-256: without the secret, a phone number cannot be
  // confirmed against its hash by brute-forcing the ten-digit space.
  const secret = process.env.PARTICIPANT_HASH_SECRET ?? "";
  if (!secret) return "hp_unconfigured";
  return `hp_${createHmac("sha256", secret).update(phone).digest("hex").slice(0, 32)}`;
}

const deps: SmsDeps = {
  repo: {
    persist: async (entry) => (entries.push(entry), entry),
    all: async () => entries,
  },
  // Enrollment does not exist yet (#32 stores no decisions, by design), so
  // no number has consent and the guard refuses everything. Replaced by the
  // real consent store when enrollment opens.
  findConsent: async () => null,
  hashPhone,
  logRefusal: (reason) => console.warn(`[sms] refused: ${reason}`),
  repairPending: {
    get: (id) => repairs.get(id) ?? null,
    set: (id, narrative) => void repairs.set(id, narrative),
    delete: (id) => void repairs.delete(id),
  },
  pilot: process.env.CHECKIN_PILOT_MODE === "true",
};

export async function POST(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const from = String(form.get("From") ?? "");
  const body = String(form.get("Body") ?? "");

  const reply = await handleInboundSms({ From: from, Body: body }, deps);

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply}</Message></Response>`;
  return new NextResponse(twiml, {
    headers: { "Content-Type": "text/xml" },
  }) as NextResponse;
}
