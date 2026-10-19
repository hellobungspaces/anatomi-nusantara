/* ===== Rumah Gadang (Minangkabau) ===== */
(function () {
  var THREE = App.T.THREE;
  var COLS = [-6.25, -3.75, -1.25, 1.25, 3.75, 6.25];
  var ROWS = [-2.4, -1.2, 0, 1.2, 2.4];
  var FY = 2.3; // tinggi lantai
  function eave(t) { return 5.0 + 0.9 * t * t; }
  function ridge(t) { return 6.9 + 2.6 * t * t; }
  function carveMat(T, rx, ry) {
    var t = T.tex.carve('gadang').clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
    return T.m.map(t);
  }

  App.register({
    id: 'gadang', tab: 'Rumah Gadang', place: 'Minangkabau',
    kicker: 'Rumah Gadang · rumah adat Minangkabau', title: 'Rumah beratap gonjong',
    paras: [
      'Rumah Gadang adalah rumah panggung kayu Minangkabau. Atapnya melengkung ke atas dan runcing, disebut gonjong.',
      'Tiangnya tidak ditanam, melainkan bertumpu di atas batu sandi. Sambungan kayunya memakai pasak, bukan paku.',
      'Rumah ini bersifat matrilineal: tanah dimiliki dan diwarisi perempuan, dan jumlah kamar mengikuti jumlah perempuan yang tinggal di dalamnya.'
    ],
    note: 'Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Model ini disederhanakan, lihat catatan di tiap bagian.',
    srcAll: ['as', 'dt'],
    src: {
      as: ['ARSITAG: Rumah Gadang, Rumah Tradisional Minangkabau', 'https://www.arsitag.com/article/rumah-gadang-rumah-tradisional-minangkabau'],
      dt: ['detikProperti: Mengenal Rumah Gadang', 'https://www.detik.com/properti/arsitektur/d-7439378/mengenal-rumah-gadang-bentuk-jenis-fungsi-dan-keunikannya']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Ruang & pelengkap',
    home: [16, 8, 17], ty: [4.6, 9.6], bd: 0.55, minD: 10, maxD: 80, ringR: 12.5,
    layers: [
      {
        key: 'sandi', name: 'Batu sandi', sub: 'Tumpuan tiang',
        kicker: 'Bagian 1 · tumpuan', anchor: [6.25, 0.3, 2.4], cy: 0.3, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Setiap tiang diletakkan di atas sandi, yaitu batu besar yang bagian atasnya rata. Tiang tidak ditanam ke tanah.',
          'Batu sandi menahan air tanah agar tidak mengenai tiang, memperluas bidang tumpu, dan membantu meredam getaran gempa.'
        ],
        note: 'Catatan model: 30 batu, satu untuk tiap tiang.',
        src: ['dt', 'as'],
        build: function (g, T) {
          COLS.forEach(function (x) { ROWS.forEach(function (z) {
            g.add(T.box(0.7, 0.3, 0.7, T.m.stone(false), x, 0.15, z));
          }); });
        }
      },
      {
        key: 'tiang', name: 'Tiang', sub: 'Lima baris, miring ke luar',
        kicker: 'Bagian 2 · tiang', anchor: [-6.25, 1.4, 2.4], cy: 1.4, base: [0, 0, 0], ex: [0, 1.2, 0],
        paras: [
          'Tiang idealnya disusun dalam lima baris sepanjang rumah. Ruang di antara baris-barisnya membentuk empat lanjar.',
          'Tiang dibuat sedikit miring ke arah luar sehingga badan rumah membesar ke atas seperti trapesium.',
          'Sambungan tiang memakai pasak kayu. Rumah ini dirancang agar lentur: saat gempa ia berayun mengikuti gelombang.'
        ],
        note: 'Catatan model: kemiringan tiang terlalu kecil untuk terlihat jelas, dan hanya tiang baris terluar yang digambar miring.',
        src: ['as', 'dt'],
        build: function (g, T) {
          var W = T.m.wood('ulin', false);
          COLS.forEach(function (x) { ROWS.forEach(function (z, i) {
            var out = i === 0 ? -1 : i === ROWS.length - 1 ? 1 : 0;
            var m = T.box(0.32, FY - 0.3, 0.32, W, x, 0.3 + (FY - 0.3) / 2, z + out * 0.06);
            m.rotation.x = out * 0.03; g.add(m);
          }); });
          ROWS.forEach(function (z) { g.add(T.box(13.4, 0.2, 0.2, W, 0, FY - 0.1, z)); });
        }
      },
      {
        key: 'lantai', name: 'Lantai & anjuang', sub: 'Lantai tinggi di kedua ujung',
        kicker: 'Bagian 3 · lantai', anchor: [-6.0, 2.8, 0], cy: 2.8, base: [0, 0, 0], ex: [0, 2.6, 0],
        paras: [
          'Lantai papan menutup bagian atas tiang. Di ujung kiri dan kanan, lantainya dibuat lebih tinggi, disebut anjuang (anjungan).',
          'Anjuang dipakai untuk penobatan kepala adat dan tempat pengantin bersanding. Pada rumah bergaya Koto Piliang, anjungan ditempati pemimpin; pada Budi Caniago tidak ada anjungan karena semua setara.'
        ],
        note: 'Catatan model: anjuang digambar di kedua ujung, sedangkan menurut sumber ada gaya rumah yang tidak memilikinya.',
        src: ['dt', 'as'],
        build: function (g, T) {
          g.add(T.box(13.8, 0.2, 5.4, T.m.wood('papan', true), 0, FY + 0.1, 0));
          [-1, 1].forEach(function (s) {
            g.add(T.box(2.6, 0.3, 5.0, T.m.wood('papan', true), s * 5.4, FY + 0.35, 0));
          });
        }
      },
      {
        key: 'dinding', name: 'Dinding', sub: 'Papan berukir dan anyaman bambu',
        kicker: 'Bagian 4 · dinding', anchor: [0, 3.9, 2.6], cy: 3.9, base: [0, 0, 0], ex: [0, 3.8, 0],
        paras: [
          'Dinding depan (dindiang tapi) dari papan yang dipasang vertikal dan berukir. Motifnya tumbuhan merambat, akar, bunga, dan buah, serta bentuk geometri.',
          'Dinding samping dan belakang tradisionalnya dianyam dari bambu. Anyaman ini dimaknai sebagai kekuatan masyarakat yang terbentuk ketika tiap individu menjadi bagian dari yang lebih besar.',
          'Ukiran mengikuti falsafah alam takambang jadi guru, yaitu alam sebagai sumber pengetahuan.'
        ],
        note: 'Catatan model: pintu dan jendela belum digambar, dan motif ukir hanyalah gambaran.',
        src: ['as', 'dt'],
        build: function (g, T, L) {
          var y = FY + 0.2 + 1.3, h = 2.6;
          var front = new THREE.Group(); g.add(front);
          front.add(T.box(13.4, h, 0.14, carveMat(T, 7, 1.3), 0, y, 2.55));
          T.spread(L, front, [0, 0, 2.2]);
          var back = new THREE.Group(); g.add(back);
          var b = T.box(13.4, h, 0.1, T.m.map(T.tex.woven(), true), 0, y, -2.55);
          b.rotation.x = -0.03; back.add(b);
          T.spread(L, back, [0, 0, -2.2]);
          [-1, 1].forEach(function (s) {
            var side = new THREE.Group(); g.add(side);
            side.add(T.box(0.1, h, 5.0, T.m.map(T.tex.woven(), true), s * 6.7, y, 0));
            T.spread(L, side, [s * 2.2, 0, 0]);
          });
        }
      },
      {
        key: 'atap', name: 'Atap gonjong', sub: 'Atap ijuk melengkung ke atas',
        kicker: 'Bagian 5 · penutup', anchor: [0, 7.0, 0], cy: 7.4, base: [0, 0, 0], ex: [0, 7.4, 0],
        paras: [
          'Atap gonjong dahulu dibuat dari ijuk, dan kini banyak diganti seng. Ujungnya runcing menjulang ke atas.',
          'Gonjong dimaknai sebagai tanduk kerbau, pucuk rebung, kapal, atau bukit. Ujung yang runcing juga dikaitkan dengan harapan mencapai Tuhan.',
          'Jumlah gonjong menentukan gaya rumah: pada Koto Piliang tiga di kiri dan kanan, satu di depan, dua di belakang; pada Budi Caniago dua di kanan dan kiri.'
        ],
        note: 'Catatan model: digambar empat gonjong sepanjang bubungan. Sumber menyebut jumlah empat atau enam, dan susunan aslinya bergantung gaya rumah.',
        src: ['as', 'dt'],
        build: function (g, T) {
          var geo = T.curveRoof({ L: 7.8, halfW: function () { return 3.5; }, eave: eave, ridge: ridge, nz: 40, nu: 14, rx: 4, ry: 10 });
          var roof = new THREE.Mesh(geo, T.m.roof('ijuk'));
          roof.rotation.y = Math.PI / 2; g.add(roof);
          var dark = T.m.roof('ijuk');
          [-7.3, -2.6, 2.6, 7.3].forEach(function (x) {
            var s = x < 0 ? -1 : 1, t = x / 7.8, r = ridge(t);
            var h = T.tube([[x, r - 0.3, 0], [x + s * 0.15, r + 0.7, 0], [x + s * 0.5, r + 1.7, 0], [x + s * 0.55, r + 2.3, 0]], 0.3, 0.03, dark, 10, 18);
            g.add(h);
          });
        }
      },
      {
        key: 'tangga', space: true, n: 'T', name: 'Tangga & serambi', sub: 'Pintu masuk di tengah',
        kicker: 'Akses · depan', anchor: [0, 1.4, 4.4], cy: 1.4, base: [0, 0, 0], ex: [0, 2.6, 1.0], selMove: [0, 0, 1.8],
        paras: [
          'Rumah memanjang dan pintunya ada di bagian tengah. Orang naik lewat tangga di tengah. Pintunya tidak menghadap jalan, agar kegiatan di dalam tidak langsung terlihat dari luar.',
          'Setiap orang yang hendak naik harus mencuci kaki terlebih dahulu.'
        ],
        note: 'Catatan model: bentuk tangga dan batu cuci kaki adalah rekaan sederhana. Sumber tidak menjelaskan bentuknya.',
        src: ['dt', 'as'],
        build: function (g, T) {
          var W = T.m.wood('ulin', false);
          for (var i = 0; i < 5; i++) g.add(T.box(2.2, 0.16, 0.5, W, 0, 0.5 + i * 0.4, 4.6 - i * 0.5));
          g.add(T.box(2.6, 0.2, 1.2, T.m.wood('papan', true), 0, FY + 0.1, 3.4));
          g.add(T.box(1.4, 0.2, 1.0, T.m.stone(true), 0, 0.1, 5.8));
        }
      },
      {
        key: 'labuah', space: true, n: 'L', name: 'Labuah gajah', sub: 'Lanjar umum di depan',
        kicker: 'Ruang · depan', anchor: [0, 3.2, 1.2], cy: 3.2, base: [0, 0, 0], ex: [0, 2.6, 0],
        paras: [
          'Labuah gajah (jalan gajah) adalah lanjar umum untuk kegiatan sehari-hari dan acara seremonial.',
          'Ruang depan dipakai untuk berkumpul, musyawarah, menerima tamu, dan upacara adat.'
        ],
        note: 'Catatan model: bidang emas menandai lanjar kira-kira. Letak dan lebar aslinya bisa berbeda.',
        src: ['as', 'dt'],
        build: function (g, T, L) { T.zone(L, { y: FY + 0.22, cells: [{ w: 8.0, d: 2.2, x: 0, z: 1.3, a: 0.26 }] }); }
      },
      {
        key: 'bilik', space: true, n: 'B', name: 'Bilik (ruang)', sub: 'Kamar di lanjar belakang',
        kicker: 'Ruang · belakang', anchor: [0, 3.2, -1.6], cy: 3.2, base: [0, 0, 0], ex: [0, 2.6, 0],
        paras: [
          'Lanjar paling belakang dibagi menjadi kamar tidur yang disebut Ruang. Adat menetapkan minimal lima Ruang, dengan jumlah ideal sembilan.',
          'Jumlah kamar mengikuti jumlah perempuan yang tinggal di rumah itu.'
        ],
        note: 'Catatan model: lima bilik digambar sebagai batas minimal menurut sumber.',
        src: ['as', 'dt'],
        build: function (g, T, L) {
          var cells = [];
          for (var i = 0; i < 5; i++) cells.push({ w: 1.5, d: 1.9, x: -3.2 + i * 1.6, z: -1.7, a: 0.28 });
          T.zone(L, { y: FY + 0.22, cells: cells });
        }
      },
      {
        key: 'rangkiang', space: true, n: 'R', name: 'Rangkiang', sub: 'Tiga lumbung padi',
        kicker: 'Pelengkap · halaman', anchor: [0, 3.4, 9.6], cy: 2.6, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Rangkiang adalah rumah kecil terpisah untuk menyimpan cadangan padi, dipakai saat bencana atau perang.',
          'Ada tiga jenis: Sitinjau Lauik untuk beras upacara adat, Sitangka Lapa untuk sumbangan ke desa miskin dan yang kelaparan, dan Sibayau-bayau untuk kebutuhan sehari-hari keluarga.'
        ],
        note: 'Catatan model: ketiganya digambar serupa dan diletakkan di depan rumah. Ukuran dan letak aslinya bervariasi.',
        src: ['as', 'dt'],
        build: function (g, T) {
          [-4, 0, 4].forEach(function (x) {
            [-0.55, 0.55].forEach(function (dx) { [-0.55, 0.55].forEach(function (dz) {
              g.add(T.cyl(0.1, 0.1, 1.2, 8, T.m.wood('ulin', false), x + dx, 0.6, 9.6 + dz));
            }); });
            g.add(T.box(1.6, 1.0, 1.6, T.m.wood('nangka', false), x, 1.7, 9.6));
            var geo = T.curveRoof({ L: 1.0, halfW: function () { return 1.05; }, eave: function () { return 2.2; }, ridge: function (t) { return 2.9 + 0.7 * t * t; }, nz: 8, nu: 8, rx: 2, ry: 2 });
            var r = new THREE.Mesh(geo, T.m.roof('ijuk')); r.rotation.y = Math.PI / 2; r.position.set(x, 0, 9.6); g.add(r);
          });
        }
      }
    ]
  });
})();
