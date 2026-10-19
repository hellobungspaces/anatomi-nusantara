/* ===== Tongkonan (Toraja) ===== */
(function () {
  var THREE = App.T.THREE;
  var Z0 = 4.5; // geser seluruh rumah agar rumah dan alang berimbang di tengah
  var BASE = [0, 0, Z0];
  var PCOLS = [-1.8, 0, 1.8];
  var PROWS = [-3.6, -1.8, 0, 1.8, 3.6];
  function eave(t) { return 5.0 + 2.2 * t * t; }
  function ridge(t) { return eave(t) + 1.5 + 1.3 * t * t; }

  function carveMat(T, rx, ry) {
    var t = T.tex.carve('toraja').clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
    return T.m.map(t);
  }

  App.register({
    id: 'tongkonan', tab: 'Tongkonan', place: 'Toraja',
    kicker: 'Tongkonan · rumah adat Toraja', title: 'Rumah beratap perahu',
    paras: [
      'Tongkonan adalah rumah panggung kayu dengan atap melengkung seperti perahu telungkup. Lengkungnya juga disebut mirip tanduk kerbau.',
      'Rumah terdiri dari tiga bagian: ulu banua (atap), kalle banua (badan), dan sulluk banua (kaki).',
      'Tongkonan menghadap utara. Di seberang halaman berdiri alang, lumbung padi yang menghadap selatan.'
    ],
    note: 'Seluruh rumah dibangun di atas satu sumbu utara-selatan. Ketuk bagian di daftar, penanda bernomor, atau langsung pada model.',
    srcAll: ['bi', 'mn', 'km', 'uj'],
    src: {
      bi: ['Budaya-Indonesia.org: Tongkonan', 'https://budaya-indonesia.org/4-Tongkonan'],
      mn: ['Museum Nasional: Rumah Adat Tongkonan', 'https://museumnasional.iheritage-virtual.id/collection/detail/55'],
      km: ['Kumparan: Makna simbolik rumah adat Toraja', 'https://kumparan.com/hendro-ari-gunawan/makna-simbolik-pada-rumah-adat-toraja-dari-setiap-bagiannya-26KAuy9YmJy'],
      uj: ['Universitas Jember: Rumah Tongkonan', 'https://tamankebangsaan.unej.ac.id/rto']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Ruang & pasangan rumah',
    home: [16, 9, -20], ty: [5.0, 8.8], bd: 0.55, minD: 10, maxD: 80, ringR: 13,
    layers: [
      {
        key: 'kaki', name: 'Kaki (sulluk banua)', sub: 'Pondasi batu dan kolong',
        kicker: 'Bagian 1 · kaki', anchor: [2.6, 1.2, 3.6], cy: 1.3, base: BASE, ex: [0, 0, 0],
        paras: [
          'Tongkonan berdiri di atas pondasi batu. Bagian kakinya disebut sulluk banua.',
          'Kolong biasanya dipakai sebagai kandang kerbau atau babi dan tidak punya fungsi religius.'
        ],
        note: 'Catatan model: 15 tiang di atas 15 batu. Jumlah dan ukuran tiang asli tidak disebut dalam sumber.',
        src: ['bi', 'mn'],
        build: function (g, T) {
          PCOLS.forEach(function (x) { PROWS.forEach(function (z) {
            g.add(T.box(0.8, 0.35, 0.8, T.m.stone(false), x, 0.175, z));
            g.add(T.box(0.36, 2.05, 0.36, T.m.wood('nangka', false), x, 0.35 + 1.025, z));
          }); });
        }
      },
      {
        key: 'badan', name: 'Lantai & badan (kalle banua)', sub: 'Rumah panggung kayu',
        kicker: 'Bagian 2 · badan rumah', anchor: [2.5, 3.8, 3.0], cy: 3.8, base: BASE, ex: [0, 1.6, 0],
        paras: [
          'Badan rumah disebut kalle banua. Seluruh rumah berkonstruksi rangka kayu dan berdenah persegi.',
          'Ruang di dalamnya berderet dari utara ke selatan: tangalok, sali, dan sumbung.',
          'Pembangunannya biasanya dibantu keluarga besar, dan rumah dihuni seluruh keturunan kerabat pembangunnya.'
        ],
        note: 'Catatan model: dinding digambar polos. Jendela dan pintu belum digambar.',
        src: ['bi', 'uj', 'mn'],
        build: function (g, T) {
          var W = function () { return T.m.wood('nangka', false); };
          g.add(T.box(4.8, 0.3, 8.6, T.m.wood('nangka', true), 0, 2.55, 0));
          g.add(T.box(4.6, 2.2, 0.2, W(), 0, 3.8, -4.2));
          g.add(T.box(4.6, 2.2, 0.2, W(), 0, 3.8, 4.2));
          g.add(T.box(0.2, 2.2, 8.4, W(), -2.3, 3.8, 0));
          g.add(T.box(0.2, 2.2, 8.4, W(), 2.3, 3.8, 0));
        }
      },
      {
        key: 'ukiran', name: 'Ukiran', sub: 'Motif dan warna Toraja',
        kicker: 'Bagian 3 · hiasan', anchor: [2.5, 4.4, -2.5], cy: 4.4, base: BASE, ex: [0, 1.6, 0],
        paras: [
          'Menurut J.S. Sande, ada sekitar 67 motif ukiran Toraja.',
          'Warna dominannya merah, kuning, putih, dan hitam. Merah, kuning, dan putih berasal dari tanah liat litak, sedangkan hitam dari jelaga.',
          'Ukiran menggambarkan kepercayaan dan adat Toraja. Tidak semua rumah berukir, dan motif tertentu mengikuti aturan adat.'
        ],
        note: 'Catatan model: motif digambar geometris sebagai gambaran warna. Belum meniru motif tertentu.',
        src: ['uj', 'bi', 'km', 'mn'],
        build: function (g, T, L) {
          [-1, 1].forEach(function (s) {
            var side = new THREE.Group(); g.add(side);
            side.add(T.box(0.06, 2.0, 7.8, carveMat(T, 3, 1), s * 2.43, 3.8, 0));
            T.spread(L, side, [s * 1.8, 0, 0]);
            var gab = T.gable([[-2.3, 4.9], [2.3, 4.9], [2.3, 6.76], [0, 8.47], [-2.3, 6.76]], 0.12, carveMat(T, 0.3, 0.3));
            gab.position.z = s * 4.2; g.add(gab);
            T.spread(L, gab, [0, 0, s * 1.8]);
          });
        }
      },
      {
        key: 'tanduk', name: 'Tiang depan & tanduk', sub: 'Tulak somba',
        kicker: 'Bagian 4 · penanda status', anchor: [0.9, 6.4, -5.4], cy: 6.4, base: BASE, ex: [0, 0, -2.6],
        paras: [
          'Tiang penyangga atap di depan rumah disebut tulak somba. Susunan tanduk kerbau digantung padanya.',
          'Tanduk berasal dari upacara Rambu Solo, upacara kematian. Semakin banyak tanduk, semakin tinggi status sosial pemilik.',
          'Rahang hewan kurban juga dipasang: rahang kerbau di sisi kiri dan rahang babi di sisi kanan.'
        ],
        note: 'Catatan model: enam pasang tanduk digambar sebagai hiasan, rahang belum digambar. Jumlah tanduk asli mengikuti riwayat upacara pemiliknya.',
        src: ['mn', 'uj', 'km'],
        build: function (g, T) {
          g.add(T.box(0.5, 0.3, 0.5, T.m.stone(false), 0, 0.15, -5.2));
          g.add(T.box(0.42, 9.2, 0.42, T.m.wood('nangka', false), 0, 4.75, -5.2));
          var ivory = T.m.plain(0xe9e1cc, 0.6, true);
          for (var i = 0; i < 6; i++) {
            var y = 4.3 + i * 0.85;
            [1, -1].forEach(function (s) {
              var h = T.tube([[s * 0.2, 0, 0], [s * 0.55, 0.12, 0], [s * 0.9, 0.4, 0], [s * 1.0, 0.8, 0]], 0.1, 0.02, ivory, 8, 14);
              h.position.set(0, y, -5.45); g.add(h);
            });
          }
        }
      },
      {
        key: 'atap', name: 'Atap perahu (ulu banua)', sub: 'Atap melengkung ke atas',
        kicker: 'Bagian 5 · penutup', anchor: [0, 6.8, 0], cy: 7.0, base: BASE, ex: [0, 3.6, 0],
        paras: [
          'Atap Tongkonan melengkung seperti perahu terbalik dan melambangkan kekuatan dan keberanian. Ujungnya yang meruncing ke atas dikaitkan dengan hubungan manusia dengan dunia leluhur.',
          'Atap dianggap bagian paling suci karena melambangkan dunia atas.',
          'Atap tersusun dari bilah bambu bertumpuk dengan lapisan atas ijuk, rumbia, alang-alang, atau seng.'
        ],
        note: 'Catatan model: atap digambar sebagai satu lengkung ijuk tanpa lapisan bilah bambu.',
        src: ['km', 'mn', 'uj', 'bi'],
        build: function (g, T) {
          var geo = T.curveRoof({ L: 5.6, halfW: function () { return 3.0; }, eave: eave, ridge: ridge, nz: 36, nu: 14, rx: 3, ry: 6 });
          g.add(new THREE.Mesh(geo, T.m.roof('ijuk')));
        }
      },
      {
        key: 'tangalok', space: true, n: 'U', name: 'Tangalok', sub: 'Ruang di sisi utara',
        kicker: 'Ruang · utara', anchor: [0, 2.9, -2.75], cy: 2.9, base: BASE, ex: [0, 1.6, 0],
        paras: [
          'Tangalok berada di sisi utara, yaitu bagian depan rumah. Ruang ini dipakai sebagai ruang tamu, kamar anak, dan tempat sesaji.'
        ],
        note: 'Catatan model: bidang emas di lantai menandai tiap ruang. Sekat ruang asli belum digambar.',
        src: ['bi', 'km'],
        build: function (g, T, L) { T.zone(L, { y: 2.76, cells: [{ w: 4.0, d: 2.5, x: 0, z: -2.75, a: 0.26 }] }); }
      },
      {
        key: 'sali', space: true, n: 'T', name: 'Sali', sub: 'Ruang tengah keluarga',
        kicker: 'Ruang · tengah', anchor: [0, 2.9, 0], cy: 2.9, base: BASE, ex: [0, 1.6, 0],
        paras: [
          'Sali berada di tengah. Ruang ini dipakai sebagai ruang keluarga, dapur, ruang makan, dan tempat musyawarah keluarga.',
          'Di sini pula jenazah diletakkan sebelum upacara penguburan.'
        ],
        note: 'Catatan model: bidang emas di lantai menandai tiap ruang. Sekat ruang asli belum digambar.',
        src: ['bi', 'km', 'mn'],
        build: function (g, T, L) { T.zone(L, { y: 2.76, cells: [{ w: 4.0, d: 2.8, x: 0, z: 0, a: 0.26 }] }); }
      },
      {
        key: 'sumbung', space: true, n: 'S', name: 'Sumbung', sub: 'Ruang kepala keluarga',
        kicker: 'Ruang · selatan', anchor: [0, 2.9, 2.75], cy: 2.9, base: BASE, ex: [0, 1.6, 0],
        paras: [
          'Sumbung berada di sisi selatan dan menjadi ruang khusus kepala keluarga. Ruang ini dipercaya sebagai sumber penyakit.'
        ],
        note: 'Catatan model: bidang emas di lantai menandai tiap ruang. Sekat ruang asli belum digambar.',
        src: ['bi', 'km'],
        build: function (g, T, L) { T.zone(L, { y: 2.76, cells: [{ w: 4.0, d: 2.5, x: 0, z: 2.75, a: 0.26 }] }); }
      },
      {
        key: 'alang', space: true, n: 'A', name: 'Alang', sub: 'Lumbung padi di seberang halaman',
        kicker: 'Pasangan rumah · utara halaman', anchor: [0, 5.0, -12], cy: 3.6, base: BASE, ex: [0, 0, 0],
        paras: [
          'Alang adalah lumbung padi berukir yang berdiri di depan rumah. Tongkonan dianggap ibu, dan alang dianggap bapak.',
          'Tongkonan menghadap utara dan alang menghadap selatan, saling berhadapan. Halaman memanjang di antaranya disebut uluba\'bah.',
          'Jumlah dan ukuran alang menunjukkan status kekayaan pemilik.'
        ],
        note: 'Catatan model: alang digambar sebagai satu lumbung kecil. Bentuk dan jumlah aslinya bisa berbeda.',
        src: ['bi', 'km', 'uj'],
        build: function (g, T) {
          [-0.8, 0.8].forEach(function (x) { [-1.6, 1.6].forEach(function (z) {
            g.add(T.cyl(0.2, 0.24, 2.4, 14, T.m.wood('nangka', false), x, 1.2, -12 + z));
          }); });
          g.add(T.box(2.4, 0.25, 4.6, T.m.wood('nangka', true), 0, 2.52, -12));
          g.add(T.box(2.2, 1.3, 4.2, carveMat(T, 2, 1), 0, 3.3, -12));
          var geo = T.curveRoof({ L: 2.9, halfW: function () { return 1.6; }, eave: function (t) { return 4.2 + 1.2 * t * t; }, ridge: function (t) { return 4.2 + 1.2 * t * t + 0.9 + 0.7 * t * t; }, nz: 24, nu: 10, rx: 2, ry: 3 });
          var r = new THREE.Mesh(geo, T.m.roof('ijuk')); r.position.z = -12; g.add(r);
        }
      }
    ]
  });
})();
