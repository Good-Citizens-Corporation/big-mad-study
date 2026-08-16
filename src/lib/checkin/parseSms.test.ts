import { describe, expect, it } from "vitest";
import { parseSms } from "./parseSms";

/**
 * SLICE-04-02 (issue #45), the SMS parser.
 *
 * The format teaches; the parser accommodates. People will not follow the
 * order, will spell destinations their own way, and will sometimes send
 * only a story. Every parse returns a full result with skips where pieces
 * are missing, the parser never fails, it only degrades.
 */

describe("parseSms", () => {
  // ── Zero ──────────────────────────────────────────────────────────────────
  it("returns all-skipped fields for an empty message", () => {
    const parsed = parseSms("");
    expect(parsed).toEqual({
      narrative: "",
      destination: "skipped",
      intensity: "skipped",
      recency: "skipped",
      complete: false,
    });
  });

  // ── Simple: the taught format ────────────────────────────────────────────
  it("parses the taught format: number, destination, recency, story", () => {
    const parsed = parseSms(
      "7, the tool, just now, the routing app rerouted me twice",
    );
    expect(parsed.intensity).toBe(7);
    expect(parsed.destination).toBe("tool");
    expect(parsed.recency).toBe("just_now");
    expect(parsed.narrative).toBe("the routing app rerouted me twice");
    expect(parsed.complete).toBe(true);
  });

  // ── Many: order does not matter ──────────────────────────────────────────
  it.each([
    "the app ate my shift, 9, them, earlier today",
    "9 them earlier today, the app ate my shift",
    "them. earlier today. 9. the app ate my shift",
  ])("parses the same fields from any ordering: %s", (message) => {
    const parsed = parseSms(message);
    expect(parsed.intensity).toBe(9);
    expect(parsed.destination).toBe("other_people");
    expect(parsed.recency).toBe("earlier_today");
    expect(parsed.narrative).toContain("the app ate my shift");
  });

  // ── Destination vocabulary ───────────────────────────────────────────────
  it.each([
    ["tool", "tool"],
    ["the app", "tool"],
    ["them", "other_people"],
    ["other people", "other_people"],
    ["my coworkers", "other_people"],
    ["me", "myself"],
    ["myself", "myself"],
    ["nowhere", "nowhere"],
    ["no one", "nowhere"],
  ])("maps destination word %s to %s", (word, expected) => {
    const parsed = parseSms(`5, ${word}, just now, a thing happened`);
    expect(parsed.destination).toBe(expected);
  });

  // ── Recency vocabulary ───────────────────────────────────────────────────
  it.each([
    ["just now", "just_now"],
    ["a minute ago", "just_now"],
    ["within the hour", "within_hour"],
    ["an hour ago", "within_hour"],
    ["earlier today", "earlier_today"],
    ["this morning", "earlier_today"],
    ["yesterday", "before_today"],
    ["last week", "before_today"],
  ])("maps recency phrase %s to %s", (phrase, expected) => {
    const parsed = parseSms(`5, the tool, ${phrase}, a thing happened`);
    expect(parsed.recency).toBe(expected);
  });

  // ── Boundary ─────────────────────────────────────────────────────────────
  it.each([0, 10])("accepts intensity %i", (n) => {
    expect(parseSms(`${n}, tool, just now, story`).intensity).toBe(n);
  });

  it("does not read 11 as an intensity", () => {
    const parsed = parseSms("11, tool, just now, story about 11 things");
    expect(parsed.intensity).toBe("skipped");
  });

  it("does not steal a number that is part of the narrative", () => {
    // No standalone leading/trailing rating, "2 hours" is story, not score.
    const parsed = parseSms("waited 2 hours for the system to come back, tool");
    expect(parsed.intensity).toBe("skipped");
    expect(parsed.narrative).toContain("2 hours");
  });

  // ── Exception: narrative-only ────────────────────────────────────────────
  it("keeps a narrative-only message as an incomplete parse, not an error", () => {
    const parsed = parseSms("the scheduler double-booked me and nobody cares");
    expect(parsed.narrative).toBe(
      "the scheduler double-booked me and nobody cares",
    );
    expect(parsed.destination).toBe("skipped");
    expect(parsed.complete).toBe(false);
  });
});
