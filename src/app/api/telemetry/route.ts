import { NextResponse } from "next/server";

/**
 * Interim telemetry endpoint, receives client batches and writes one
 * structured line per event to the runtime log, where Vercel's log explorer
 * can filter on `[bm-event]`. Replaced by a vendor adapter when one is
 * chosen; call sites never change (#12).
 *
 * Defensive by shape, not by trust: the client guard already refused PII,
 * but this endpoint is reachable by anyone, so it enforces size caps and
 * drops anything that is not a {name, props} pair of primitives.
 */

const MAX_EVENTS_PER_BATCH = 50;
const MAX_NAME_LENGTH = 64;
const MAX_PROP_VALUE_LENGTH = 200;

type Loggable = {
  name: string;
  props: Record<string, string | number | boolean>;
};

function sanitize(candidate: unknown): Loggable | null {
  if (typeof candidate !== "object" || candidate === null) return null;
  const { name, props } = candidate as { name?: unknown; props?: unknown };
  if (
    typeof name !== "string" ||
    name.length === 0 ||
    name.length > MAX_NAME_LENGTH
  ) {
    return null;
  }

  const cleanProps: Loggable["props"] = {};
  if (typeof props === "object" && props !== null) {
    for (const [key, value] of Object.entries(props)) {
      if (key.length > MAX_NAME_LENGTH) continue;
      if (typeof value === "number" || typeof value === "boolean") {
        cleanProps[key] = value;
      } else if (
        typeof value === "string" &&
        value.length <= MAX_PROP_VALUE_LENGTH
      ) {
        cleanProps[key] = value;
      }
    }
  }
  return { name, props: cleanProps };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 }) as NextResponse;
  }

  const events = Array.isArray((body as { events?: unknown[] })?.events)
    ? (body as { events: unknown[] }).events.slice(0, MAX_EVENTS_PER_BATCH)
    : [];

  for (const candidate of events) {
    const event = sanitize(candidate);
    if (event) {
      console.log(`[bm-event] ${JSON.stringify(event)}`);
    }
  }

  // Always 204: telemetry endpoints have nothing to say to the client, and
  // an error status would invite retry loops from the page.
  return new NextResponse(null, { status: 204 }) as NextResponse;
}
