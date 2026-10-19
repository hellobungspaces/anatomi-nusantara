/* ===== Joglo (Jawa) ===== */
(function () {
  var THREE = App.T.THREE;
  var GRID = [-4.5, -1.5, 1.5, 4.5];
  var SAKA = [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]];
  var OUTER = [];
  GRID.forEach(function (x) { GRID.forEach(function (z) { if (Math.abs(x) === 4.5 || Math.abs(z) === 4.5) OUTER.push([x, z]); }); });
  var FLOOR = [0, 0.75, 0];

  function addUmpak(g, T, x, z, sb, st, h) {
    var geo = new THREE.CylinderGeometry(st / Math.SQRT2, sb / Math.SQRT2, h, 4, 1);
    geo.rotateY(Math.PI / 4);
    var m = new THREE.Mesh(geo, T.m.stone(false));
    m.position.set(x, h / 2, z);
    g.add(m);
  }

  App.register({
    id: 'joglo', tab: 'Joglo', place: 'Jawa',
    kicker: 'Joglo · rumah adat Jawa', title: 'Rumah beratap gunungan',
    paras: [
      'Nama joglo berasal dari bentuk atapnya yang berbentuk gunungan. Bagian tengah rumah disangga empat tiang utama yang disebut soko guru.',
      'Secara tradisional joglo dihuni bangsawan atau orang berkedudukan tinggi, dan rumahnya mencerminkan kedudukan pemiliknya.',
      'Ruang berjajar dari depan ke belakang: pendopo, pringgitan, dalem, lalu senthong.'
    ],
    note: 'Model ini menampilkan satu unit dalem berlantai dan berdinding. Pendopo yang terbuka dan pringgitan belum digambar. Ketuk bagian di daftar, penanda bernomor, atau langsung pada model.',
    srcAll: ['it', 'sin', 'ub'],
    src: {
      it: ['Indonesia.travel: Joglo', 'https://www.indonesia.travel/us/en/travel-ideas/heritage/joglo-traditional-house'],
      sin: ['Sinektika UMS (2014)', 'https://journals.ums.ac.id/sinektika/article/download/1441/989'],
      ub: ['Repositori UB: Arsitektur Tradisional Jawa', 'https://repository.ub.ac.id/9769/7/BAB%20II.pdf'],
      jb: ['UIN Alauddin: Joglo Bucu', 'https://journal.uin-alauddin.ac.id/index.php/nucturenature/article/download/33696/17379'],
      jc: ['Jogja Cagar: Joglo Suyadi', 'https://jogjacagar.jogjaprov.go.id/detail/4046/rumah-joglo-milik-suyadi'],
      gn: ['Good News from Indonesia', 'https://www.goodnewsfromindonesia.id/2026/07/24/struktur-rumah-joglo-fungsinya']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Ruang',
    home: [14, 7, 16], ty: [4.6, 10.8], bd: 0.85, minD: 9, maxD: 60, ringR: 10.4,
    layers: [
      {
        key: 'batur', name: 'Baturan & lantai', sub: 'Alas rumah yang ditinggikan',
        kicker: 'Bagian 1 · dasar', anchor: [0, 0.3, 5.7], cy: 0.35, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Di struktur bawah, umpak berpasangan dengan baturan. Pada rumah Joglo milik Suyadi di Sleman, pondasinya ditinggikan 111,5 cm dari permukaan tanah.',
          'Lantainya bertingkat. Lantai pendopo 40 sampai 50 cm lebih tinggi daripada emper, dan lantai dalem lebih tinggi lagi daripada pendopo dan pringgitan.',
          'Emper atau teras umumnya selebar sekitar 2 meter.'
        ],
        note: 'Catatan model: baturan dan lantai digambar sebagai dua undakan polos. Bahan lantai pada contoh Sleman berupa plester semen dan tegel.',
        src: ['ub', 'sin', 'jb', 'jc'],
        build: function (g, T) {
          g.add(T.box(12.6, 0.3, 12.6, T.m.stone(true), 0, 0.15, 0));
          g.add(T.box(9.9, 0.42, 9.9, T.m.stone(false), 0, 0.51, 0));
          g.add(T.box(9.9, 0.03, 9.9, T.m.map(T.tex.tile(7, 7)), 0, 0.735, 0));
        }
      },
      {
        key: 'umpak', name: 'Umpak', sub: 'Batu alas tiang',
        kicker: 'Bagian 2 · alas tiang', anchor: [5.1, 0.5, 5.1], cy: 0.25, base: FLOOR, ex: [0, 0.6, 0],
        paras: [
          'Umpak adalah alas soko guru dan menahan gaya vertikal. Bahannya umumnya batu alam, supaya kayu tidak menyentuh tanah dan cepat lapuk akibat air atau rayap.',
          'Umpak soko guru sering berhias padma, bunga teratai yang melambangkan kekokohan, kekuatan, dan kesucian. Contoh di Sleman: umpak soko guru pendopo berbentuk teratai dari batu berukuran 30 × 32 × 27 cm.',
          'Menurut kajian Subiyantoro (2011) yang dikutip Good News from Indonesia, atap, tiang, dan umpak mewakili dunia atas, tengah, dan bawah.'
        ],
        note: 'Catatan model: padma digambar sebagai delapan kelopak kecil di sekeliling tiang.',
        src: ['ub', 'jb', 'jc', 'gn'],
        build: function (g, T) {
          SAKA.forEach(function (p) { addUmpak(g, T, p[0], p[1], 1.1, 0.7, 0.5); });
          OUTER.forEach(function (p) { addUmpak(g, T, p[0], p[1], 0.8, 0.52, 0.4); });
          var padma = T.m.gold();
          var pg = new THREE.SphereGeometry(1, 10, 8);
          SAKA.forEach(function (p) {
            for (var i = 0; i < 8; i++) {
              var a = i / 8 * Math.PI * 2;
              var petal = new THREE.Mesh(pg, padma);
              petal.scale.set(0.13, 0.035, 0.055);
              petal.position.set(p[0] + Math.cos(a) * 0.27, 0.52, p[1] + Math.sin(a) * 0.27);
              petal.rotation.y = -a;
              g.add(petal);
            }
          });
        }
      },
      {
        key: 'saka', name: 'Soko guru', sub: 'Empat tiang utama',
        kicker: 'Bagian 3 · tiang', anchor: [1.85, 2.9, 1.85], cy: 2.7, base: FLOOR, ex: [0, 1.9, 0],
        paras: [
          'Empat tiang kayu menopang bagian tengah rumah, dan stabilitas struktur berpusat pada sistem soko guru. Bahannya umumnya kayu jati atau nangka.',
          'Keempat tiang ini melambangkan empat arah mata angin. Bagian tengahnya dikaitkan dengan konsep ketuhanan.',
          'Ukurannya beragam. Pada rumah di Sleman, soko guru dalem berukuran 15 × 15 cm dan soko guru pendopo 17,8 × 18,6 cm.'
        ],
        note: 'Catatan model: selain 4 soko guru ada 12 tiang tepi yang menggambarkan emper. Jumlah dan letaknya berbeda-beda; rumah di Sleman punya 6 saka emper.',
        src: ['ub', 'sin', 'jb', 'jc', 'it'],
        build: function (g, T) {
          SAKA.forEach(function (p) {
            g.add(T.box(0.5, 4.4, 0.5, T.m.wood('teak', false), p[0], 0.5 + 2.2, p[1]));
            g.add(T.box(0.66, 0.16, 0.66, T.m.gold(), p[0], 4.82, p[1]));
          });
          OUTER.forEach(function (p) { g.add(T.box(0.34, 2.6, 0.34, T.m.wood('teak', false), p[0], 0.4 + 1.3, p[1])); });
        }
      },
      {
        key: 'dinding', name: 'Dinding gebyok', sub: 'Pembatas ruang dalem',
        kicker: 'Bagian 4 · dinding', anchor: [0.6, 1.2, 1.9], cy: 1.5, base: FLOOR, ex: [0, 0, 0],
        paras: [
          'Dinding joglo berupa gebyok, yaitu dinding kayu semi permanen yang membatasi pringgitan dan dalem ageng. Ruang publik seperti pendopo justru memakai dinding terbuka atau tiang saja.',
          'Pada rumah Joglo di Sleman, bagian depan dalem berupa gebyok dengan tiga pasang pintu kupu tarung. Bingkai pintu dan gebyok sering berukir patran, motif daun yang tersusun berjajar.',
          'Pintu masuk dalem sengaja dibuat rendah sebagai penghormatan kepada pemilik rumah.'
        ],
        note: 'Catatan model: dinding samping dan belakang digambar polos, ukiran belum digambar. Lubang berjeruji di atas pintu mengikuti tebeng pada contoh Sleman.',
        src: ['ub', 'sin', 'jb', 'jc'],
        build: function (g, T, L) {
          var W = function () { return T.m.wood('teak', false); };
          var back = new THREE.Group(); g.add(back);
          back.add(T.box(2.5, 3.0, 0.2, W(), 0, 1.5, -1.5));
          T.spread(L, back, [0, 0, -3.4]);
          [-1, 1].forEach(function (s) {
            var side = new THREE.Group(); g.add(side);
            side.add(T.box(0.2, 3.0, 2.5, W(), s * 1.5, 1.5, 0));
            T.spread(L, side, [s * 3.4, 0, 0]);
          });
          var front = new THREE.Group(); g.add(front);
          front.add(T.box(2.5, 1.85, 0.12, T.m.plain(0x2b1a10), 0, 0.93, 1.5));
          for (var i = 0; i < 6; i++) front.add(T.box(0.38, 1.72, 0.1, T.m.wood('teak', false), -1.0 + 0.4 * i, 0.91, 1.58));
          [-0.8, 0, 0.8].forEach(function (x) { front.add(T.box(0.035, 1.72, 0.03, T.m.gold(), x, 0.91, 1.65)); });
          front.add(T.box(2.5, 0.14, 0.2, W(), 0, 1.92, 1.5));
          for (var s2 = 0; s2 < 8; s2++) front.add(T.box(0.14, 1.0, 0.14, W(), -1.1 + 0.314 * s2, 2.5, 1.5));
          front.add(T.box(2.5, 0.12, 0.2, W(), 0, 3.0, 1.5));
          T.spread(L, front, [0, 0, 3.4]);
          var sen = new THREE.Group(); g.add(sen);
          [-0.42, 0.42].forEach(function (x) { sen.add(T.box(0.1, 3.0, 1.0, W(), x, 1.5, -0.9)); });
          sen.add(T.box(0.78, 1.9, 0.1, W(), -0.84, 0.95, -0.4));
          sen.add(T.box(0.78, 1.9, 0.1, T.m.gold(), 0, 0.95, -0.4));
          sen.add(T.box(0.78, 1.9, 0.1, W(), 0.84, 0.95, -0.4));
          sen.add(T.box(2.5, 1.1, 0.1, W(), 0, 2.45, -0.4));
          T.spread(L, sen, [0, 0, -1.8]);
        }
      },
      {
        key: 'beams', name: 'Balok pengunci', sub: 'Blandar, pengerat, sunduk, kili',
        kicker: 'Bagian 5 · sambungan', anchor: [0, 5.1, 1.95], cy: 4.1, base: FLOOR, ex: [0, 4.4, 0],
        paras: [
          'Blandar, juga disebut pengerat, menopang tumpang sari. Sunduk dan kili membentuk sambungan kaku dengan soko guru.',
          'Struktur vertikal joglo dikelompokkan menjadi tiga bagian: atas (mala dan ander), tengah (tumpang sari, sunduk, kili, dan soko guru), serta bawah (umpak dan baturan).'
        ],
        note: 'Catatan model: balok digambar sebagai kerangka sederhana tanpa sambungan, dan posisi tiap balok tidak persis seperti rumah asli. Mala dan ander belum digambar.',
        src: ['ub'],
        build: function (g, T) {
          var B = function () { return T.m.wood('teak', true); };
          g.add(T.box(9.8, 0.36, 0.38, B(), 0, 3.18, -4.5));
          g.add(T.box(9.8, 0.36, 0.38, B(), 0, 3.18, 4.5));
          g.add(T.box(0.38, 0.36, 9.8, B(), -4.5, 3.54, 0));
          g.add(T.box(0.38, 0.36, 9.8, B(), 4.5, 3.54, 0));
          g.add(T.box(9.8, 0.36, 0.38, B(), 0, 3.18, -1.5));
          g.add(T.box(9.8, 0.36, 0.38, B(), 0, 3.18, 1.5));
          g.add(T.box(0.38, 0.36, 9.8, B(), -1.5, 3.54, 0));
          g.add(T.box(0.38, 0.36, 9.8, B(), 1.5, 3.54, 0));
          g.add(T.box(4.0, 0.34, 0.4, B(), 0, 4.2, -1.5));
          g.add(T.box(4.0, 0.34, 0.4, B(), 0, 4.2, 1.5));
          g.add(T.box(0.4, 0.34, 4.0, B(), -1.5, 4.56, 0));
          g.add(T.box(0.4, 0.34, 4.0, B(), 1.5, 4.56, 0));
          g.add(T.box(4.1, 0.36, 0.42, B(), 0, 5.08, -1.5));
          g.add(T.box(4.1, 0.36, 0.42, B(), 0, 5.08, 1.5));
          g.add(T.box(0.42, 0.36, 4.1, B(), -1.5, 5.44, 0));
          g.add(T.box(0.42, 0.36, 4.1, B(), 1.5, 5.44, 0));
        }
      },
      {
        key: 'tumpang', name: 'Tumpang sari', sub: 'Balok bertingkat di atas tiang',
        kicker: 'Bagian 6 · penopang atap', anchor: [2.35, 6.35, 2.35], cy: 6.3, base: FLOOR, ex: [0, 6.9, 0],
        paras: [
          'Tumpang sari adalah susunan balok kayu bertingkat yang disangga soko guru, dipasang di atas blandar dan berbentuk mengerucut.',
          'Tingkat-tingkatnya dimaknai sebagai tahapan syariat, tarekat, hakekat, dan makrifat.',
          'Tumpang sari menjadi pembeda utama joglo dari rumah limasan.'
        ],
        note: 'Catatan model: digambar enam tingkat, selang-seling kayu dan emas sebagai gambaran ornamen.',
        src: ['ub', 'sin', 'gn', 'jb'],
        build: function (g, T) {
          for (var k = 0; k < 6; k++) {
            var s = 3.4 + 0.2 * k, t = 0.34, hh = 0.2, y = 5.8 + k * 0.21;
            var mm = k % 2 === 0 ? function () { return T.m.wood('teak', false); } : function () { return T.m.gold(); };
            g.add(T.box(s, hh, t, mm(), 0, y, -(s / 2 - t / 2)));
            g.add(T.box(s, hh, t, mm(), 0, y, (s / 2 - t / 2)));
            g.add(T.box(t, hh, s - 2 * t, mm(), -(s / 2 - t / 2), y, 0));
            g.add(T.box(t, hh, s - 2 * t, mm(), (s / 2 - t / 2), y, 0));
          }
        }
      },
      {
        key: 'roof', name: 'Atap joglo', sub: 'Atap gunungan',
        kicker: 'Bagian 7 · penutup', anchor: [0, 6.9, 2.65], cy: 6.2, base: FLOOR, ex: [0, 11, 0],
        paras: [
          'Atap joglo berbentuk piramida bersisi empat yang disebut gunungan, melambangkan keselarasan dan keseimbangan. Dari bentuk inilah nama joglo berasal.',
          'Joglo adalah salah satu dari tiga jenis atap utama rumah Jawa, bersama limasan dan kampung, dan secara tradisional dikaitkan dengan kediaman bangsawan.',
          'Atap juga cara beradaptasi dengan iklim tropis. Pada rumah di Sleman, puncak atap pendopo diberi mustaka berbentuk garuda dan penutupnya genteng tanah liat.'
        ],
        note: 'Catatan model: puncak digambar sebagai bubungan pendek dengan mustaka sederhana.',
        src: ['it', 'sin', 'jc'],
        build: function (g, T) {
          var lower = new THREE.Mesh(T.frustum(6.2, 6.2, 4.6, 4.6, 1.6), T.m.roof('tile'));
          lower.position.y = 3.0; g.add(lower);
          var upper = new THREE.Mesh(T.frustum(4.6, 4.6, 1.8, 0.45, 4.6), T.m.roof('tile'));
          upper.position.y = 4.6; g.add(upper);
          g.add(T.box(4.2, 0.3, 1.2, T.m.plain(0x3d1b14), 0, 9.3, 0));
          g.add(T.cyl(0.03, 0.2, 0.9, 12, T.m.gold(), 0, 9.9, 0));
          var ball = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), T.m.gold());
          ball.position.set(0, 9.5, 0); g.add(ball);
        }
      },
      {
        key: 'dalem', space: true, n: 'D', name: 'Dalem', sub: 'Ruang keluarga di pusat rumah',
        kicker: 'Ruang · pusat rumah', anchor: [0, 0.2, 0.5], cy: 0.6, base: FLOOR, ex: [0, 0, 0],
        paras: [
          'Dalem (disebut juga omah njero) adalah ruang keluarga di pusat rumah dan bersifat privat. Pintu masuknya dibuat rendah sebagai penghormatan kepada pemilik rumah.',
          'Ruang yang dibentuk oleh empat soko guru disebut rong-rongan.',
          'Lantai dalem lebih tinggi daripada pendopo dan pringgitan.'
        ],
        note: 'Catatan model: bidang emas di lantai menandai dalem, dan kolom tipis muncul saat dipilih.',
        src: ['sin', 'ub', 'jb'],
        build: function (g, T, L) { T.zone(L, { y: 0.06, cells: [{ w: 2.4, d: 1.7, x: 0, z: 0.5 }], vol: [2.6, 4.4, 2.6, 0, 0] }); }
      },
      {
        key: 'senthong', space: true, n: 'S', name: 'Senthong', sub: 'Tiga ruang di bagian belakang',
        kicker: 'Ruang · bagian terdalam', anchor: [0, 0.2, -0.9], cy: 0.6, base: FLOOR, ex: [0, 0, 0],
        paras: [
          'Dalem ageng punya tiga senthong: kiwa (kiri), tengah, dan tengen (kanan).',
          'Senthong tengah, atau krobongan, paling dalam dan bersifat sakral. Ruang ini dipakai untuk pemujaan Dewi Sri dan meditasi.',
          'Senthong kiri dan kanan dipakai untuk kamar tidur serta menyimpan harta atau pusaka.'
        ],
        note: 'Catatan model: tiga senthong digambar sebagai tiga bilik di belakang dalem. Bilik tengah diberi warna lebih pekat.',
        src: ['sin', 'ub', 'jb', 'it'],
        build: function (g, T, L) {
          T.zone(L, { y: 0.06, cells: [
            { w: 0.78, d: 0.95, x: -0.84, z: -0.9, a: 0.14 },
            { w: 0.78, d: 0.95, x: 0, z: -0.9, a: 0.34 },
            { w: 0.78, d: 0.95, x: 0.84, z: -0.9, a: 0.14 }
          ] });
        }
      }
    ]
  });
})();
