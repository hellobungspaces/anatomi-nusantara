import type { House } from "../types";

export const jogloHouse: House = {
  "id": "joglo",
  "tab": "Joglo",
  "place": "Jawa",
  "region": {"pulau":"Jawa","provinsi":"DI Yogyakarta","kota":"Sleman"},
  "kicker": "Joglo · rumah adat Jawa",
  "title": "Rumah beratap gunungan",
  "paras": [
    "Nama joglo berasal dari bentuk atapnya yang berbentuk gunungan. Bagian tengah rumah disangga empat tiang utama yang disebut soko guru.",
    "Secara tradisional joglo dihuni bangsawan atau orang berkedudukan tinggi, dan rumahnya mencerminkan kedudukan pemiliknya.",
    "Ruang berjajar dari depan ke belakang: pendopo, pringgitan, dalem, lalu senthong."
  ],
  "note": "Model ini menampilkan satu unit dalem berlantai dan berdinding. Pendopo yang terbuka dan pringgitan belum digambar. Ketuk bagian di daftar, penanda bernomor, atau langsung pada model.",
  "srcAll": [
    "it",
    "sin",
    "ub"
  ],
  "src": {
    "it": [
      "Indonesia.travel: Joglo",
      "https://www.indonesia.travel/us/en/travel-ideas/heritage/joglo-traditional-house"
    ],
    "sin": [
      "Sinektika UMS (2014)",
      "https://journals.ums.ac.id/sinektika/article/download/1441/989"
    ],
    "ub": [
      "Repositori UB: Arsitektur Tradisional Jawa",
      "https://repository.ub.ac.id/9769/7/BAB%20II.pdf"
    ],
    "jb": [
      "UIN Alauddin: Joglo Bucu",
      "https://journal.uin-alauddin.ac.id/index.php/nucturenature/article/download/33696/17379"
    ],
    "jc": [
      "Jogja Cagar: Joglo Suyadi",
      "https://jogjacagar.jogjaprov.go.id/detail/4046/rumah-joglo-milik-suyadi"
    ],
    "gn": [
      "Good News from Indonesia",
      "https://www.goodnewsfromindonesia.id/2026/07/24/struktur-rumah-joglo-fungsinya"
    ]
  },
  "list1": "Struktur, disusun dari bawah ke atas",
  "list2": "Ruang",
  "home": [
    14,
    7,
    16
  ],
  "ty": [
    4.6,
    10.8
  ],
  "bd": 0.85,
  "minD": 9,
  "maxD": 60,
  "ringR": 10.4,
  "layers": [
    {
      "key": "batur",
      "name": "Baturan & lantai",
      "sub": "Alas rumah yang ditinggikan",
      "kicker": "Bagian 1 · dasar",
      "anchor": [
        0,
        0.3,
        5.7
      ],
      "cy": 0.35,
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
        "Di struktur bawah, umpak berpasangan dengan baturan. Pada rumah Joglo milik Suyadi di Sleman, pondasinya ditinggikan 111,5 cm dari permukaan tanah.",
        "Lantainya bertingkat. Lantai pendopo 40 sampai 50 cm lebih tinggi daripada emper, dan lantai dalem lebih tinggi lagi daripada pendopo dan pringgitan.",
        "Emper atau teras umumnya selebar sekitar 2 meter."
      ],
      "note": "Catatan model: baturan dan lantai digambar sebagai dua undakan polos. Bahan lantai pada contoh Sleman berupa plester semen dan tegel.",
      "src": [
        "ub",
        "sin",
        "jb",
        "jc"
      ]
    },
    {
      "key": "umpak",
      "name": "Umpak",
      "sub": "Batu alas tiang",
      "kicker": "Bagian 2 · alas tiang",
      "anchor": [
        5.1,
        0.5,
        5.1
      ],
      "cy": 0.25,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        0.6,
        0
      ],
      "paras": [
        "Umpak adalah alas soko guru dan menahan gaya vertikal. Bahannya umumnya batu alam, supaya kayu tidak menyentuh tanah dan cepat lapuk akibat air atau rayap.",
        "Umpak soko guru sering berhias padma, bunga teratai yang melambangkan kekokohan, kekuatan, dan kesucian. Contoh di Sleman: umpak soko guru pendopo berbentuk teratai dari batu berukuran 30 × 32 × 27 cm.",
        "Menurut kajian Subiyantoro (2011) yang dikutip Good News from Indonesia, atap, tiang, dan umpak mewakili dunia atas, tengah, dan bawah."
      ],
      "note": "Catatan model: padma digambar sebagai delapan kelopak kecil di sekeliling tiang.",
      "src": [
        "ub",
        "jb",
        "jc",
        "gn"
      ]
    },
    {
      "key": "saka",
      "name": "Soko guru",
      "sub": "Empat tiang utama",
      "kicker": "Bagian 3 · tiang",
      "anchor": [
        1.85,
        2.9,
        1.85
      ],
      "cy": 2.7,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        1.9,
        0
      ],
      "paras": [
        "Empat tiang kayu menopang bagian tengah rumah, dan stabilitas struktur berpusat pada sistem soko guru. Bahannya umumnya kayu jati atau nangka.",
        "Keempat tiang ini melambangkan empat arah mata angin. Bagian tengahnya dikaitkan dengan konsep ketuhanan.",
        "Ukurannya beragam. Pada rumah di Sleman, soko guru dalem berukuran 15 × 15 cm dan soko guru pendopo 17,8 × 18,6 cm."
      ],
      "note": "Catatan model: selain 4 soko guru ada 12 tiang tepi yang menggambarkan emper. Jumlah dan letaknya berbeda-beda; rumah di Sleman punya 6 saka emper.",
      "src": [
        "ub",
        "sin",
        "jb",
        "jc",
        "it"
      ]
    },
    {
      "key": "dinding",
      "name": "Dinding gebyok",
      "sub": "Pembatas ruang dalem",
      "kicker": "Bagian 4 · dinding",
      "anchor": [
        0.6,
        1.2,
        1.9
      ],
      "cy": 1.5,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        0,
        0
      ],
      "paras": [
        "Dinding joglo berupa gebyok, yaitu dinding kayu semi permanen yang membatasi pringgitan dan dalem ageng. Ruang publik seperti pendopo justru memakai dinding terbuka atau tiang saja.",
        "Pada rumah Joglo di Sleman, bagian depan dalem berupa gebyok dengan tiga pasang pintu kupu tarung. Bingkai pintu dan gebyok sering berukir patran, motif daun yang tersusun berjajar.",
        "Pintu masuk dalem sengaja dibuat rendah sebagai penghormatan kepada pemilik rumah."
      ],
      "note": "Catatan model: dinding samping dan belakang digambar polos, ukiran belum digambar. Lubang berjeruji di atas pintu mengikuti tebeng pada contoh Sleman.",
      "src": [
        "ub",
        "sin",
        "jb",
        "jc"
      ]
    },
    {
      "key": "beams",
      "name": "Balok pengunci",
      "sub": "Blandar, pengerat, sunduk, kili",
      "kicker": "Bagian 5 · sambungan",
      "anchor": [
        0,
        5.1,
        1.95
      ],
      "cy": 4.1,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        4.4,
        0
      ],
      "paras": [
        "Blandar, juga disebut pengerat, menopang tumpang sari. Sunduk dan kili membentuk sambungan kaku dengan soko guru.",
        "Struktur vertikal joglo dikelompokkan menjadi tiga bagian: atas (mala dan ander), tengah (tumpang sari, sunduk, kili, dan soko guru), serta bawah (umpak dan baturan)."
      ],
      "note": "Catatan model: balok digambar sebagai kerangka sederhana tanpa sambungan, dan posisi tiap balok tidak persis seperti rumah asli. Mala dan ander belum digambar.",
      "src": [
        "ub"
      ]
    },
    {
      "key": "tumpang",
      "name": "Tumpang sari",
      "sub": "Balok bertingkat di atas tiang",
      "kicker": "Bagian 6 · penopang atap",
      "anchor": [
        2.35,
        6.35,
        2.35
      ],
      "cy": 6.3,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        6.9,
        0
      ],
      "paras": [
        "Tumpang sari adalah susunan balok kayu bertingkat yang disangga soko guru, dipasang di atas blandar dan berbentuk mengerucut.",
        "Tingkat-tingkatnya dimaknai sebagai tahapan syariat, tarekat, hakekat, dan makrifat.",
        "Tumpang sari menjadi pembeda utama joglo dari rumah limasan."
      ],
      "note": "Catatan model: digambar enam tingkat, selang-seling kayu dan emas sebagai gambaran ornamen.",
      "src": [
        "ub",
        "sin",
        "gn",
        "jb"
      ]
    },
    {
      "key": "roof",
      "name": "Atap joglo",
      "sub": "Atap gunungan",
      "kicker": "Bagian 7 · penutup",
      "anchor": [
        0,
        6.9,
        2.65
      ],
      "cy": 6.2,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        11,
        0
      ],
      "paras": [
        "Atap joglo berbentuk piramida bersisi empat yang disebut gunungan, melambangkan keselarasan dan keseimbangan. Dari bentuk inilah nama joglo berasal.",
        "Joglo adalah salah satu dari tiga jenis atap utama rumah Jawa, bersama limasan dan kampung, dan secara tradisional dikaitkan dengan kediaman bangsawan.",
        "Atap juga cara beradaptasi dengan iklim tropis. Pada rumah di Sleman, puncak atap pendopo diberi mustaka berbentuk garuda dan penutupnya genteng tanah liat."
      ],
      "note": "Catatan model: puncak digambar sebagai bubungan pendek dengan mustaka sederhana.",
      "src": [
        "it",
        "sin",
        "jc"
      ]
    },
    {
      "key": "dalem",
      "space": true,
      "n": "D",
      "name": "Dalem",
      "sub": "Ruang keluarga di pusat rumah",
      "kicker": "Ruang · pusat rumah",
      "anchor": [
        0,
        0.2,
        0.5
      ],
      "cy": 0.6,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        0,
        0
      ],
      "paras": [
        "Dalem (disebut juga omah njero) adalah ruang keluarga di pusat rumah dan bersifat privat. Pintu masuknya dibuat rendah sebagai penghormatan kepada pemilik rumah.",
        "Ruang yang dibentuk oleh empat soko guru disebut rong-rongan.",
        "Lantai dalem lebih tinggi daripada pendopo dan pringgitan."
      ],
      "note": "Catatan model: bidang emas di lantai menandai dalem, dan kolom tipis muncul saat dipilih.",
      "src": [
        "sin",
        "ub",
        "jb"
      ]
    },
    {
      "key": "senthong",
      "space": true,
      "n": "S",
      "name": "Senthong",
      "sub": "Tiga ruang di bagian belakang",
      "kicker": "Ruang · bagian terdalam",
      "anchor": [
        0,
        0.2,
        -0.9
      ],
      "cy": 0.6,
      "base": [
        0,
        0.75,
        0
      ],
      "ex": [
        0,
        0,
        0
      ],
      "paras": [
        "Dalem ageng punya tiga senthong: kiwa (kiri), tengah, dan tengen (kanan).",
        "Senthong tengah, atau krobongan, paling dalam dan bersifat sakral. Ruang ini dipakai untuk pemujaan Dewi Sri dan meditasi.",
        "Senthong kiri dan kanan dipakai untuk kamar tidur serta menyimpan harta atau pusaka."
      ],
      "note": "Catatan model: tiga senthong digambar sebagai tiga bilik di belakang dalem. Bilik tengah diberi warna lebih pekat.",
      "src": [
        "sin",
        "ub",
        "jb",
        "it"
      ]
    }
  ]
};
