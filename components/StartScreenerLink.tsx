"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/telemetry";

/**
 * The primary conversion action. Emits `startScreenerClicked` before handing
 * the click back to the browser.
 *
 * It does not preventDefault or navigate programmatically: EPIC-01 measures
 * this click as its headline metric, and an instrumented link that eats the
 * navigation would trade the conversion for the measurement of it.
 */
export function StartScreenerLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        track("startScreenerClicked", { location_on_page: location })
      }
    >
      {children}
    </Link>
  );
}
