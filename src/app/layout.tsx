import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { HeaderVariantProvider } from "./hooks/HeaderVariantProvider";
import { LayoutHeader } from "./layout-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <HeaderVariantProvider>
          <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
            <LayoutHeader navLinks={navLinks} />

            <main className="flex-1 px-6 py-10">
              <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-800/60 bg-slate-900/70 p-8 shadow-[0_10px_80px_rgba(2,6,23,0.8)]">
                {children}
              </div>
            </main>

            <footer className="border-t border-slate-800/70 bg-slate-950/60">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>© {year} Big Mad Study</p>
                <div className="flex flex-wrap gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={`footer-${link.href}`}
                      href={link.href}
                      className="text-slate-300 transition-colors hover:text-white"
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
