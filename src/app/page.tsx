import Link from "next/link";

export const sections = [
  {
    title: "About the Study",
    description:
      "Big Mad Study is a collective exploration of how everyday moments shape our sense of well-being.",
    href: "/about",
  },
  {
    title: "Research Methods",
    description:
      "See how the different modules, assessments, and touchpoints unfold through the study timeline.",
    href: "/methods",
  },
  {
    title: "Participants",
    description:
      "Learn who is invited to join, what participation looks like, and how we safeguard privacy.",
    href: "/participants",
  },
];

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Orientation
        </p>
        <h1 className="text-4xl font-semibold text-white">
          Welcome to the Big Mad Study
        </h1>
        <p className="text-lg text-slate-300">
          This is a placeholder landing page for slice 01. Follow the navigation
          above to get a feeling for the structure of the public-facing
          orientation site.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 transition hover:border-slate-500/90 hover:bg-slate-800"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">
                {section.title}
              </h2>
            </div>
            <p className="mt-3 text-slate-300">{section.description}</p>
            <span className="mt-4 text-sm font-semibold text-slate-200">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
