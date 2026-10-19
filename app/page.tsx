import Link from "next/link";
import { houses } from "@/data/houses";
import { HouseCatalog, type CatalogHouse } from "@/components/house-catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const catalog: CatalogHouse[] = houses.map((h) => ({
  id: h.id,
  tab: h.tab,
  place: h.place,
  title: h.title,
  lead: h.paras[0],
  layers: h.layers.map((l) => l.name),
}));

const layerCounts = houses.map((h) => h.layers.length);
const minLayers = Math.min(...layerCounts);
const maxLayers = Math.max(...layerCounts);

export default function Home() {
  const first = houses[0];

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-24">
        <h1 className="max-w-[18ch] text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
          Bongkar rumah adat, lapis demi lapis.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Model 3D tujuh rumah adat, dari Nias sampai Papua. Putar, bongkar per
          lapis, lalu baca fungsi tiap bagiannya, dari pondasi sampai puncak atap.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={`/rumah/${first.id}`}
            className={cn(buttonVariants(), "h-12 px-6 text-base")}
          >
            Buka model {first.tab}
          </Link>
          <Link
            href="/#rumah"
            className="py-3 text-base underline underline-offset-4 decoration-border hover:decoration-primary"
          >
            Lihat ketujuh rumah
          </Link>
        </div>
      </section>

      <section
        id="rumah"
        aria-labelledby="judul-rumah"
        className="mx-auto max-w-7xl scroll-mt-4 px-4 pb-20 sm:px-6 sm:pb-28"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
          <h2 id="judul-rumah" className="text-3xl font-bold sm:text-4xl">
            Tujuh rumah
          </h2>
          <p className="text-muted-foreground">
            Tiap rumah punya {minLayers} sampai {maxLayers} bagian yang bisa dibuka.
          </p>
        </div>
        <HouseCatalog houses={catalog} />
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">Model ini penyederhanaan</h2>
          <p className="mt-4 text-lg leading-relaxed">
            Bentuknya sudah disederhanakan dan bukan gambar kerja arsitektur.
            Setiap rumah punya catatan yang menyebut bagian apa yang belum
            digambar. Teksnya bersumber dari jurnal, repositori kampus, dan
            situs lain, dan semua rujukannya bisa dibuka.
          </p>
          <Link
            href="/sumber"
            className="mt-5 inline-block py-2 text-base font-semibold text-primary underline underline-offset-4"
          >
            Baca daftar sumber
          </Link>
        </div>
      </section>
    </>
  );
}
