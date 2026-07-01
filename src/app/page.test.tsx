import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideDeck } from "../../components/SlideDeck";
import { publicHomeSlides } from "../content/publicHome";

describe("Home page SlideDeck", () => {
  it("renders the study title", () => {
    render(<SlideDeck slides={publicHomeSlides} />);
    expect(
      screen.getByRole("heading", { name: /The Big-Mad Behavioral Study/i }),
    ).toBeInTheDocument();
  });

  it("renders the start here link", () => {
    render(<SlideDeck slides={publicHomeSlides} />);
    const startLinks = screen.getAllByRole("link", { name: /Start here/i });
    expect(startLinks.length).toBeGreaterThan(0);
  });
});
