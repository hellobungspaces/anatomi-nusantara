import Link from "next/link";
import { houses } from "@/data/houses";

export default function HouseNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold">Rumah ini belum ada di daftar</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Alamatnya mungkin salah ketik. Rumah yang tersedia:
      </p>
      <ul className="mt-4 space-y-1">
        {houses.map((h) => (
          <li key={h.id}>
            <Link href={`/rumah/${h.id}`} className="inline-block py-1 underline underline-offset-4">
              {h.tab}
            </Link>
            <span className="text-muted-foreground">, {h.place}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
