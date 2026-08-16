import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageViewTracker } from "../../components/PageViewTracker";
import { StartScreenerLink } from "../../components/StartScreenerLink";
import { recordedEvents, resetTelemetry } from "@/lib/telemetry";
import AboutPage from "./about/page";
import MethodsPage from "./methods/page";
import ParticipantsPage from "./participants/page";

/**
 * SLICE-04 (issue #12) — the acceptance criteria, one describe per GIVEN.
 */

const names = () => recordedEvents().map((event) => event.name);
const propsOf = (name: string) =>
  recordedEvents().find((event) => event.name === name)?.props ?? {};

describe("SLICE-04 entry-flow instrumentation", () => {
  beforeEach(() => {
    resetTelemetry();
    window.sessionStorage.clear();
  });

  describe("GIVEN a visitor loads a page", () => {
    it("THEN the named view event fires once with non-PII context", () => {
      render(<PageViewTracker event="landingViewed" />);

      expect(names()).toEqual(["landingViewed"]);
      expect(Object.keys(propsOf("landingViewed")).sort()).toEqual([
        "device_type",
        "referrer_category",
      ]);
    });

    it("THEN re-rendering does not fire it a second time", () => {
      const { rerender } = render(<PageViewTracker event="landingViewed" />);
      rerender(<PageViewTracker event="landingViewed" />);

      expect(names()).toEqual(["landingViewed"]);
    });
  });

  describe("GIVEN a visitor navigates to a supporting page", () => {
    it.each([
      [AboutPage, "aboutPageViewed"],
      [MethodsPage, "methodsPageViewed"],
      [ParticipantsPage, "participantsPageViewed"],
    ])("THEN %# sends its view event", (Page, expected) => {
      render(<Page />);
      expect(names()).toContain(expected);
    });
  });

  describe("GIVEN a visitor clicks the primary screener CTA", () => {
    it("THEN startScreenerClicked fires with where on the page it happened", async () => {
      const user = userEvent.setup();
      render(
        <StartScreenerLink href="/start" location="hero">
          Start here
        </StartScreenerLink>,
      );

      await user.click(screen.getByRole("link", { name: "Start here" }));

      expect(names()).toEqual(["startScreenerClicked"]);
      expect(propsOf("startScreenerClicked")).toEqual({
        location_on_page: "hero",
      });
    });

    it("THEN it fires on every click, unlike a view event", async () => {
      const user = userEvent.setup();
      render(
        <StartScreenerLink href="/start" location="nav">
          Start here
        </StartScreenerLink>,
      );

      const link = screen.getByRole("link", { name: "Start here" });
      await user.click(link);
      await user.click(link);

      expect(names()).toEqual(["startScreenerClicked", "startScreenerClicked"]);
    });

    it("THEN the link still navigates — telemetry does not swallow the click", async () => {
      const user = userEvent.setup();
      render(
        <StartScreenerLink href="/start" location="hero">
          Start here
        </StartScreenerLink>,
      );

      const link = screen.getByRole("link", { name: "Start here" });
      expect(link).toHaveAttribute("href", "/start");

      const clickWasNotPrevented = link.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
      expect(clickWasNotPrevented).toBe(true);
      await user.click(link);
    });
  });
});
