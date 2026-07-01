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

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-3xl border border-white/20 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-slate-100 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-4 text-slate-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em] transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {qualified && (
            <Link
              href="/participants"
              className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.3em] transition hover:bg-white/20"
            >
              Participant guide
            </Link>
          )}
        </div>
        <Link
          href="/start"
          className="rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-900 transition hover:bg-white/80"
        >
          Start here
        </Link>
      </div>
    </header>
  );
}
