"use client";

import { useEffect } from "react";
import { flushTelemetry, installBeaconSink } from "@/lib/telemetrySink";

/**
 * Installs the beacon sink once per page load and flushes on page-hide, so
 * exit-adjacent events (the startScreenerClicked that navigates away) are
 * not lost with the tab. Renders nothing.
 */
export function TelemetryProvider() {
  useEffect(() => {
    installBeaconSink({});

    const onHide = () => flushTelemetry();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, []);

  return null;
}
