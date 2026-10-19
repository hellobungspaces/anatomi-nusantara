import { redirect } from "next/navigation";

// "/" dilayani oleh rewrite di next.config.ts (halaman viewer di public/anatomi).
// Berkas ini hanya cadangan kalau rewrite tidak aktif.
export default function Home() {
  redirect("/anatomi/index.html");
}
