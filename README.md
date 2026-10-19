# Starter: Anatomi Rumah Nusantara

Salin isi folder ini ke root project Next.js (timpa `app/page.tsx`).

- `public/anatomi/index.html` : versi HTML yang sudah jalan (7 rumah). Dipakai Fase 1.
- `app/page.tsx` : membungkus HTML itu dengan iframe, supaya bisa langsung deploy.
- `data/types.ts`, `data/houses/*.ts` : seluruh teks, sumber, dan parameter kamera, sudah bertipe. Dipakai Fase 2.
- `legacy/` : kode Three.js asli (mesin + fungsi `build` tiap rumah). Rujukan untuk porting ke React Three Fiber.

## Fase 2 (porting)
1. Bangun UI (tab, daftar lapisan, kartu) dari `data/houses`.
2. Pindahkan helper geometri di `legacy/core.js` (`T.curveRoof`, `T.tube`, `T.gable`, `T.frustum`, tekstur canvas) ke `lib/geometry.ts`.
3. Satu rumah satu komponen: `components/houses/Joglo.tsx`, dst. Fungsi `build(g, T, L)` di `legacy/h-*.js` jadi isi komponen.
4. State bersama (rumah aktif, lapisan terpilih, explode) di Zustand.
