import type { House } from "../types";

export const omoHouse: House = {
  "id": "omo",
  "tab": "Omo Sebua",
  "place": "Nias",
  "region": {"pulau":"Nias","provinsi":"Sumatera Utara","kota":"Nias Selatan"},
  "kicker": "Omo Sebua · rumah adat Nias",
  "title": "Rumah panggung tanpa paku",
  "paras": [
    "Omo Sebua dibangun untuk kepala desa dan berdiri di pusat desa. Tingginya bisa mencapai 16 meter, dengan atap yang menjulang.",
    "Rumah adat Nias dibangun tanpa paku dan bertumpu di atas lempengan batu, tanpa tiang yang ditanam ke tanah. Kombinasi ini dikaitkan dengan ketahanannya terhadap gempa.",
    "Dahulu rumah ini juga berfungsi sebagai tempat pertahanan saat perang. Pembangunannya memakan waktu hingga empat tahun dan hanya dikerjakan oleh para ahli."
  ],
  "note": "Tekan Simulasi gempa untuk melihat gambaran geraknya. Itu ilustrasi untuk membantu membayangkan, bukan simulasi teknik. Ketuk bagian di daftar atau pada model untuk membaca detailnya.",
  "srcAll": [
    "sl",
    "dt",
    "np"
  ],
  "src": {
    "sl": [
      "Selasar: Rumah adat Nias",
      "https://www.selasar.com/rumah-adat/nias/"
    ],
    "dt": [
      "detikTravel: Rumah adat Nias tahan gempa",
      "https://travel.detik.com/travel-news/d-7093247/rahasia-di-balik-rumah-adat-nias-yang-tahan-gempa"
    ],
    "np": [
      "Nawacita Post: Omo Hada",
      "https://www.nawacitapost.com/nasional/27352953/mengungkap-rahasia-omo-hada-rumah-tradisional-di-nias-pulau-impian-yang-tahan-gempa"
    ]
  },
  "list1": "Struktur, disusun dari bawah ke atas",
  "list2": "Akses",
  "quake": true,
  "home": [
    15,
    8,
    19
  ],
  "ty": [
    6.2,
    11.2
  ],
  "bd": 0.62,
  "minD": 10,
  "maxD": 70,
  "ringR": 10.4,
  "layers": [
    {
      "key": "batu",
      "name": "Lempeng batu",
      "sub": "Alas tiang yang tidak tertanam",
      "kicker": "Bagian 1 · dasar",
      "anchor": [
        3.5,
        0.3,
        5.4
      ],
      "cy": 0.25,
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
      "q": {
        "x": 1
      },
      "paras": [
        "Tiang rumah adat Nias tidak dipancang ke dalam tanah. Semuanya berdiri di atas lempengan batu.",
        "Lempengan batu itu menjadi alas tiang vertikal maupun diagonal, dan menambah kestabilan rumah."
      ],
      "note": "Catatan model: 16 lempeng polos. Ukuran dan bentuk batu asli tidak disebut dalam sumber.",
      "src": [
        "dt",
        "np",
        "sl"
      ]
    },
    {
      "key": "tiang",
      "name": "Tiang & ndriwa",
      "sub": "Penyokong diagonal di bawah rumah",
      "kicker": "Bagian 2 · penopang",
      "anchor": [
        3.1,
        1.8,
        4.9
      ],
      "cy": 1.9,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        1,
        0
      ],
      "q": {
        "x": 1,
        "rz": 0.048
      },
      "paras": [
        "Ndriwa adalah penyokong diagonal yang dipasang di antara tiang-tiang vertikal di bawah rumah. Sumber menyebutnya fitur utama penahan gempa.",
        "Kombinasi ndriwa dan tiang di atas lempengan batu membuat struktur kuat sekaligus fleksibel, sehingga mampu menahan getaran gempa.",
        "Omo Sebua berdiri di atas tiang kayu ulin yang besar. Di Nias Selatan, jumlah tiang deret depan genap, yaitu 4 atau 6."
      ],
      "note": "Catatan model: 16 tiang dalam 4 deret, dengan penyokong diagonal ke empat arah. Jumlah dan sudut ndriwa asli tidak disebut dalam sumber.",
      "src": [
        "dt",
        "sl",
        "np"
      ]
    },
    {
      "key": "lantai",
      "name": "Lantai & dinding",
      "sub": "Dinding condong ke luar",
      "kicker": "Bagian 3 · badan rumah",
      "anchor": [
        3.8,
        4.9,
        4.6
      ],
      "cy": 4.9,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        2.4,
        0
      ],
      "q": {
        "x": 0.25
      },
      "paras": [
        "Rumah dibuat tinggi dan condong ke luar sebagai bagian dari rancangan pertahanan.",
        "Di Nias Selatan, hanya rumah bangsawan yang punya ukiran rumit pada panel dindingnya. Tengkorak babi dipasang sebagai dekorasi Omo Sebua hingga kini.",
        "Ruang besar berada di depan, dan kamar tidur kecil di belakang."
      ],
      "note": "Catatan model: ukiran digambar sebagai pola geometris, tengkorak babi sebagai bola kecil, dan pembagian ruang dalam belum digambar.",
      "src": [
        "sl",
        "dt"
      ]
    },
    {
      "key": "rangka",
      "name": "Rangka atap",
      "sub": "Balok vertikal dan diagonal",
      "kicker": "Bagian 4 · rangka",
      "anchor": [
        0,
        9,
        3
      ],
      "cy": 9,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        3.2,
        0
      ],
      "q": {
        "x": 0.25
      },
      "paras": [
        "Omo Sebua tidak punya plafon dalam. Balok vertikal dan diagonal menahan atap, dan ruang di antaranya dipakai untuk menyimpan peralatan rumah tangga.",
        "Seluruh bahan bangunan adalah kayu yang disambung tanpa paku."
      ],
      "note": "Catatan model: rangka digambar sederhana. Detail sambungan kayu asli tidak disebut dalam sumber.",
      "src": [
        "sl",
        "dt"
      ]
    },
    {
      "key": "atap",
      "name": "Atap rumbia",
      "sub": "Atap yang menjulang",
      "kicker": "Bagian 5 · penutup",
      "anchor": [
        0,
        10,
        4.6
      ],
      "cy": 9.3,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        9.6,
        0
      ],
      "q": {
        "x": 0.25
      },
      "paras": [
        "Atap Omo Sebua menjulang tinggi dan dilapisi daun rumbia.",
        "Ada bukaan ventilasi di bagian atap depan.",
        "Bagian depan yang melengkung disebut ewe atau sikholi di Nias Selatan."
      ],
      "note": "Catatan model: bentuk atap disederhanakan, dan lengkung ewe belum digambar.",
      "src": [
        "sl",
        "dt"
      ]
    },
    {
      "key": "tangga",
      "space": true,
      "n": "T",
      "name": "Tangga",
      "sub": "Satu-satunya jalan masuk",
      "kicker": "Akses · pertahanan",
      "anchor": [
        0,
        2.4,
        7
      ],
      "cy": 2.4,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        0.8,
        3.2
      ],
      "q": {
        "x": 0.6
      },
      "selMove": [
        0,
        0,
        2.2
      ],
      "paras": [
        "Tangga sempit menjadi satu-satunya akses masuk ke Omo Sebua.",
        "Tangganya dapat digeser, bagian dari rancangan pertahanan rumah. Pilih bagian ini untuk melihat tangga bergeser."
      ],
      "note": "Catatan model: jumlah anak tangga dan sudutnya hanya gambaran.",
      "src": [
        "sl"
      ]
    }
  ]
};
