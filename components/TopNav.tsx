import Link from "next/link";
import { cookies } from "next/headers";

const anchorBase = process.env.NEXT_PUBLIC_PUBLIC_ANCHOR_BASE ?? "/";

export async function TopNav() {
  const qualified = (await cookies()).get("bm_qualified")?.value === "true";
  const navLinks = [
    { label: "Home", href: `${anchorBase}#top` },
    { label: "How it works", href: `${anchorBase}#how-it-works` },
    { label: "Privacy", href: `${anchorBase}#privacy` },
    { label: "FAQ", href: `${anchorBase}#faq` },
    { label: "Updates", href: `${anchorBase}#updates` },
    { label: "Contact", href: `${anchorBase}#contact` },
  ];

  // A wall label, not a floating panel: it sits in the flow on the same paper
  // as everything else, so nothing has to be padded out from under it.
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-6 font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft">
        <nav
          aria-label="Sections"
          className="flex flex-wrap items-center gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="no-underline hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          {qualified && (
            <Link
              href="/participants"
              className="border-b border-rule pb-[0.15rem] no-underline hover:border-ink hover:text-ink"
            >
              Participant guide
            </Link>
          )}
        </nav>
        <Link
          href="/start"
          className="rounded-full border border-accent px-5 py-2 text-accent no-underline"
        >
          Start here
        </Link>
      </div>
    </header>
  );
}
