import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ParticipantsPage from "./page";

describe("ParticipantsPage", () => {
  it("renders the participants heading", () => {
    render(<ParticipantsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Participants/,
    );
  });
});
