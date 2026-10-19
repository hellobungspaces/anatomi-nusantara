/* ===== Rumah Betang (Dayak) ===== */
(function () {
  var THREE = App.T.THREE;
  var FY = 4.0;                       // tinggi lantai (kolong sampai 4 m)
  var PX = [-3, 0, 3];
  var PZ = []; for (var k = -12; k <= 12; k += 2) PZ.push(k);   // 13 baris tiang
  var DOORS = []; for (var d = 0; d < 8; d++) DOORS.push(-10.5 + 3 * d);
  function eave(t) { return 6.6 + 0.6 * t * t; }
  function ridge(t) { return eave(t) + 2.0 + 0.4 * t * t; }
  var CX = 0.8; // pusat atap (badan + serambi)

  App.register({
    id: 'betang', tab: 'Betang', place: 'Dayak, Kalimantan',
    kicker: 'Rumah Betang · rumah panjang Dayak', title: 'Satu atap untuk banyak keluarga',
    paras: [
      'Rumah Betang adalah rumah panggung panjang dari kayu ulin yang dihuni banyak keluarga di bawah satu atap.',
      'Rumah harus menghadap ke arah matahari terbit, yang melambangkan semangat kerja keras. Bagian hilir mengarah ke matahari terbenam.',
      'Model ini jauh lebih pendek dari betang asli. Sumber menyebut ukuran sekitar 150 m x 30 m, dengan 35 pintu pada betang Dayak Kanayat\'n.'
    ],
    note: 'Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Model dipendekkan menjadi 8 pintu agar muat di layar.',
    srcAll: ['ik', 'jn'],
    src: {
      ik: ['Indonesia Kaya: Rumah Betang Dayak Kanayat\'n', 'https://indonesiakaya.com/pustaka-indonesia/rumah-betang-jantung-tradisi-dan-identitas-dayak-kanayatn/'],
      jn: ['JNEWS Online: Rumah Betang', 'https://jnewsonline.com/rumah-betang-dayak/']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Ruang & akses',
    home: [30, 14, 26], ty: [5.0, 9.4], bd: 0.5, minD: 14, maxD: 110, ringR: 16,
    layers: [
      {
        key: 'tiang', name: 'Tiang ulin', sub: 'Rumah panggung tinggi',
        kicker: 'Bagian 1 · tiang', anchor: [3, 1.6, 12], cy: 1.8, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Tiang dibuat dari kayu ulin yang terkenal kuat dan tahan lama, dengan tinggi kolong hingga sekitar 4 meter. Tiang kayu disebut rata-rata setinggi 5 meter.',
          'Rumah yang ditinggikan melindungi penghuni dari musuh, binatang buas, dan banjir.'
        ],
        note: 'Catatan model: 3 baris tiang dengan 13 tiang tiap baris, jumlah aslinya tidak disebut sumber.',
        src: ['ik', 'jn'],
        build: function (g, T) {
          var W = T.m.wood('ulin', false);
          PX.forEach(function (x) { PZ.forEach(function (z) { g.add(T.cyl(0.24, 0.24, FY - 0.2, 12, W, x, (FY - 0.2) / 2, z)); }); });
          PX.forEach(function (x) { g.add(T.box(0.22, 0.22, 25.6, W, x, FY - 0.2, 0)); });
        }
      },
      {
        key: 'lantai', name: 'Lantai & serambi', sub: 'Serambi sepanjang rumah',
        kicker: 'Bagian 2 · lantai', anchor: [5.0, FY + 0.5, 0], cy: FY + 0.4, base: [0, 0, 0], ex: [0, 2.2, 0],
        paras: [
          'Lantai papan menutup bagian atas tiang. Di sisi depan ada serambi yang tidak disekat antar-pintu.',
          'Rumah dipakai bersama untuk keamanan, berbagi makanan, bekerja di ladang, dan berbagi suka-duka, dengan aturan adat.'
        ],
        note: 'Catatan model: pagar serambi adalah rekaan sederhana.',
        src: ['ik', 'jn'],
        build: function (g, T) {
          var P = T.m.wood('papan', true), W = T.m.wood('ulin', false);
          g.add(T.box(8.8, 0.2, 25.0, P, 0.8, FY + 0.1, 0));
          for (var i = -12; i <= 12; i += 2) g.add(T.box(0.1, 0.9, 0.1, W, 5.2, FY + 0.65, i));
          g.add(T.box(0.1, 0.1, 24.2, W, 5.2, FY + 1.1, 0));
        }
      },
      {
        key: 'dinding', name: 'Dinding & pintu', sub: 'Satu pintu untuk tiap keluarga',
        kicker: 'Bagian 3 · dinding', anchor: [3.5, FY + 1.4, 10.5], cy: FY + 1.4, base: [0, 0, 0], ex: [0, 2.2, 0],
        paras: [
          'Setiap keluarga punya bilik sendiri yang disekat dan berisi kamar. Pada betang Kanayat\'n, tiap pintu menampung 2 sampai 3 kepala keluarga.',
          'Atapnya pelana memanjang. Hanya ada satu betang di tiap desa, sementara betang Dayak lain biasanya tidak lebih dari lima unit.'
        ],
        note: 'Catatan model: 8 pintu dari 35 pada betang Kanayat\'n. Bentuk dan ukuran pintu tidak disebut sumber.',
        src: ['ik', 'jn'],
        build: function (g, T, L) {
          var W = function () { return T.m.wood('papan', false); };
          var h = 2.4, y = FY + 0.2 + h / 2;
          var back = T.box(0.14, h, 24.2, W(), -3.5, y, 0); g.add(back); T.spread(L, back, [-2.2, 0, 0]);
          var fr = new THREE.Group(); g.add(fr);
          var segs = [[-11.5, 1]]; for (var i = 0; i < 7; i++) segs.push([-9 + 3 * i, 2]); segs.push([11.5, 1]);
          segs.forEach(function (s) { fr.add(T.box(0.14, h, s[1], W(), 3.5, y, s[0])); });
          fr.add(T.box(0.14, 0.4, 24.2, W(), 3.5, FY + 0.2 + h - 0.2, 0));
          T.spread(L, fr, [2.2, 0, 0]);
          [-1, 1].forEach(function (s) {
            var e = T.box(7.2, h, 0.14, W(), 0, y, s * 12.1); g.add(e); T.spread(L, e, [0, 0, s * 2.2]);
          });
        }
      },
      {
        key: 'atap', name: 'Atap pelana', sub: 'Atap panjang',
        kicker: 'Bagian 4 · penutup', anchor: [CX, 8.4, 0], cy: 8.2, base: [0, 0, 0], ex: [0, 6.0, 0],
        paras: [
          'Atapnya pelana memanjang, menutup seluruh rumah dan serambi. Beberapa tipe betang beratap melengkung dengan ujung mengarah ke atas, mirip tanduk rusa.',
          'Rumah ini menjadi pusat budaya, tempat kegiatan sosial, budaya, dan pemerintahan adat berlangsung.'
        ],
        note: 'Catatan model: ujung atap hanya sedikit terangkat. Bahan penutup atap tidak disebut sumber, jadi digambar sebagai ijuk.',
        src: ['ik', 'jn'],
        build: function (g, T) {
          var geo = T.curveRoof({ L: 12.8, halfW: function () { return 4.7; }, eave: eave, ridge: ridge, nz: 40, nu: 12, rx: 3, ry: 14 });
          var r = new THREE.Mesh(geo, T.m.roof('ijuk')); r.position.x = CX; g.add(r);
        }
      },
      {
        key: 'hias', name: 'Hiasan enggang', sub: 'Kepala burung enggang',
        kicker: 'Bagian 5 · hiasan', anchor: [CX, 9.8, 12.6], cy: 9.4, base: [0, 0, 0], ex: [0, 6.0, 0],
        paras: [
          'Betang dihiasi patung, ukiran, dan lukisan yang bermakna dalam kepercayaan Dayak. Ukiran kepala burung enggang disebut sebagai simbol suku Dayak pada betang tipe Muara Mea.'
        ],
        note: 'Catatan model: kepala enggang digambar sederhana di kedua ujung bubungan. Letak hiasan asli bervariasi antar-betang.',
        src: ['jn', 'ik'],
        build: function (g, T) {
          [-1, 1].forEach(function (s) {
            var t = 0.97, r = ridge(t);
            var head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 14, 12), T.m.plain(0xb3261e, 0.6, false));
            head.position.set(CX, r + 0.5, s * 12.4); g.add(head);
            var beak = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.1, 10), T.m.plain(0xd9a62f, 0.6, false));
            beak.rotation.x = s * Math.PI / 2; beak.position.set(CX, r + 0.5, s * 13.1); g.add(beak);
          });
        }
      },
      {
        key: 'kolong', space: true, n: 'K', name: 'Kolong', sub: 'Penyimpanan hasil panen',
        kicker: 'Ruang · bawah rumah', anchor: [0, 0.6, 0], cy: 0.6, base: [0, 0, 0], ex: [0, 0, 0],
        paras: ['Ruang di bawah rumah dipakai menyimpan padi hasil panen.'],
        note: 'Catatan model: bidang emas menandai kolong.',
        src: ['ik'],
        build: function (g, T, L) { T.zone(L, { y: 0.05, cells: [{ w: 7.0, d: 24.0, x: 0, z: 0, a: 0.18 }] }); }
      },
      {
        key: 'bilik', space: true, n: 'B', name: 'Bilik keluarga', sub: 'Disekat dan berkamar',
        kicker: 'Ruang · dalam rumah', anchor: [-1.0, FY + 0.6, -10.5], cy: FY + 0.6, base: [0, 0, 0], ex: [0, 2.2, 0],
        paras: [
          'Tiap keluarga punya bilik sendiri yang disekat dan ada kamar di dalamnya.',
          'Dapur kecil, sekitar 1 x 2 m, hanya berisi tungku perapian dengan kayu bakar disimpan di atasnya.'
        ],
        note: 'Catatan model: 8 bilik sama besar. Ukuran dan susunan bilik asli tidak disebut sumber.',
        src: ['jn', 'ik'],
        build: function (g, T, L) {
          var cells = DOORS.map(function (z) { return { w: 3.2, d: 2.7, x: -1.7, z: z, a: 0.26 }; });
          T.zone(L, { y: FY + 0.22, cells: cells });
        }
      },
      {
        key: 'serambi', space: true, n: 'S', name: 'Serambi', sub: 'Teras di depan pintu',
        kicker: 'Ruang · depan', anchor: [4.4, FY + 0.5, 0], cy: FY + 0.5, base: [0, 0, 0], ex: [0, 2.2, 0],
        paras: ['Tiap pintu punya serambi sendiri, dan serambi-serambi itu tidak disekat satu sama lain.'],
        note: 'Catatan model: serambi digambar sebagai satu jalur panjang sepanjang rumah.',
        src: ['ik'],
        build: function (g, T, L) { T.zone(L, { y: FY + 0.22, cells: [{ w: 1.6, d: 23.6, x: 4.35, z: 0, a: 0.26 }] }); }
      },
      {
        key: 'tangga', space: true, n: 'T', name: 'Tangga batang', sub: 'Bisa diangkat tiap malam',
        kicker: 'Akses · serambi', anchor: [6.4, 1.9, 0], cy: 2.0, base: [0, 0, 0], ex: [0, 2.2, 0], selMove: [2.0, 0, 0],
        paras: [
          'Tangga dibuat dari batang kayu besar yang diberi lekuk agar mudah dinaiki. Jumlah anak tangga harus ganjil.',
          'Tangga diangkat ke dalam rumah setiap malam.'
        ],
        note: 'Catatan model: 7 lekuk. Jumlah anak tangga asli tidak disebut sumber.',
        src: ['ik', 'jn'],
        build: function (g, T) {
          var W = T.m.wood('ulin', false);
          g.add(T.strut([7.6, 0, 0], [5.0, FY, 0], 0.5, W));
          for (var i = 0; i < 7; i++) {
            var f = (i + 0.7) / 7.6;
            g.add(T.box(0.5, 0.1, 0.7, T.m.wood('nangka', false), 7.6 - 2.6 * f, FY * f + 0.25, 0));
          }
        }
      }
    ]
  });
})();
