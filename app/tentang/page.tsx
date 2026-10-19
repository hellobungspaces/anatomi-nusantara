import type { Metadata } from "next";
import Link from "next/link";
import { houses } from "@/data/houses";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Apa isi proyek ini, cara memakai modelnya, dan batas ketelitiannya.",
};

const controls: { term: string; text: string }[] = [
  {
    term: "Memutar dan zoom",
    text: "Seret modelnya untuk memutar. Di layar sentuh, cubit untuk zoom. Di komputer, scroll di atas model.",
  },
  {
    term: "Membongkar",
    text: "Tombol Bongkar memisahkan lapisan satu per satu. Geser Jarak lapisan untuk mengatur seberapa jauh, lalu tekan Rakit untuk menyatukan lagi.",
  },
  {
    term: "Penanda bernomor",
    text: "Angka di model menandai bagian struktur, disusun dari bawah ke atas. Ketuk satu penanda, atau pilih namanya di daftar, untuk membaca fungsinya.",
  },
  {
    term: "Penanda berhuruf",
    text: "Huruf menandai ruang, misalnya dalem dan senthong pada Joglo. Cara membukanya sama dengan penanda bernomor.",
  },
  {
    term: "Simulasi gempa",
    text: "Hanya ada di Omo Sebua, rumah adat Nias. Tombolnya menggoyang model sebagai gambaran gerak rumah saat gempa. Ini ilustrasi untuk membantu membayangkan, bukan simulasi teknik.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-4xl font-bold sm:text-5xl">Tentang</h1>
      <p className="mt-6 text-lg leading-relaxed">
        Anatomi Rumah Nusantara menampilkan struktur {houses.length} rumah adat
        sebagai model 3D yang bisa dibongkar per lapis. Setiap bagian punya
        penjelasan singkat tentang fungsinya, lengkap dengan rujukannya.
      </p>

      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Cara memakai model</h2>
      <dl className="mt-6 divide-y divide-border border-y border-border">
        {controls.map((c) => (
          <div key={c.term} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
            <dt className="font-semibold">{c.term}</dt>
            <dd className="text-muted-foreground">{c.text}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Seberapa teliti modelnya</h2>
      <p className="mt-4 text-lg leading-relaxed">
        Modelnya disederhanakan. Ia dibuat untuk menjelaskan susunan dan fungsi
        bagian, bukan untuk dijadikan gambar kerja. Di bawah kartu penjelasan
        tiap rumah ada catatan model yang menyebut apa saja yang belum
        digambar, misalnya pendopo Joglo yang terbuka.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        Isi teksnya bersumber dari rujukan di{" "}
        <Link href="/sumber" className="font-semibold text-primary underline underline-offset-4">
          halaman Sumber
        </Link>
        . Kalau ada yang bertentangan dengan sumber aslinya, anggap sumber aslinya yang benar.
      </p>
    </div>
  );
}
