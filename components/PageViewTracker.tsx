"use client";

import { useEffect } from "react";
import { entryContext, trackOnce } from "@/lib/telemetry";

/**
 * Fires a page-view event once per session. Renders nothing.
 *
 * Once-per-session rather than once-per-mount: App Router keeps components
 * alive across client navigations, so a plain mount effect would re-fire
 * every time a visitor came back to the page and inflate the denominator of
 * every funnel metric in EPIC-01.
 */
export function PageViewTracker({ event }: { event: string }) {
  useEffect(() => {
    trackOnce(event, entryContext());
  }, [event]);

  return null;
}
