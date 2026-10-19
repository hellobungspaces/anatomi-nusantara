# DESIGN.md

Arah visual dan bahasa untuk Anatomi Rumah Nusantara. Dipilih pemilik proyek: satu layar, model 3D memenuhi layar, tema gelap hangat.

## Identitas
Ruang pamer yang bisa diputar. Modelnya bintang, antarmuka menepi. Tidak ada halaman pengantar: layar pertama adalah rumahnya.

## Struktur
Satu halaman (`/`) yang dilayani dari `public/anatomi/index.html` lewat rewrite di `next.config.ts`. Rumah aktif ada di hash (`/#tongkonan`) sehingga bisa dibagikan.
- Bar atas: nama proyek, tombol ‹ ›, dan tombol nama rumah yang membuka pemilih bertingkat pulau > provinsi > kota.
- Desktop: kartu penjelasan melayang di kanan atas, bagian rumah jadi baris chip di bawah, kontrol di dasar.
- HP: bottom sheet tiga tingkat (peek, setengah, penuh). Memilih bagian membuka sheet ke setengah dan panggung mengecil mengikuti sheet.

## Dial (anti-slop R-37)
- ENERGY 2, RHYTHM 2, MOTION 2. Gerak hanya untuk perubahan keadaan (sheet naik, kamera pindah ke bagian terpilih). Hormati `prefers-reduced-motion`.

## Warna (satu tema gelap, sengaja)
| Token | Nilai | Dipakai untuk |
|---|---|---|
| bg | #15120e | latar |
| panel | #211b14 | bar, kartu, sheet |
| chip | #2e261d | tombol, baris terpilih |
| ink | #f1e9da | teks |
| muted | #bcb09b | teks sekunder |
| line | #3d3329 | garis tipis |
| gold / accent | #e0ad4a / #ecbf6c | satu-satunya aksen: tombol utama, bagian terpilih, label |

Tema terang tidak dikirim. Menambahnya berarti memverifikasi ulang semua token dan adegan 3D (R-34).

## Huruf
- Judul dan nama rumah: Fraunces (serif), nuansa buku arsip.
- Teks dan kontrol: Source Sans 3.
- Mono hanya untuk angka di HUD viewer.

## Bentuk
Radius 8 sampai 12px, garis 1px, tanpa glow dan glassmorphism. Target sentuh minimal 44px (penanda di model 40px di HP).

## Data lokasi
`region` (pulau, provinsi, kota) ada di `data/types.ts` dan di tiap rumah di viewer. Isi hanya yang pasti; sisanya dikosongkan dan tidak ditampilkan. Kota yang terisi saat ini hanya yang disebut di sumber (Joglo: Sleman, Omo Sebua: Nias Selatan).

## Isi dan bahasa
- Bahasa Indonesia sehari-hari, kalimat pendek, tanpa tanda pisah panjang.
- Tidak ada statistik, testimoni, atau logo mitra. Angka hanya yang ada di sumber.
- Tidak ada ikon dekoratif atau ilustrasi buatan agen. Gambar rumah hanya model 3D itu sendiri.
