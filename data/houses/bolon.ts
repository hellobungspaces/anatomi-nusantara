import type { House } from "../types";

export const bolonHouse: House = {
  "id": "bolon",
  "tab": "Rumah Bolon",
  "place": "Batak Toba",
  "region": {"pulau":"Sumatera","provinsi":"Sumatera Utara"},
  "kicker": "Rumah Bolon · rumah adat Batak Toba",
  "title": "Rumah berpunggung kerbau",
  "paras": [
    "Rumah Bolon berdiri di atas tiang kayu yang bertumpu pada batu. Atapnya dari ijuk dan melengkung seperti punggung kerbau.",
    "Dinding rumah dibuat miring ke luar, dan bagian depannya dihiasi ukiran bernama gorga.",
    "Pada zaman dahulu, satu rumah bisa dihuni dua sampai enam keluarga."
  ],
  "note": "Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Ukuran di model mengikuti angka dari sumber bila ada, sisanya perkiraan.",
  "srcAll": [
    "rb",
    "ks"
  ],
  "src": {
    "rb": [
      "Ruang Arsitek: Rumah Bolon",
      "https://ruangarsitek.com/rumah-adat-batak/"
    ],
    "ks": [
      "KabarSumut: Gorga dan Filosofi",
      "https://kabarsumut.co.id/detail/46866/gorga-dan-filosofi-mengenal-lebih-dekat-rumah-adat-batak"
    ]
  },
  "list1": "Struktur, disusun dari bawah ke atas",
  "list2": "",
  "home": [
    15,
    8,
    17
  ],
  "ty": [
    4,
    8.4
  ],
  "bd": 0.55,
  "minD": 10,
  "maxD": 70,
  "ringR": 10.4,
  "layers": [
    {
      "key": "ojahan",
      "name": "Batu ojahan",
      "sub": "Tumpuan berbentuk cincin",
      "kicker": "Bagian 1 · pondasi",
      "anchor": [
        2.2,
        0.3,
        4
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
        "Pondasinya bertipe cincin: tiang kayu berdiri di atas batu yang disebut ojahan, tidak ditanam ke tanah.",
        "Susunan ini dinilai fleksibel dan tahan gempa."
      ],
      "note": "Catatan model: satu batu untuk tiap tiang, bentuknya disederhanakan.",
      "src": [
        "rb"
      ]
    },
    {
      "key": "tiang",
      "name": "Tiang",
      "sub": "18 tiang kayu",
      "kicker": "Bagian 2 · tiang",
      "anchor": [
        -2.2,
        1.1,
        4
      ],
      "cy": 1.1,
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
        "Tiang berdiameter sekitar 42 sampai 50 cm. Jumlahnya umumnya 18, yang dimaknai sebagai kekokohan dan kebersamaan.",
        "Tiang bertumpu di atas batu ojahan, bukan tertanam."
      ],
      "note": "Catatan model: tiang digambar tegak dengan diameter 46 cm, 3 baris masing-masing 6 tiang.",
      "src": [
        "rb"
      ]
    },
    {
      "key": "badan",
      "name": "Lantai & dinding",
      "sub": "Dunia tengah, dinding miring",
      "kicker": "Bagian 3 · badan rumah",
      "anchor": [
        -2.9,
        3,
        0
      ],
      "cy": 3,
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
        "Badan rumah adalah tempat memasak, tidur, dan bermain, dan disebut dunia tengah. Hiasan ipon-ipon dipasang sebagai penolak bala.",
        "Dinding dibuat miring agar angin mudah masuk ke dalam rumah.",
        "Dinding diikat dengan tali rotan dan ijuk (ret-ret) berpola cicak berkepala dua yang saling berlawanan arah. Polanya dimaknai sebagai penjaga rumah dan simbol saling menghormati penghuni.",
        "Pintu selebar 80 cm dan setinggi sekitar 1,5 m, dibuat menjorok ke dalam."
      ],
      "note": "Catatan model: tali ret-ret digambar sebagai pita gelap polos, tanpa pola cicak. Tangga belum digambar karena sumber tidak menjelaskannya.",
      "src": [
        "rb"
      ]
    },
    {
      "key": "gorga",
      "name": "Gorga",
      "sub": "Ukiran merah, putih, hitam",
      "kicker": "Bagian 4 · hiasan",
      "anchor": [
        0,
        6.2,
        5
      ],
      "cy": 6.2,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.6,
        1.2
      ],
      "paras": [
        "Gorga adalah ukiran di bagian depan rumah. Warna merah, hitam, dan putih membawa makna perlindungan, keseimbangan, dan kemakmuran.",
        "Motifnya mencakup tumbuhan, hewan, dan pola geometris: cicak (boraspati) melambangkan kemampuan beradaptasi, ular berkah bagi penghuni, kerbau rasa terima kasih, mata ni ari (matahari) sumber kehidupan, dan motif payudara kesuburan keluarga.",
        "Gorga ulu paung dipasang sebagai pelindung rumah.",
        "Rumah yang penuh hiasan disebut Ruma Gorga Sarimunggu, sedangkan yang tanpa hiasan disebut Jabu Batara Siang atau Jabu Ereng."
      ],
      "note": "Catatan model: motif digambar sebagai bulatan merah, putih, dan hitam saja. Ulu paung digambar sebagai kepala sederhana dan bentuk aslinya tidak dijelaskan sumber.",
      "src": [
        "ks",
        "rb"
      ]
    },
    {
      "key": "atap",
      "name": "Atap ijuk",
      "sub": "Atap melengkung",
      "kicker": "Bagian 5 · penutup",
      "anchor": [
        0,
        7.4,
        0
      ],
      "cy": 7.2,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        6.2,
        0
      ],
      "paras": [
        "Atap dari ijuk berbentuk melengkung dan disebut menyerupai punggung kerbau. Bentuk melengkung ini dinilai aerodinamis terhadap angin dari danau.",
        "Ujung depan dibuat lebih panjang daripada ujung belakang, dimaknai sebagai doa agar keturunan pemilik rumah memiliki masa depan yang baik.",
        "Bagian dalam atap sering dipakai menyimpan barang pusaka atau keramat."
      ],
      "note": "Catatan model: lengkung atap hanya perkiraan bentuk.",
      "src": [
        "rb"
      ]
    }
  ]
};
