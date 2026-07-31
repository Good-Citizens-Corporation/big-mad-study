import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  classifyDevice,
  classifyReferrer,
  configureTelemetry,
  recordedEvents,
  resetTelemetry,
  track,
  trackOnce,
  type TelemetryEvent,
} from "./telemetry";

/**
 * SLICE-04 (issue #12) — telemetry for entry flows.
 *
 * ZOMBIES ordering: Zero (no props / absent window), One, Many, Boundary
 * (once-per-session idempotency), Interface (the pluggable sink), Exception
 * (illegal keys rejected), Simple (the entry-flow events end to end).
 */

describe("telemetry", () => {
  beforeEach(() => {
    resetTelemetry();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ── Zero ──────────────────────────────────────────────────────────────────
  it("records an event with no properties at all", () => {
    track("landingViewed");
    expect(recordedEvents()).toEqual([{ name: "landingViewed", props: {} }]);
  });

  // ── One ───────────────────────────────────────────────────────────────────
  it("records a single event with its properties", () => {
    track("startScreenerClicked", { location_on_page: "hero" });
    expect(recordedEvents()).toEqual([
      { name: "startScreenerClicked", props: { location_on_page: "hero" } },
    ]);
  });

  // ── Many ──────────────────────────────────────────────────────────────────
  it("records many events in the order they happened", () => {
    track("aboutPageViewed");
    track("methodsPageViewed");
    track("participantsPageViewed");
    expect(recordedEvents().map((e) => e.name)).toEqual([
      "aboutPageViewed",
      "methodsPageViewed",
      "participantsPageViewed",
    ]);
  });

  // ── Interface ─────────────────────────────────────────────────────────────
  describe("pluggable sink", () => {
    it("sends events to a configured sink instead of the buffer", () => {
      const sent: TelemetryEvent[] = [];
      configureTelemetry((event) => sent.push(event));

      track("landingViewed", { device_type: "desktop" });

      expect(sent).toEqual([
        { name: "landingViewed", props: { device_type: "desktop" } },
      ]);
    });

    it("does not let a throwing sink break the caller", () => {
      configureTelemetry(() => {
        throw new Error("provider is down");
      });

      expect(() => track("landingViewed")).not.toThrow();
    });
  });

  // ── Exception ─────────────────────────────────────────────────────────────
  describe("PII refusal", () => {
    it.each([
      "email",
      "phone",
      "name",
      "full_name",
      "address",
      "ip",
      "participant_id",
    ])("drops the event when props carry %s", (key) => {
      track("landingViewed", { [key]: "whatever" });
      expect(recordedEvents()).toEqual([]);
    });

    it("drops the event when a value looks like an email address", () => {
      track("landingViewed", { referrer_category: "bob@goodcitizens.us" });
      expect(recordedEvents()).toEqual([]);
    });

    it("allows a hashed identifier through", () => {
      track("landingViewed", { hashed_participant_id: "abc123" });
      expect(recordedEvents()).toHaveLength(1);
    });
  });

  // ── Boundary ──────────────────────────────────────────────────────────────
  describe("once per session", () => {
    it("records the first call and ignores repeats", () => {
      trackOnce("landingViewed", { device_type: "mobile" });
      trackOnce("landingViewed", { device_type: "mobile" });
      trackOnce("landingViewed", { device_type: "mobile" });

      expect(recordedEvents()).toHaveLength(1);
    });

    it("records again once the session is cleared", () => {
      trackOnce("landingViewed");
      window.sessionStorage.clear();
      trackOnce("landingViewed");

      expect(recordedEvents()).toHaveLength(2);
    });

    it("still records when sessionStorage is unavailable", () => {
      vi.stubGlobal("sessionStorage", {
        getItem: () => {
          throw new Error("blocked by browser settings");
        },
        setItem: () => {
          throw new Error("blocked by browser settings");
        },
        clear: () => {},
      });

      expect(() => trackOnce("landingViewed")).not.toThrow();
      expect(recordedEvents()).toHaveLength(1);
    });
  });
});

describe("classifyDevice", () => {
  it.each([
    [320, "mobile"],
    [767, "mobile"],
    [768, "tablet"],
    [1023, "tablet"],
    [1024, "desktop"],
  ])("classifies width %i as %s", (width, expected) => {
    expect(classifyDevice(width)).toBe(expected);
  });
});

describe("classifyReferrer", () => {
  it("returns direct for an empty referrer", () => {
    expect(classifyReferrer("")).toBe("direct");
  });

  it.each([
    ["https://www.linkedin.com/feed/", "linkedin"],
    ["https://lnkd.in/abc", "linkedin"],
    ["https://www.google.com/search?q=big+mad", "search"],
    ["https://duckduckgo.com/", "search"],
    ["https://news.ycombinator.com/item?id=1", "other"],
  ])("classifies %s as %s", (referrer, expected) => {
    expect(classifyReferrer(referrer)).toBe(expected);
  });

  it("never returns the referrer itself, which could carry a path", () => {
    const category = classifyReferrer("https://example.com/private/thing?t=1");
    expect(category).not.toContain("private");
    expect(category).toBe("other");
  });
});
