import type { House } from "../types";

export const gadangHouse: House = {
  "id": "gadang",
  "tab": "Rumah Gadang",
  "place": "Minangkabau",
  "kicker": "Rumah Gadang · rumah adat Minangkabau",
  "title": "Rumah beratap gonjong",
  "paras": [
    "Rumah Gadang adalah rumah panggung kayu Minangkabau. Atapnya melengkung ke atas dan runcing, disebut gonjong.",
    "Tiangnya tidak ditanam, melainkan bertumpu di atas batu sandi. Sambungan kayunya memakai pasak, bukan paku.",
    "Rumah ini bersifat matrilineal: tanah dimiliki dan diwarisi perempuan, dan jumlah kamar mengikuti jumlah perempuan yang tinggal di dalamnya."
  ],
  "note": "Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Model ini disederhanakan, lihat catatan di tiap bagian.",
  "srcAll": [
    "as",
    "dt"
  ],
  "src": {
    "as": [
      "ARSITAG: Rumah Gadang, Rumah Tradisional Minangkabau",
      "https://www.arsitag.com/article/rumah-gadang-rumah-tradisional-minangkabau"
    ],
    "dt": [
      "detikProperti: Mengenal Rumah Gadang",
      "https://www.detik.com/properti/arsitektur/d-7439378/mengenal-rumah-gadang-bentuk-jenis-fungsi-dan-keunikannya"
    ]
  },
  "list1": "Struktur, disusun dari bawah ke atas",
  "list2": "Ruang & pelengkap",
  "home": [
    16,
    8,
    17
  ],
  "ty": [
    4.6,
    9.6
  ],
  "bd": 0.55,
  "minD": 10,
  "maxD": 80,
  "ringR": 12.5,
  "layers": [
    {
      "key": "sandi",
      "name": "Batu sandi",
      "sub": "Tumpuan tiang",
      "kicker": "Bagian 1 · tumpuan",
      "anchor": [
        6.25,
        0.3,
        2.4
      ],
      "cy": 0.3,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        0,
        0
      ],
      "paras": [
        "Setiap tiang diletakkan di atas sandi, yaitu batu besar yang bagian atasnya rata. Tiang tidak ditanam ke tanah.",
        "Batu sandi menahan air tanah agar tidak mengenai tiang, memperluas bidang tumpu, dan membantu meredam getaran gempa."
      ],
      "note": "Catatan model: 30 batu, satu untuk tiap tiang.",
      "src": [
        "dt",
        "as"
      ]
    },
    {
      "key": "tiang",
      "name": "Tiang",
      "sub": "Lima baris, miring ke luar",
      "kicker": "Bagian 2 · tiang",
      "anchor": [
        -6.25,
        1.4,
        2.4
      ],
      "cy": 1.4,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        1.2,
        0
      ],
      "paras": [
        "Tiang idealnya disusun dalam lima baris sepanjang rumah. Ruang di antara baris-barisnya membentuk empat lanjar.",
        "Tiang dibuat sedikit miring ke arah luar sehingga badan rumah membesar ke atas seperti trapesium.",
        "Sambungan tiang memakai pasak kayu. Rumah ini dirancang agar lentur: saat gempa ia berayun mengikuti gelombang."
      ],
      "note": "Catatan model: kemiringan tiang terlalu kecil untuk terlihat jelas, dan hanya tiang baris terluar yang digambar miring.",
      "src": [
        "as",
        "dt"
      ]
    },
    {
      "key": "lantai",
      "name": "Lantai & anjuang",
      "sub": "Lantai tinggi di kedua ujung",
      "kicker": "Bagian 3 · lantai",
      "anchor": [
        -6,
        2.8,
        0
      ],
      "cy": 2.8,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.6,
        0
      ],
      "paras": [
        "Lantai papan menutup bagian atas tiang. Di ujung kiri dan kanan, lantainya dibuat lebih tinggi, disebut anjuang (anjungan).",
        "Anjuang dipakai untuk penobatan kepala adat dan tempat pengantin bersanding. Pada rumah bergaya Koto Piliang, anjungan ditempati pemimpin; pada Budi Caniago tidak ada anjungan karena semua setara."
      ],
      "note": "Catatan model: anjuang digambar di kedua ujung, sedangkan menurut sumber ada gaya rumah yang tidak memilikinya.",
      "src": [
        "dt",
        "as"
      ]
    },
    {
      "key": "dinding",
      "name": "Dinding",
      "sub": "Papan berukir dan anyaman bambu",
      "kicker": "Bagian 4 · dinding",
      "anchor": [
        0,
        3.9,
        2.6
      ],
      "cy": 3.9,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        3.8,
        0
      ],
      "paras": [
        "Dinding depan (dindiang tapi) dari papan yang dipasang vertikal dan berukir. Motifnya tumbuhan merambat, akar, bunga, dan buah, serta bentuk geometri.",
        "Dinding samping dan belakang tradisionalnya dianyam dari bambu. Anyaman ini dimaknai sebagai kekuatan masyarakat yang terbentuk ketika tiap individu menjadi bagian dari yang lebih besar.",
        "Ukiran mengikuti falsafah alam takambang jadi guru, yaitu alam sebagai sumber pengetahuan."
      ],
      "note": "Catatan model: pintu dan jendela belum digambar, dan motif ukir hanyalah gambaran.",
      "src": [
        "as",
        "dt"
      ]
    },
    {
      "key": "atap",
      "name": "Atap gonjong",
      "sub": "Atap ijuk melengkung ke atas",
      "kicker": "Bagian 5 · penutup",
      "anchor": [
        0,
        7,
        0
      ],
      "cy": 7.4,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        7.4,
        0
      ],
      "paras": [
        "Atap gonjong dahulu dibuat dari ijuk, dan kini banyak diganti seng. Ujungnya runcing menjulang ke atas.",
        "Gonjong dimaknai sebagai tanduk kerbau, pucuk rebung, kapal, atau bukit. Ujung yang runcing juga dikaitkan dengan harapan mencapai Tuhan.",
        "Jumlah gonjong menentukan gaya rumah: pada Koto Piliang tiga di kiri dan kanan, satu di depan, dua di belakang; pada Budi Caniago dua di kanan dan kiri."
      ],
      "note": "Catatan model: digambar empat gonjong sepanjang bubungan. Sumber menyebut jumlah empat atau enam, dan susunan aslinya bergantung gaya rumah.",
      "src": [
        "as",
        "dt"
      ]
    },
    {
      "key": "tangga",
      "space": true,
      "n": "T",
      "name": "Tangga & serambi",
      "sub": "Pintu masuk di tengah",
      "kicker": "Akses · depan",
      "anchor": [
        0,
        1.4,
        4.4
      ],
      "cy": 1.4,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.6,
        1
      ],
      "selMove": [
        0,
        0,
        1.8
      ],
      "paras": [
        "Rumah memanjang dan pintunya ada di bagian tengah. Orang naik lewat tangga di tengah. Pintunya tidak menghadap jalan, agar kegiatan di dalam tidak langsung terlihat dari luar.",
        "Setiap orang yang hendak naik harus mencuci kaki terlebih dahulu."
      ],
      "note": "Catatan model: bentuk tangga dan batu cuci kaki adalah rekaan sederhana. Sumber tidak menjelaskan bentuknya.",
      "src": [
        "dt",
        "as"
      ]
    },
    {
      "key": "labuah",
      "space": true,
      "n": "L",
      "name": "Labuah gajah",
      "sub": "Lanjar umum di depan",
      "kicker": "Ruang · depan",
      "anchor": [
        0,
        3.2,
        1.2
      ],
      "cy": 3.2,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.6,
        0
      ],
      "paras": [
        "Labuah gajah (jalan gajah) adalah lanjar umum untuk kegiatan sehari-hari dan acara seremonial.",
        "Ruang depan dipakai untuk berkumpul, musyawarah, menerima tamu, dan upacara adat."
      ],
      "note": "Catatan model: bidang emas menandai lanjar kira-kira. Letak dan lebar aslinya bisa berbeda.",
      "src": [
        "as",
        "dt"
      ]
    },
    {
      "key": "bilik",
      "space": true,
      "n": "B",
      "name": "Bilik (ruang)",
      "sub": "Kamar di lanjar belakang",
      "kicker": "Ruang · belakang",
      "anchor": [
        0,
        3.2,
        -1.6
      ],
      "cy": 3.2,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.6,
        0
      ],
      "paras": [
        "Lanjar paling belakang dibagi menjadi kamar tidur yang disebut Ruang. Adat menetapkan minimal lima Ruang, dengan jumlah ideal sembilan.",
        "Jumlah kamar mengikuti jumlah perempuan yang tinggal di rumah itu."
      ],
      "note": "Catatan model: lima bilik digambar sebagai batas minimal menurut sumber.",
      "src": [
        "as",
        "dt"
      ]
    },
    {
      "key": "rangkiang",
      "space": true,
      "n": "R",
      "name": "Rangkiang",
      "sub": "Tiga lumbung padi",
      "kicker": "Pelengkap · halaman",
      "anchor": [
        0,
        3.4,
        9.6
      ],
      "cy": 2.6,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        0,
        0
      ],
      "paras": [
        "Rangkiang adalah rumah kecil terpisah untuk menyimpan cadangan padi, dipakai saat bencana atau perang.",
        "Ada tiga jenis: Sitinjau Lauik untuk beras upacara adat, Sitangka Lapa untuk sumbangan ke desa miskin dan yang kelaparan, dan Sibayau-bayau untuk kebutuhan sehari-hari keluarga."
      ],
      "note": "Catatan model: ketiganya digambar serupa dan diletakkan di depan rumah. Ukuran dan letak aslinya bervariasi.",
      "src": [
        "as",
        "dt"
      ]
    }
  ]
};
