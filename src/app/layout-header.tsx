"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LayoutHeader({
  navLinks,
}: {
  navLinks: Array<{ label: string; href: string }>;
}) {
  const pathname = usePathname();

  // Hide header on home page which has its own TopNav
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="border-b border-hairline">
      <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-x-6 gap-y-4 px-6 py-8">
        <div>
          <p className="font-data text-[0.6rem] uppercase tracking-[0.16em] text-ink-soft">
            Public Orientation
          </p>
          <h1 className="mt-2 font-display text-2xl font-normal">
            Big Mad Study
          </h1>
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-6 font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="no-underline hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
