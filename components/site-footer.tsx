import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Isi tiap rumah bersumber dari rujukan yang tercantum di halaman Sumber.</p>
        <nav aria-label="Tautan kaki" className="flex gap-5">
          <Link href="/tentang" className="py-2 underline-offset-4 hover:underline">
            Tentang
          </Link>
          <Link href="/sumber" className="py-2 underline-offset-4 hover:underline">
            Sumber
          </Link>
        </nav>
      </div>
    </footer>
  );
}
