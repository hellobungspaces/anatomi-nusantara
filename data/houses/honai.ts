import type { House } from "../types";

export const honaiHouse: House = {
  "id": "honai",
  "tab": "Honai",
  "place": "Papua Pegunungan",
  "kicker": "Honai · rumah adat suku Dani",
  "title": "Rumah bulat penahan dingin",
  "paras": [
    "Honai adalah rumah bulat beratap kerucut dari jerami atau ilalang. Dari udara bentuknya disebut seperti jamur yang berjejer di lembah.",
    "Rumah ini tanpa jendela, hanya satu pintu sempit, dan sebuah perapian di tengah memberi kehangatan.",
    "Honai adalah rumah laki-laki. Rumah perempuan disebut ebei, dan kandang ternak disebut wamai."
  ],
  "note": "Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Ukuran model mengikuti tinggi 2 sampai 2,5 m dari sumber.",
  "srcAll": [
    "ud",
    "tl",
    "dt"
  ],
  "src": {
    "ud": [
      "Universitas Jember: Rumah Honai",
      "https://tamankebangsaan.unej.ac.id/rnh"
    ],
    "tl": [
      "KPU Tolikara: Mengenal Rumah Honai",
      "https://kab-tolikara.kpu.go.id/blog/read/8480_mengenal-rumah-honai-dan-makna-budayanya-bagi-orang-papua"
    ],
    "dt": [
      "detikTravel: Honai, rumah tanpa jendela",
      "https://travel.detik.com/domestic-destination/d-5933531/mengenal-honai-rumah-tanpa-jendela-yang-unik-dari-papua"
    ]
  },
  "list1": "Struktur, disusun dari bawah ke atas",
  "list2": "Ruang",
  "home": [
    8,
    5,
    10
  ],
  "ty": [
    1.3,
    4.3
  ],
  "bd": 0.7,
  "minD": 5,
  "maxD": 40,
  "ringR": 5.2,
  "layers": [
    {
      "key": "tanah",
      "name": "Lantai tanah",
      "sub": "Tanah padat dan perapian",
      "kicker": "Bagian 1 · dasar",
      "anchor": [
        1.5,
        0.15,
        1.3
      ],
      "cy": 0.2,
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
        "Lantai dasar adalah tanah yang dipadatkan, beralas rumput atau jerami. Lantai pertama dipakai untuk tidur.",
        "Bentuk bundar membuat panas dari api menyebar merata."
      ],
      "note": "Catatan model: diameter rumah tidak disebut sumber, diperkirakan sekitar 5 m.",
      "src": [
        "tl",
        "ud"
      ]
    },
    {
      "key": "dinding",
      "name": "Dinding kayu",
      "sub": "Papan melingkar",
      "kicker": "Bagian 2 · dinding",
      "anchor": [
        -2.5,
        0.6,
        0
      ],
      "cy": 0.6,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        1.7,
        0
      ],
      "paras": [
        "Dinding disusun melingkar dari papan kayu kasar, bertiang kayu besi. Susunan melingkar melambangkan kesatuan dan persatuan.",
        "Honai tidak berjendela untuk melindungi penghuni dari udara dingin pegunungan. Hanya ada satu pintu yang sempit dan ventilasi kecil."
      ],
      "note": "Catatan model: 30 papan, satu celah untuk pintu. Dinding aslinya juga disebut dianyam, model memakai papan.",
      "src": [
        "ud",
        "tl",
        "dt"
      ]
    },
    {
      "key": "lantai2",
      "name": "Lantai atas",
      "sub": "Tempat bersantai dan makan",
      "kicker": "Bagian 3 · lantai",
      "anchor": [
        1.7,
        1.05,
        -1.2
      ],
      "cy": 1.05,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        0.9,
        0
      ],
      "paras": [
        "Rumah memiliki dua lantai. Lantai atas dipakai untuk bersantai dan makan, serta untuk beraktivitas dan membuat kerajinan.",
        "Lantai dari rumput atau jerami melambangkan kesederhanaan, dan tamu duduk beralaskan jerami agar tercipta kebersamaan."
      ],
      "note": "Catatan model: bukaan di tengah lantai atas untuk asap dan cahaya adalah rekaan, sumber tidak menjelaskan susunan lantai atas.",
      "src": [
        "ud",
        "dt"
      ]
    },
    {
      "key": "atap",
      "name": "Atap kerucut",
      "sub": "Jerami atau ilalang",
      "kicker": "Bagian 4 · penutup",
      "anchor": [
        0,
        2,
        0.9
      ],
      "cy": 1.9,
      "base": [
        0,
        0,
        0
      ],
      "ex": [
        0,
        3.6,
        0
      ],
      "paras": [
        "Atap berbentuk kerucut dari jerami atau ilalang yang disusun tebal untuk menahan dingin dan hujan. Atap menutup hingga ke bawah untuk melindungi dinding.",
        "Ilalang dimaknai sebagai mandiri, kuat, kritis, dan mudah menyesuaikan diri.",
        "Tinggi rumah umumnya dua sampai dua setengah meter."
      ],
      "note": "Catatan model: rangka atap di dalam tidak digambar.",
      "src": [
        "ud",
        "tl"
      ]
    },
    {
      "key": "api",
      "space": true,
      "n": "A",
      "name": "Perapian",
      "sub": "Galian tanah di tengah",
      "kicker": "Ruang · pusat rumah",
      "anchor": [
        0,
        0.5,
        0
      ],
      "cy": 0.4,
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
        "Di tengah lantai ada tungku berupa galian tanah, sumber panas sekaligus tempat memasak. Bara apinya memberi penerangan dan kehangatan."
      ],
      "note": "Catatan model: bidang emas menandai posisi perapian; api digambar sebagai kerucut oranye.",
      "src": [
        "dt",
        "tl"
      ]
    },
    {
      "key": "pintu",
      "space": true,
      "n": "P",
      "name": "Pintu",
      "sub": "Satu pintu sempit",
      "kicker": "Ruang · akses",
      "anchor": [
        0,
        0.5,
        2.5
      ],
      "cy": 0.5,
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
        "Honai hanya punya satu pintu yang sempit dan tidak berjendela. Ukuran pintunya tidak disebut dalam sumber."
      ],
      "note": "Catatan model: celah pintu selebar tiga papan, ukurannya perkiraan.",
      "src": [
        "tl",
        "dt"
      ]
    }
  ]
};
