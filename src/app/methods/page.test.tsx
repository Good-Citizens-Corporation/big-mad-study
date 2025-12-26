import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import MethodsPage from "./page";

describe("MethodsPage", () => {
  it("renders the methods heading", () => {
    render(<MethodsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Research Methods/,
    );
  });
});
