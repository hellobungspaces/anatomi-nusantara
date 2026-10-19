import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

export const navLinks = [
  { href: "/#rumah", label: "Rumah" },
  { href: "/tentang", label: "Tentang" },
  { href: "/sumber", label: "Sumber" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Logo sementara: nama proyek sebagai teks. Belum ada logo resmi. */}
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Anatomi Rumah Nusantara
        </Link>
        <nav aria-label="Utama" className="hidden items-center gap-1 sm:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
