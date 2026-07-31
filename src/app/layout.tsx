import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { HeaderVariantProvider } from "./hooks/HeaderVariantProvider";
import { LayoutHeader } from "./layout-header";
import "./globals.css";

// The display voice. Everything else rides the body and data stacks.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Big Mad Study",
  description:
    "An orientation landing page for the Big Mad Study with straightforward navigation to key sections.",
};

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Methods", href: "/methods" },
  { label: "Participants", href: "/participants" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} bg-paper text-ink`}
      >
        <HeaderVariantProvider>
          <div className="flex min-h-screen flex-col">
            <LayoutHeader navLinks={navLinks} />

            {/* Each page owns its own <main>. The home page's nav has to sit
                outside it to count as a banner landmark, and a layout-level
                <main> here would also nest inside the deck's own. */}
            <div className="flex-1">{children}</div>

            <footer className="border-t border-hairline">
              <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 font-data text-[0.63rem] uppercase tracking-[0.18em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
                <p>© {year} Big Mad Study</p>
                <div className="flex flex-wrap gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={`footer-${link.href}`}
                      href={link.href}
                      className="no-underline hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </HeaderVariantProvider>
      </body>
    </html>
  );
}
