import { configureTelemetry, type TelemetryEvent } from "./telemetry";

/**
 * The first real sink — batches events to /api/telemetry.
 *
 * Interim by design: the endpoint writes structured lines to the runtime
 * log, which makes EPIC-01's funnel readable in Vercel's log explorer today
 * without committing to an analytics vendor. Swapping in a vendor later is
 * a change to the endpoint, not to any call site — that was #12's whole
 * architecture.
 *
 * Transport rules: never synchronous, never throws to the page, never sends
 * empty batches, and a failed send keeps the page alive. Events in a failed
 * batch are dropped rather than retried-forever; measurement must never
 * grow a queue in a visitor's browser.
 */

let pending: TelemetryEvent[] = [];
let timer: ReturnType<typeof setInterval> | null = null;

function ship(): void {
  if (pending.length === 0) return;
  const events = pending;
  pending = [];

  try {
    void fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
      keepalive: true, // survives page-hide, the sendBeacon use case
    }).catch(() => {
      /* a dead endpoint loses events, not visitors */
    });
  } catch {
    /* fetch itself unavailable — same rule */
  }
}

export function installBeaconSink({ flushMs = 10_000 } = {}): void {
  if (timer) clearInterval(timer);
  pending = [];
  configureTelemetry((event) => {
    pending.push(event);
    // Mirror to the window buffer: it is the observability seam the E2E
    // suite and any debugging session read. The sink adds transport; it
    // must not remove visibility. (Replacing the buffer outright is what
    // broke BM-E2E-02/04 on the first attempt.)
    window.__bmTelemetry ??= [];
    window.__bmTelemetry.push(event);
  });
  timer = setInterval(ship, flushMs);
}

/** Immediate ship, for pagehide/visibilitychange moments. */
export function flushTelemetry(): void {
  ship();
}
