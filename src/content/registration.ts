import type { PreRegistration } from "./publicHome";

/**
 * The study's pre-registration, SLICE-00-01 (issue #38).
 *
 * `null` until a registry has actually issued a DOI. The landing copy and
 * /methods both read this value and change what they claim accordingly, so
 * the site cannot assert public pre-registration before one exists.
 *
 * To publish: submit `docs/compliance/pre-registration.md` to OSF Registries,
 * then replace the null below with the issued DOI. Nothing else needs editing
 *, the copy, the link, and the /methods notice all follow from this object.
 *
 * Do not fill this in with a draft or private-project URL. A registration that
 * is not frozen and public is not a registration, and the whole point of the
 * claim is that a reader can check it without trusting us.
 */
export const preRegistration: PreRegistration | null = null;
