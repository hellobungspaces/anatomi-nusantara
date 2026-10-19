// Fase 1: bungkus versi HTML yang sudah jalan, supaya bisa langsung live di Vercel.
// Fase 2: ganti iframe ini dengan komponen React Three Fiber (lihat README.md).
export default function Home() {
  return (
    <iframe
      src="/anatomi/index.html"
      title="Anatomi Rumah Nusantara"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
