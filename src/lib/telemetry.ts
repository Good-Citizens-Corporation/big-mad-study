/**
 * Minimal event sink.
 *
 * SLICE-04 (issue #12) owns wiring a real analytics provider. Until then this
 * buffers events on the client so the acceptance criteria for earlier slices
 * are testable and the event contract in the epics is exercised rather than
 * merely written down. Nothing leaves the browser.
 */

export type TelemetryEvent = {
  name: string;
  props?: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    __bmTelemetry?: TelemetryEvent[];
  }
}

export function track(
  name: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  window.__bmTelemetry ??= [];
  window.__bmTelemetry.push({ name, props });
}

export function recordedEvents(): TelemetryEvent[] {
  if (typeof window === "undefined") return [];
  return window.__bmTelemetry ?? [];
}
