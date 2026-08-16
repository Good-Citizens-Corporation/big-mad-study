import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentGate } from "../../../components/ConsentGate";
import { CONSENT_VERSION } from "@/content/consent";
import { recordedEvents, resetTelemetry } from "@/lib/telemetry";

/**
 * SLICE-00-03 (issue #32) — the consent gate.
 *
 * The contract: consent is presented before any personal-data question,
 * declining is as easy as accepting and ends the flow gracefully, the three
 * agreements are independently refusable, and the decision carries the exact
 * version shown.
 */

describe("SLICE-00-03 consent gate", () => {
  const onDecision = vi.fn();

  beforeEach(() => {
    onDecision.mockReset();
    resetTelemetry();
    window.sessionStorage.clear();
  });

  const renderGate = () => render(<ConsentGate onDecision={onDecision} />);

  const agreeToStudy = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(
      screen.getByRole("checkbox", { name: /take part in this study/i }),
    );
    await user.click(screen.getByRole("checkbox", { name: /18 or older/i }));
  };

  describe("GIVEN a visitor arrives at the gate", () => {
    it("THEN the consent content renders with no data-collecting inputs", () => {
      renderGate();
      // The gate asks for agreement, never for data: no free-text inputs.
      expect(screen.queryAllByRole("textbox")).toHaveLength(0);
      expect(screen.getByText(/this study is unpaid/i)).toBeInTheDocument();
      expect(screen.getByText(/you can stop/i)).toBeInTheDocument();
    });

    it("THEN a draft version is visibly marked as not yet approved", () => {
      renderGate();
      if (CONSENT_VERSION.startsWith("draft")) {
        expect(
          screen.getByText(/draft.*not yet.*approved/i),
        ).toBeInTheDocument();
      }
    });

    it("THEN consentPresented fires once", () => {
      renderGate();
      const names = recordedEvents().map((e) => e.name);
      expect(names).toEqual(["consentPresented"]);
    });
  });

  describe("GIVEN the visitor declines", () => {
    it("THEN declining is one click, needs no checkboxes, and reports declined", async () => {
      const user = userEvent.setup();
      renderGate();

      await user.click(screen.getByRole("button", { name: /no thanks/i }));

      expect(onDecision).toHaveBeenCalledWith({ declined: true });
      expect(recordedEvents().some((e) => e.name === "consentDeclined")).toBe(
        true,
      );
    });
  });

  describe("GIVEN the visitor accepts", () => {
    it("THEN accepting requires the two required agreements", async () => {
      const user = userEvent.setup();
      renderGate();

      const accept = screen.getByRole("button", { name: /i agree/i });
      expect(accept).toBeDisabled();

      await agreeToStudy(user);
      expect(accept).toBeEnabled();
    });

    it("THEN the decision carries the exact consent version and the chosen scopes", async () => {
      const user = userEvent.setup();
      renderGate();

      await agreeToStudy(user);
      await user.click(
        screen.getByRole("checkbox", { name: /text messages/i }),
      );
      await user.click(screen.getByRole("button", { name: /i agree/i }));

      expect(onDecision).toHaveBeenCalledWith({
        declined: false,
        consentVersion: CONSENT_VERSION,
        scopes: { study: true, voice: false, sms: true },
      });
    });

    it("THEN voice and SMS are independently refusable while study consent stands", async () => {
      const user = userEvent.setup();
      renderGate();

      await agreeToStudy(user);
      await user.click(screen.getByRole("button", { name: /i agree/i }));

      expect(onDecision).toHaveBeenCalledWith({
        declined: false,
        consentVersion: CONSENT_VERSION,
        scopes: { study: true, voice: false, sms: false },
      });
    });

    it("THEN consentAccepted fires with the scopes and version, and no PII", async () => {
      const user = userEvent.setup();
      renderGate();

      await agreeToStudy(user);
      await user.click(
        screen.getByRole("checkbox", { name: /voice check-ins/i }),
      );
      await user.click(screen.getByRole("button", { name: /i agree/i }));

      const accepted = recordedEvents().find(
        (e) => e.name === "consentAccepted",
      );
      expect(accepted?.props).toEqual({
        consent_version: CONSENT_VERSION,
        biometric_scope: true,
        sms_scope: false,
      });
    });
  });
});
