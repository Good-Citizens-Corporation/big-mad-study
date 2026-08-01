import { PageViewTracker } from "../../../components/PageViewTracker";
import { RegistrationNotice } from "../../../components/RegistrationNotice";
import { preRegistration } from "@/content/registration";

export default function MethodsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <PageViewTracker event="methodsPageViewed" />
      <section>
        <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
          Methods
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] font-normal leading-[1.1]">
          Research Methods
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.7]">
          The study is assembled from three high-level modules that capture
          experience, context, and perception. Each one is measured through a
          blend of surveys, rapid check-ins, and interviews.
        </p>
        <div className="mt-16 flex flex-col gap-10 md:flex-row md:gap-12">
          <article className="flex-1 border-t border-hairline pt-6">
            <h2 className="font-display text-xl font-normal">
              Experience Logs
            </h2>
            <p className="mt-3 leading-[1.7] text-ink-soft">
              Short-form entries submitted daily so we can see moment-to-moment
              shifts in the target population.
            </p>
          </article>
          <article className="flex-1 border-t border-hairline pt-6">
            <h2 className="font-display text-xl font-normal">
              Context Mapping
            </h2>
            <p className="mt-3 leading-[1.7] text-ink-soft">
              Periodic check-ins with location, time, and social context data to
              ground the narrative.
            </p>
          </article>
        </div>
      </section>
      <RegistrationNotice registration={preRegistration} />
    </main>
  );
}
