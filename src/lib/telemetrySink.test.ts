import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushTelemetry, installBeaconSink } from "./telemetrySink";
import { recordedEvents, resetTelemetry, track } from "./telemetry";

/**
 * Follow-up to SLICE-04 (#12) — the first real sink.
 *
 * Events batch client-side and ship to /api/telemetry. The transport must
 * never affect the page: a dead endpoint loses events, not visitors. The
 * PII guard already ran in track(); the sink transports, it does not audit.
 */

describe("beacon sink", () => {
  beforeEach(() => {
    resetTelemetry();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    resetTelemetry();
  });

  it("batches events and ships them after the flush interval", () => {
    const sent: unknown[] = [];
    vi.stubGlobal("fetch", (url: string, init: RequestInit) => {
      sent.push({ url, body: JSON.parse(String(init.body)) });
      return Promise.resolve(new Response(null, { status: 204 }));
    });

    installBeaconSink({ flushMs: 5000 });
    track("landingViewed", { device_type: "desktop" });
    track("startScreenerClicked", { location_on_page: "hero" });

    expect(sent).toHaveLength(0); // nothing ships synchronously
    vi.advanceTimersByTime(5000);

    expect(sent).toHaveLength(1);
    const batch = (sent[0] as { body: { events: { name: string }[] } }).body;
    expect(batch.events.map((e) => e.name)).toEqual([
      "landingViewed",
      "startScreenerClicked",
    ]);
  });

  it("does not send an empty batch", () => {
    const sent: unknown[] = [];
    vi.stubGlobal("fetch", (...args: unknown[]) => {
      sent.push(args);
      return Promise.resolve(new Response(null, { status: 204 }));
    });

    installBeaconSink({ flushMs: 5000 });
    vi.advanceTimersByTime(20000);

    expect(sent).toHaveLength(0);
  });

  it("survives a dead endpoint without breaking the page or the next batch", () => {
    let calls = 0;
    vi.stubGlobal("fetch", () => {
      calls += 1;
      return Promise.reject(new Error("endpoint down"));
    });

    installBeaconSink({ flushMs: 1000 });
    track("landingViewed");
    expect(() => vi.advanceTimersByTime(1000)).not.toThrow();

    track("aboutPageViewed");
    vi.advanceTimersByTime(1000);
    expect(calls).toBe(2); // still trying; page never saw an error
  });

  it("keeps mirroring to the window buffer once installed", () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve(new Response(null, { status: 204 })),
    );
    installBeaconSink({ flushMs: 1000 });
    track("landingViewed");

    // The window buffer is the observability seam the E2E suite reads; the
    // sink adds transport, it must not remove visibility.
    expect(recordedEvents()).toHaveLength(1);
  });

  it("flushTelemetry ships immediately for page-hide moments", () => {
    const sent: unknown[] = [];
    vi.stubGlobal("fetch", (url: string, init: RequestInit) => {
      sent.push(JSON.parse(String(init.body)));
      return Promise.resolve(new Response(null, { status: 204 }));
    });

    installBeaconSink({ flushMs: 60000 });
    track("startScreenerClicked", { location_on_page: "nav" });
    flushTelemetry();

    expect(sent).toHaveLength(1);
  });
});
