/**
 * Client-side telemetry for entry flows, SLICE-04 (issue #12).
 *
 * The sink is pluggable so a provider can be swapped in later without
 * touching a single call site. Until one is configured, events buffer on
 * `window.__bmTelemetry` and nothing leaves the browser.
 *
 * The PII refusal below is not decoration. This is a behavioural study whose
 * landing page promises participants that analytics never carry identifying
 * data; the cheapest way to keep that promise is to make the violation
 * impossible at the one place every event passes through.
 */

export type TelemetryProps = Record<string, string | number | boolean>;

export type TelemetryEvent = {
  name: string;
  props: TelemetryProps;
};

export type TelemetrySink = (event: TelemetryEvent) => void;

export type DeviceType = "mobile" | "tablet" | "desktop";
export type ReferrerCategory = "linkedin" | "search" | "direct" | "other";

declare global {
  interface Window {
    __bmTelemetry?: TelemetryEvent[];
  }
}

/**
 * Property names that must never appear in analytics. `hashed_` prefixed keys
 * are exempt: a hashed participant id is the intended way to correlate events.
 */
const FORBIDDEN_KEY =
  /(^|_)(email|phone|name|address|ip|ssn|dob)($|_)|participant_id$/;
const LOOKS_LIKE_EMAIL = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const LOOKS_LIKE_PHONE = /\+?\d[\d\s().-]{8,}/;

let sink: TelemetrySink | null = null;

/** Swap in a provider. Passing null restores the in-memory buffer. */
export function configureTelemetry(next: TelemetrySink | null): void {
  sink = next;
}

/** Clears the buffer and any configured sink. Test seam. */
export function resetTelemetry(): void {
  sink = null;
  if (typeof window !== "undefined") window.__bmTelemetry = [];
}

function carriesPII(props: TelemetryProps): boolean {
  return Object.entries(props).some(([key, value]) => {
    if (key.startsWith("hashed_")) return false;
    if (FORBIDDEN_KEY.test(key)) return true;
    if (typeof value !== "string") return false;
    return LOOKS_LIKE_EMAIL.test(value) || LOOKS_LIKE_PHONE.test(value);
  });
}

export function track(name: string, props: TelemetryProps = {}): void {
  if (typeof window === "undefined") return;

  // Drop rather than sanitize: a silently stripped property is a bug that
  // ships, whereas a missing event shows up the first time anyone looks.
  if (carriesPII(props)) {
    console.warn(`[telemetry] dropped "${name}", properties carry PII`);
    return;
  }

  const event: TelemetryEvent = { name, props };

  if (sink) {
    // A failing analytics provider must never break the page it measures.
    try {
      sink(event);
    } catch {
      /* swallowed deliberately */
    }
    return;
  }

  window.__bmTelemetry ??= [];
  window.__bmTelemetry.push(event);
}

/**
 * Fires at most once per browser session. Used for view events, which would
 * otherwise re-fire on every client-side navigation back to the page.
 */
export function trackOnce(name: string, props: TelemetryProps = {}): void {
  if (typeof window === "undefined") return;

  const key = `bm:seen:${name}`;

  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Private browsing or blocked storage. Measuring twice beats not at all.
  }

  track(name, props);
}

export function recordedEvents(): TelemetryEvent[] {
  if (typeof window === "undefined") return [];
  return window.__bmTelemetry ?? [];
}

export function classifyDevice(width: number): DeviceType {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Deliberately lossy. The raw referrer can carry a path and query string that
 * say more about a visitor than we have any business recording, so only the
 * category survives.
 */
export function classifyReferrer(referrer: string): ReferrerCategory {
  if (!referrer) return "direct";

  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "other";
  }

  if (host.includes("linkedin") || host.includes("lnkd.in")) return "linkedin";

  const searchHosts = ["google.", "bing.", "duckduckgo.", "search.", "ecosia."];
  if (searchHosts.some((needle) => host.includes(needle))) return "search";

  return "other";
}

/** The properties every entry-flow view event carries. */
export function entryContext(): TelemetryProps {
  if (typeof window === "undefined") return {};
  return {
    device_type: classifyDevice(window.innerWidth),
    referrer_category: classifyReferrer(document.referrer),
  };
}
