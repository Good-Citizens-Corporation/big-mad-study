import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { SlideDeck } from "../../components/SlideDeck";
import { publicHomeSlides } from "../content/publicHome";

/**
 * SLICE-02 (issue #10) — Big-Mad story & value prop.
 *
 * Guards the three acceptance criteria: a visitor can tell what the study is
 * and what they'd be doing, can see who is behind it, and can find the
 * data-handling explanation.
 */

const section = (name: RegExp) =>
  screen.getByRole("heading", { name }).closest("section") as HTMLElement;

describe("SLICE-02 landing story", () => {
  it("GIVEN a visitor lands on / THEN a study description section explains what this is", () => {
    render(<SlideDeck slides={publicHomeSlides} />);

    const about = section(/what this study is about/i);
    expect(about).toBeInTheDocument();
    expect(within(about).getByText(/who it's for/i)).toBeInTheDocument();
  });

  it("THEN the same section answers who it's for, time commitment, and what you get back", () => {
    render(<SlideDeck slides={publicHomeSlides} />);

    const about = section(/what this study is about/i);
    const bullets = within(about).getAllByRole("listitem");

    // The slice asks for 3–5 bullets covering all three questions.
    expect(bullets.length).toBeGreaterThanOrEqual(3);
    expect(bullets.length).toBeLessThanOrEqual(5);

    const text = bullets.map((li) => li.textContent ?? "").join(" ");
    expect(text).toMatch(/who it's for/i);
    expect(text).toMatch(/time commitment/i);
    expect(text).toMatch(/what you get back/i);
  });

  it("GIVEN a visitor wants to know who's behind this THEN Good Citizens is named and linked", () => {
    render(<SlideDeck slides={publicHomeSlides} />);

    const behind = section(/who's behind this/i);
    // Named in the prose and again as the link, which is the point.
    expect(
      within(behind).getAllByText(/good citizens/i).length,
    ).toBeGreaterThan(1);

    const link = within(behind).getByRole("link", { name: /good citizens/i });
    expect(link).toHaveAttribute("href", "https://goodcitizens.us");
  });

  it("THEN that section states the motivation and values in prose, not just a link", () => {
    render(<SlideDeck slides={publicHomeSlides} />);

    const behind = section(/who's behind this/i);
    const prose = Array.from(behind.querySelectorAll("p"))
      .map((paragraph) => paragraph.textContent ?? "")
      .join(" ");

    expect(prose.length).toBeGreaterThan(200);
  });

  it("GIVEN a visitor cares about ethics THEN they can find the data-handling link to /methods", () => {
    render(<SlideDeck slides={publicHomeSlides} />);

    const links = screen.getAllByRole("link", {
      name: /how we handle data/i,
    });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/methods");
    }
  });

  it("gives every slide an anchor id so section links and telemetry can target it", () => {
    for (const slide of publicHomeSlides) {
      expect(slide.id, `slide "${slide.title}" has no id`).toBeTruthy();
    }
  });
});
