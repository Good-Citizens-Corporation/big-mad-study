// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Big-Mad Behavioral Study",
  description:
    "An open, voice-first study by Good Citizens Corporation about how people experience frustration and calm in AI-shaped work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">
        <header className="border-b border-neutral-200">
          <nav className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold">
              Big-Mad Study
            </Link>
            <div className="flex gap-3 text-sm">
              <Link href="/about">About</Link>
              <Link href="/methods">Methods</Link>
              <Link href="/participants">Participants</Link>
            </div>
          </nav>
        </header>
        <div className="max-w-4xl mx-auto px-4">{children}</div>
      </body>
    </html>
  );
}