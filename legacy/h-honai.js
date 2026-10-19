/* ===== Honai (Papua Pegunungan) ===== */
(function () {
  var THREE = App.T.THREE;
  var R = 2.5;      // jari-jari dinding
  var WH = 1.0;     // tinggi dinding
  var F2 = 0.95;    // tinggi lantai atas
  var NPL = 30;     // jumlah papan dinding
  var DOOR = 1;     // indeks papan yang dilewati pintu (dikosongkan)

  App.register({
    id: 'honai', tab: 'Honai', place: 'Papua Pegunungan',
    kicker: 'Honai · rumah adat suku Dani', title: 'Rumah bulat penahan dingin',
    paras: [
      'Honai adalah rumah bulat beratap kerucut dari jerami atau ilalang. Dari udara bentuknya disebut seperti jamur yang berjejer di lembah.',
      'Rumah ini tanpa jendela, hanya satu pintu sempit, dan sebuah perapian di tengah memberi kehangatan.',
      'Honai adalah rumah laki-laki. Rumah perempuan disebut ebei, dan kandang ternak disebut wamai.'
    ],
    note: 'Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Ukuran model mengikuti tinggi 2 sampai 2,5 m dari sumber.',
    srcAll: ['ud', 'tl', 'dt'],
    src: {
      ud: ['Universitas Jember: Rumah Honai', 'https://tamankebangsaan.unej.ac.id/rnh'],
      tl: ['KPU Tolikara: Mengenal Rumah Honai', 'https://kab-tolikara.kpu.go.id/blog/read/8480_mengenal-rumah-honai-dan-makna-budayanya-bagi-orang-papua'],
      dt: ['detikTravel: Honai, rumah tanpa jendela', 'https://travel.detik.com/domestic-destination/d-5933531/mengenal-honai-rumah-tanpa-jendela-yang-unik-dari-papua']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Ruang',
    home: [8, 5, 10], ty: [1.3, 4.3], bd: 0.7, minD: 5, maxD: 40, ringR: 5.2,
    layers: [
      {
        key: 'tanah', name: 'Lantai tanah', sub: 'Tanah padat dan perapian',
        kicker: 'Bagian 1 · dasar', anchor: [1.5, 0.15, 1.3], cy: 0.2, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Lantai dasar adalah tanah yang dipadatkan, beralas rumput atau jerami. Lantai pertama dipakai untuk tidur.',
          'Bentuk bundar membuat panas dari api menyebar merata.'
        ],
        note: 'Catatan model: diameter rumah tidak disebut sumber, diperkirakan sekitar 5 m.',
        src: ['tl', 'ud'],
        build: function (g, T) {
          g.add(T.cyl(R + 0.1, R + 0.1, 0.16, 40, T.m.plain(0x6b5a3f, 0.95, false), 0, 0.08, 0));
          g.add(T.cyl(R - 0.5, R - 0.5, 0.04, 40, T.m.plain(0xa8905a, 0.95, false), 0, 0.18, 0));
        }
      },
      {
        key: 'dinding', name: 'Dinding kayu', sub: 'Papan melingkar',
        kicker: 'Bagian 2 · dinding', anchor: [-2.5, 0.6, 0], cy: 0.6, base: [0, 0, 0], ex: [0, 1.7, 0],
        paras: [
          'Dinding disusun melingkar dari papan kayu kasar, bertiang kayu besi. Susunan melingkar melambangkan kesatuan dan persatuan.',
          'Honai tidak berjendela untuk melindungi penghuni dari udara dingin pegunungan. Hanya ada satu pintu yang sempit dan ventilasi kecil.'
        ],
        note: 'Catatan model: 30 papan, satu celah untuk pintu. Dinding aslinya juga disebut dianyam, model memakai papan.',
        src: ['ud', 'tl', 'dt'],
        build: function (g, T, L) {
          var W = T.m.wood('papan', false);
          for (var i = 0; i < NPL; i++) {
            if (i >= DOOR - 1 && i <= DOOR + 1) continue;
            var a = i / NPL * Math.PI * 2, x = Math.sin(a) * R, z = Math.cos(a) * R;
            var p = T.box(0.5, WH, 0.12, W, x, 0.1 + WH / 2, z); p.rotation.y = a;
            g.add(p); T.spread(L, p, [Math.sin(a) * 1.6, 0, Math.cos(a) * 1.6]);
          }
        }
      },
      {
        key: 'lantai2', name: 'Lantai atas', sub: 'Tempat bersantai dan makan',
        kicker: 'Bagian 3 · lantai', anchor: [1.7, F2 + 0.1, -1.2], cy: F2 + 0.1, base: [0, 0, 0], ex: [0, 0.9, 0],
        paras: [
          'Rumah memiliki dua lantai. Lantai atas dipakai untuk bersantai dan makan, serta untuk beraktivitas dan membuat kerajinan.',
          'Lantai dari rumput atau jerami melambangkan kesederhanaan, dan tamu duduk beralaskan jerami agar tercipta kebersamaan.'
        ],
        note: 'Catatan model: bukaan di tengah lantai atas untuk asap dan cahaya adalah rekaan, sumber tidak menjelaskan susunan lantai atas.',
        src: ['ud', 'dt'],
        build: function (g, T) {
          var s = new THREE.Shape(); s.absarc(0, 0, R - 0.25, 0, Math.PI * 2, false);
          var h = new THREE.Path(); h.absarc(0, 0, 0.8, 0, Math.PI * 2, true); s.holes.push(h);
          var geo = new THREE.ExtrudeGeometry(s, { depth: 0.1, bevelEnabled: false, curveSegments: 40 });
          geo.rotateX(-Math.PI / 2);
          var m = new THREE.Mesh(geo, T.m.plain(0xa8905a, 0.95, true)); m.position.y = F2; g.add(m);
        }
      },
      {
        key: 'atap', name: 'Atap kerucut', sub: 'Jerami atau ilalang',
        kicker: 'Bagian 4 · penutup', anchor: [0, 2.0, 0.9], cy: 1.9, base: [0, 0, 0], ex: [0, 3.6, 0],
        paras: [
          'Atap berbentuk kerucut dari jerami atau ilalang yang disusun tebal untuk menahan dingin dan hujan. Atap menutup hingga ke bawah untuk melindungi dinding.',
          'Ilalang dimaknai sebagai mandiri, kuat, kritis, dan mudah menyesuaikan diri.',
          'Tinggi rumah umumnya dua sampai dua setengah meter.'
        ],
        note: 'Catatan model: rangka atap di dalam tidak digambar.',
        src: ['ud', 'tl'],
        build: function (g, T) {
          var geo = new THREE.CylinderGeometry(0.06, R + 0.5, 1.9, 40, 1, true);
          var m = T.m.roof('rumbia'); var r = new THREE.Mesh(geo, m); r.position.y = 0.85 + 0.95; g.add(r);
          g.add(T.cyl(0.07, 0.1, 0.5, 8, T.m.wood('papan', false), 0, 2.85, 0));
        }
      },
      {
        key: 'api', space: true, n: 'A', name: 'Perapian', sub: 'Galian tanah di tengah',
        kicker: 'Ruang · pusat rumah', anchor: [0, 0.5, 0], cy: 0.4, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Di tengah lantai ada tungku berupa galian tanah, sumber panas sekaligus tempat memasak. Bara apinya memberi penerangan dan kehangatan.'
        ],
        note: 'Catatan model: bidang emas menandai posisi perapian; api digambar sebagai kerucut oranye.',
        src: ['dt', 'tl'],
        build: function (g, T, L) {
          g.add(T.cyl(0.55, 0.55, 0.12, 20, T.m.stone(false), 0, 0.24, 0));
          g.add(T.cyl(0.0, 0.3, 0.55, 12, T.m.plain(0xd9622b, 0.6, false), 0, 0.55, 0));
          T.zone(L, { y: 0.21, cells: [{ w: 1.6, d: 1.6, x: 0, z: 0, a: 0.3 }] });
        }
      },
      {
        key: 'pintu', space: true, n: 'P', name: 'Pintu', sub: 'Satu pintu sempit',
        kicker: 'Ruang · akses', anchor: [0, 0.5, 2.5], cy: 0.5, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Honai hanya punya satu pintu yang sempit dan tidak berjendela. Ukuran pintunya tidak disebut dalam sumber.'
        ],
        note: 'Catatan model: celah pintu selebar tiga papan, ukurannya perkiraan.',
        src: ['tl', 'dt'],
        build: function (g, T, L) {
          var a = DOOR / NPL * Math.PI * 2;
          T.zone(L, { y: 0.21, cells: [{ w: 0.9, d: 1.2, x: Math.sin(a) * (R - 0.1), z: Math.cos(a) * (R - 0.1), a: 0.35 }] });
        }
      }
    ]
  });
})();
