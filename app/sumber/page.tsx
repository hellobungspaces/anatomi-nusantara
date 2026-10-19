import type { Metadata } from "next";
import Link from "next/link";
import { houses } from "@/data/houses";

export const metadata: Metadata = {
  title: "Sumber",
  description: "Rujukan yang dipakai untuk teks tiap rumah adat.",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold sm:text-5xl">Sumber</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Rujukan yang dipakai untuk teks tiap rumah, dikelompokkan per rumah.
        Tautan terbuka di tab baru.
      </p>

      <div className="mt-12 space-y-12">
        {houses.map((h) => {
          const sources = Object.values(h.src);
          return (
            <section key={h.id} aria-labelledby={`s-${h.id}`}>
              <h2 id={`s-${h.id}`} className="flex flex-wrap items-baseline gap-x-3 text-2xl font-bold">
                <Link href={`/rumah/${h.id}`} className="underline-offset-4 hover:underline">
                  {h.tab}
                </Link>
                <span className="text-base font-normal text-muted-foreground">{h.place}</span>
              </h2>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {sources.map(([title, url]) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-3 text-primary underline-offset-4 hover:underline"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
