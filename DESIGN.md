# DESIGN.md

Arah visual dan bahasa untuk Anatomi Rumah Nusantara. Dipilih pemilik proyek: "hangat, kertas & tinta".

## Identitas
Buku arsitektur yang bisa diputar. Tenang, padat isi, tidak berisik. Rumahnya yang jadi bintang, bukan antarmukanya.

## Dial (anti-slop R-37)
- ENERGY 2: tenang, banyak ruang kosong, satu aksen.
- RHYTHM 3: tiap section punya komposisi sendiri (hero rata kiri, daftar dua kolom dengan pratinjau, catatan satu kolom sempit, tabel sumber).
- MOTION 2: gerak hanya untuk memberi tahu perubahan (pratinjau rumah berganti, panel menu). Tidak ada fade-up di setiap elemen. Hormati `prefers-reduced-motion`.

## Warna (satu tema terang, sengaja)
| Token | Nilai | Dipakai untuk |
|---|---|---|
| background | #f4efe6 | latar halaman (krem kertas) |
| card | #fbf8f1 | panel, kartu |
| foreground | #1e1b16 | teks (tinta) |
| muted-foreground | #5e564a | teks sekunder, kontras 6,6:1 di atas background |
| border | #d6cbb7 | garis tipis |
| primary | #9a4520 | satu-satunya aksen (terakota): tombol utama, tautan, fokus |

Tema gelap tidak dikirim. Menambah mode gelap berarti memverifikasi ulang semua token dan viewer 3D (R-34).

## Huruf
- Judul: Fraunces (serif). Alasan: nuansa buku dan arsip, cocok untuk nama-nama rumah adat; lain dari default sans yang dipakai AI.
- Teks: Source Sans 3. Alasan: terbaca di ukuran kecil, mendukung diakritik bahasa Indonesia.
- Mono hanya untuk angka di viewer (sudut, persen bongkar). Tidak ada label kapital berspasi lebar.

## Bentuk
Radius kecil (8 sampai 12px), garis 1px, tanpa glow, tanpa glassmorphism, bayangan hanya untuk panel yang melayang (menu seluler).

## Isi dan bahasa
- Bahasa Indonesia sehari-hari, kalimat pendek, tanpa tanda pisah panjang (em dash).
- Hanya angka yang bisa dihitung dari data (jumlah rumah, jumlah bagian). Tidak ada statistik, testimoni, atau logo mitra.
- Ajakan menyebut tindakan nyata ("Buka model Joglo"), bukan "Mulai" atau "Jelajahi".
- Tidak ada ikon dekoratif. Tidak ada ilustrasi buatan agen. Gambar rumah hanya model 3D itu sendiri.
- Tidak ada navigasi ke halaman yang belum ada. Navigasi: Rumah, Tentang, Sumber.
- Pengembangan lanjutan (peta, bandingkan antar rumah) belum dibuat dan tidak ditampilkan.
