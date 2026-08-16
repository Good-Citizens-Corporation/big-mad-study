import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegistrationNotice } from "../../../components/RegistrationNotice";
import type { PreRegistration } from "@/content/publicHome";

const REGISTERED: PreRegistration = {
  registry: "OSF Registries",
  doi: "10.17605/OSF.IO/EXAMPLE",
  url: "https://doi.org/10.17605/OSF.IO/EXAMPLE",
  registeredAt: "2026-08-14",
};

describe("SLICE-00-01 registration notice on /methods", () => {
  describe("GIVEN no registration exists", () => {
    it("THEN it says so rather than staying silent", () => {
      render(<RegistrationNotice registration={null} />);
      expect(screen.getByText(/not yet registered/i)).toBeInTheDocument();
    });

    it("THEN it does not claim an independent timestamp", () => {
      render(<RegistrationNotice registration={null} />);
      expect(
        screen.queryByText(/before any data was collected/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("THEN it names what a visitor is actually relying on instead", () => {
      render(<RegistrationNotice registration={null} />);
      expect(screen.getByText(/our own word/i)).toBeInTheDocument();
    });
  });

  describe("GIVEN a registration exists", () => {
    it("THEN the DOI is a link a visitor can follow", () => {
      render(<RegistrationNotice registration={REGISTERED} />);
      const link = screen.getByRole("link", { name: REGISTERED.doi });
      expect(link).toHaveAttribute("href", REGISTERED.url);
    });

    it("THEN the date is machine-readable, not just printed", () => {
      const { container } = render(
        <RegistrationNotice registration={REGISTERED} />,
      );
      const time = container.querySelector("time");
      expect(time).toHaveAttribute("dateTime", REGISTERED.registeredAt);
    });

    it("THEN it states the record is frozen and amendments are visible", () => {
      render(<RegistrationNotice registration={REGISTERED} />);
      expect(screen.getByText(/frozen/i)).toBeInTheDocument();
      expect(
        screen.getByText(/every amendment is visible/i),
      ).toBeInTheDocument();
    });
  });
});
