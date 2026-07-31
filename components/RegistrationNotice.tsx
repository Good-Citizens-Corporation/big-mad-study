import Link from "next/link";
import type { PreRegistration } from "@/content/publicHome";

/**
 * The verifiable half of the transparency claim — SLICE-00-01 (issue #38).
 *
 * Before a registry issues a DOI this says so plainly rather than going quiet.
 * A missing section reads as an oversight; a stated "not yet" reads as a
 * commitment a visitor can hold us to, and it is the honest description of
 * where the study actually is.
 */
export function RegistrationNotice({
  registration,
}: {
  registration: PreRegistration | null;
}) {
  return (
    <section className="mt-16 border-t border-hairline pt-6">
      <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
        Pre-registration
      </p>

      {registration ? (
        <>
          <p className="mt-4 leading-[1.7]">
            The hypotheses, their nulls, the planned analysis, and the known
            limitations were filed with {registration.registry} on{" "}
            <time dateTime={registration.registeredAt}>
              {registration.registeredAt}
            </time>
            , before any data was collected. The record is frozen: we can amend
            it, but every amendment is visible, and we cannot rewrite what we
            originally predicted.
          </p>
          <p className="mt-4">
            <Link
              href={registration.url}
              className="font-data text-[0.63rem] uppercase tracking-[0.18em] text-accent"
            >
              {registration.doi}
            </Link>
          </p>
        </>
      ) : (
        <p className="mt-4 leading-[1.7]">
          Not yet registered. The hypotheses, their nulls, and the known
          limitations are written down in public on our issue tracker, but that
          is our own word with our own timestamps. They will be filed with an
          independent registry before we collect any data, and this page will
          carry the DOI when they are.
        </p>
      )}
    </section>
  );
}
