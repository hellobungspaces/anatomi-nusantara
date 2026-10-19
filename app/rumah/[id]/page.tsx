import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { houses, houseById } from "@/data/houses";
import { ViewerFrame } from "@/components/viewer-frame";

export function generateStaticParams() {
  return houses.map((h) => ({ id: h.id }));
}

export async function generateMetadata(
  props: PageProps<"/rumah/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const house = houseById[id];
  if (!house) return {};
  return {
    title: `${house.tab}, rumah adat ${house.place}`,
    description: house.paras[0],
  };
}

export default async function HousePage(props: PageProps<"/rumah/[id]">) {
  const { id } = await props.params;
  const house = houseById[id];
  if (!house) notFound();

  const i = houses.findIndex((h) => h.id === id);
  const prev = houses[(i - 1 + houses.length) % houses.length];
  const next = houses[(i + 1) % houses.length];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-5 pt-8">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link href="/#rumah" className="underline underline-offset-4">
              Semua rumah
            </Link>
          </p>
          <h1 className="mt-1 text-4xl font-bold sm:text-5xl">{house.tab}</h1>
          <p className="mt-1 text-muted-foreground">Rumah adat {house.place}</p>
        </div>
        <nav aria-label="Rumah lain" className="flex gap-6 text-sm">
          <Link href={`/rumah/${prev.id}`} className="py-2 underline underline-offset-4">
            Sebelumnya: {prev.tab}
          </Link>
          <Link href={`/rumah/${next.id}`} className="py-2 underline underline-offset-4">
            Berikutnya: {next.tab}
          </Link>
        </nav>
      </div>
      <ViewerFrame key={house.id} id={house.id} name={house.tab} />
    </div>
  );
}
