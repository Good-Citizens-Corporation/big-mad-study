import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home, { sections } from "./page";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Welcome to the Big Mad Study/,
    );
  });

  it("renders navigation links with accessible names", () => {
    render(<Home />);
    sections.forEach((section) => {
      const link = screen.getByRole("link", {
        name: new RegExp(section.title, "i"),
      });
      expect(link).toBeInTheDocument();
    });
  });
});
