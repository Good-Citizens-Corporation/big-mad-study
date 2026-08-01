import { describe, expect, it } from "vitest";
import { buildPublicHomeSlides, type PreRegistration } from "./publicHome";
import { preRegistration } from "./registration";

/**
 * SLICE-00-01 (issue #38) — pre-registration.
 *
 * The landing page tells visitors the hypotheses were written down before any
 * data was collected. Until a registry says so with a timestamp, that claim
 * rests on our own word. These tests hold the copy to whichever of the two
 * states is actually true.
 */

const REGISTERED: PreRegistration = {
  registry: "OSF Registries",
  doi: "10.17605/OSF.IO/EXAMPLE",
  url: "https://doi.org/10.17605/OSF.IO/EXAMPLE",
  registeredAt: "2026-08-14",
};

const behindSlide = (registration: PreRegistration | null) => {
  const slide = buildPublicHomeSlides(registration).find(
    (s) => s.id === "whos-behind-this",
  );
  if (!slide) throw new Error("the who's-behind-this slide went missing");
  return slide;
};

const proseOf = (registration: PreRegistration | null) =>
  (behindSlide(registration).body ?? [])
    .flatMap((item) => (item.type === "p" ? [item.text] : item.items))
    .join(" ");

describe("SLICE-00-01 pre-registration claim", () => {
  describe("GIVEN the study is not registered yet", () => {
    it("THEN the copy makes no past-tense claim of public registration", () => {
      const prose = proseOf(null);

      // The phrasing that would be a lie before a registry timestamp exists.
      expect(prose).not.toMatch(/pre-?registered/i);
      expect(prose).not.toMatch(/were written down before any data/i);
    });

    it("THEN it states the intention instead, in the future tense", () => {
      expect(proseOf(null)).toMatch(/before we collect any data/i);
    });

    it("THEN no registration link is offered", () => {
      const ctas = behindSlide(null).ctas ?? [];
      expect(ctas.map((c) => c.label)).not.toContain(
        "Read the pre-registration",
      );
    });
  });

  describe("GIVEN the study has been registered", () => {
    it("THEN the copy may claim it, naming the registry", () => {
      const prose = proseOf(REGISTERED);
      expect(prose).toMatch(/OSF Registries/);
      expect(prose).toMatch(/before we collected any data/i);
    });

    it("THEN the claim is followed by a link to the registration itself", () => {
      const ctas = behindSlide(REGISTERED).ctas ?? [];
      const link = ctas.find((c) => c.label === "Read the pre-registration");

      expect(link).toBeDefined();
      expect(link?.href).toBe(REGISTERED.url);
    });

    it("THEN the link resolves through doi.org, which outlives any one registry", () => {
      const ctas = behindSlide(REGISTERED).ctas ?? [];
      const link = ctas.find((c) => c.label === "Read the pre-registration");
      expect(link?.href).toMatch(/^https:\/\/doi\.org\//);
    });
  });

  describe("the shipped value", () => {
    it("is null until the registration actually exists", () => {
      // Flipping this on without a real DOI is what this test exists to stop.
      if (preRegistration !== null) {
        expect(preRegistration.url).toMatch(/^https:\/\/doi\.org\/10\./);
        expect(preRegistration.doi).not.toMatch(/example/i);
        expect(preRegistration.registeredAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      } else {
        expect(preRegistration).toBeNull();
      }
    });

    it("keeps every other slide identical in both states", () => {
      const withReg = buildPublicHomeSlides(REGISTERED);
      const without = buildPublicHomeSlides(null);

      expect(withReg).toHaveLength(without.length);

      const otherTitles = (registration: PreRegistration | null) =>
        buildPublicHomeSlides(registration)
          .filter((s) => s.id !== "whos-behind-this")
          .map((s) => s.title);

      expect(otherTitles(REGISTERED)).toEqual(otherTitles(null));
    });
  });
});
