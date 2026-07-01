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
    <header className="border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between space-x-6 px-6 py-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Public Orientation
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Big Mad Study
          </h1>
        </div>
        <nav
          aria-label="Primary"
          className="flex items-center gap-4 text-sm font-medium"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
