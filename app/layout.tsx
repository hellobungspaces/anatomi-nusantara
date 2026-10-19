import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Anatomi Rumah Nusantara",
    template: "%s · Anatomi Rumah Nusantara",
  },
  description:
    "Model 3D tujuh rumah adat, dari Nias sampai Papua. Putar, bongkar per lapis, dan baca fungsi tiap bagiannya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${fraunces.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#isi"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          Lompat ke isi halaman
        </a>
        <SiteHeader />
        <main id="isi" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
