/* ===== Omo Sebua (Nias) ===== */
(function () {
  var THREE = App.T.THREE;
  var PX = [-2.7, -0.9, 0.9, 2.7];
  var PZ = [-4.5, -1.5, 1.5, 4.5];

  App.register({
    id: 'omo', tab: 'Omo Sebua', place: 'Nias',
    kicker: 'Omo Sebua · rumah adat Nias', title: 'Rumah panggung tanpa paku',
    paras: [
      'Omo Sebua dibangun untuk kepala desa dan berdiri di pusat desa. Tingginya bisa mencapai 16 meter, dengan atap yang menjulang.',
      'Rumah adat Nias dibangun tanpa paku dan bertumpu di atas lempengan batu, tanpa tiang yang ditanam ke tanah. Kombinasi ini dikaitkan dengan ketahanannya terhadap gempa.',
      'Dahulu rumah ini juga berfungsi sebagai tempat pertahanan saat perang. Pembangunannya memakan waktu hingga empat tahun dan hanya dikerjakan oleh para ahli.'
    ],
    note: 'Tekan Simulasi gempa untuk melihat gambaran geraknya. Itu ilustrasi untuk membantu membayangkan, bukan simulasi teknik. Ketuk bagian di daftar atau pada model untuk membaca detailnya.',
    srcAll: ['sl', 'dt', 'np'],
    src: {
      sl: ['Selasar: Rumah adat Nias', 'https://www.selasar.com/rumah-adat/nias/'],
      dt: ['detikTravel: Rumah adat Nias tahan gempa', 'https://travel.detik.com/travel-news/d-7093247/rahasia-di-balik-rumah-adat-nias-yang-tahan-gempa'],
      np: ['Nawacita Post: Omo Hada', 'https://www.nawacitapost.com/nasional/27352953/mengungkap-rahasia-omo-hada-rumah-tradisional-di-nias-pulau-impian-yang-tahan-gempa']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: 'Akses',
    quake: true,
    home: [15, 8, 19], ty: [6.2, 11.2], bd: 0.62, minD: 10, maxD: 70, ringR: 10.4,
    layers: [
      {
        key: 'batu', name: 'Lempeng batu', sub: 'Alas tiang yang tidak tertanam',
        kicker: 'Bagian 1 · dasar', anchor: [3.5, 0.3, 5.4], cy: 0.25, base: [0, 0, 0], ex: [0, 0, 0], q: { x: 1 },
        paras: [
          'Tiang rumah adat Nias tidak dipancang ke dalam tanah. Semuanya berdiri di atas lempengan batu.',
          'Lempengan batu itu menjadi alas tiang vertikal maupun diagonal, dan menambah kestabilan rumah.'
        ],
        note: 'Catatan model: 16 lempeng polos. Ukuran dan bentuk batu asli tidak disebut dalam sumber.',
        src: ['dt', 'np', 'sl'],
        build: function (g, T) {
          var i = 0;
          PX.forEach(function (x) { PZ.forEach(function (z) {
            var m = T.box(1.0, 0.25, 1.0, T.m.stone(i % 2 === 0), x, 0.125, z);
            m.rotation.y = ((i * 37) % 7 - 3) * 0.03; i++; g.add(m);
          }); });
        }
      },
      {
        key: 'tiang', name: 'Tiang & ndriwa', sub: 'Penyokong diagonal di bawah rumah',
        kicker: 'Bagian 2 · penopang', anchor: [3.1, 1.8, 4.9], cy: 1.9, base: [0, 0, 0], ex: [0, 1.0, 0], q: { x: 1, rz: 0.048 },
        paras: [
          'Ndriwa adalah penyokong diagonal yang dipasang di antara tiang-tiang vertikal di bawah rumah. Sumber menyebutnya fitur utama penahan gempa.',
          'Kombinasi ndriwa dan tiang di atas lempengan batu membuat struktur kuat sekaligus fleksibel, sehingga mampu menahan getaran gempa.',
          'Omo Sebua berdiri di atas tiang kayu ulin yang besar. Di Nias Selatan, jumlah tiang deret depan genap, yaitu 4 atau 6.'
        ],
        note: 'Catatan model: 16 tiang dalam 4 deret, dengan penyokong diagonal ke empat arah. Jumlah dan sudut ndriwa asli tidak disebut dalam sumber.',
        src: ['dt', 'sl', 'np'],
        build: function (g, T) {
          var U = function () { return T.m.wood('ulin', false); };
          PX.forEach(function (x) { PZ.forEach(function (z) { g.add(T.box(0.5, 2.95, 0.5, U(), x, 0.25 + 1.475, z)); }); });
          PX.forEach(function (x) { g.add(T.box(0.3, 0.3, 10.8, T.m.wood('ulin', true), x, 3.3, 0)); });
          PZ.forEach(function (z) { g.add(T.box(6.2, 0.3, 0.3, T.m.wood('ulin', true), 0, 3.0, z)); });
          var i;
          [PZ[0], PZ[3]].forEach(function (z) {
            for (i = 0; i < 3; i++) {
              g.add(T.strut([PX[i], 0.4, z], [PX[i + 1], 2.85, z], 0.2, U()));
              g.add(T.strut([PX[i + 1], 0.4, z], [PX[i], 2.85, z], 0.2, U()));
            }
          });
          [PX[0], PX[3]].forEach(function (x) {
            for (i = 0; i < 3; i++) {
              g.add(T.strut([x, 0.4, PZ[i]], [x, 2.85, PZ[i + 1]], 0.2, U()));
              g.add(T.strut([x, 0.4, PZ[i + 1]], [x, 2.85, PZ[i]], 0.2, U()));
            }
          });
        }
      },
      {
        key: 'lantai', name: 'Lantai & dinding', sub: 'Dinding condong ke luar',
        kicker: 'Bagian 3 · badan rumah', anchor: [3.8, 4.9, 4.6], cy: 4.9, base: [0, 0, 0], ex: [0, 2.4, 0], q: { x: 0.25 },
        paras: [
          'Rumah dibuat tinggi dan condong ke luar sebagai bagian dari rancangan pertahanan.',
          'Di Nias Selatan, hanya rumah bangsawan yang punya ukiran rumit pada panel dindingnya. Tengkorak babi dipasang sebagai dekorasi Omo Sebua hingga kini.',
          'Ruang besar berada di depan, dan kamar tidur kecil di belakang.'
        ],
        note: 'Catatan model: ukiran digambar sebagai pola geometris, tengkorak babi sebagai bola kecil, dan pembagian ruang dalam belum digambar.',
        src: ['sl', 'dt'],
        build: function (g, T) {
          g.add(T.box(7.2, 0.3, 11.0, T.m.wood('ulin', true), 0, 3.6, 0));
          var cm = T.tex.carve('nias').clone(); cm.needsUpdate = true; cm.repeat.set(3.5, 1.2);
          var front = new THREE.Group(); front.position.set(0, 3.75, 5.4); front.rotation.x = 0.08; g.add(front);
          front.add(T.box(7.0, 2.4, 0.2, T.m.map(cm), 0, 1.2, 0));
          front.add(T.box(0.9, 1.7, 0.06, T.m.plain(0x1b120a), 0, 0.95, 0.12));
          var sk = new THREE.SphereGeometry(0.17, 10, 8);
          for (var i = 0; i < 6; i++) {
            var s = new THREE.Mesh(sk, T.m.plain(0xe9e1cc, 0.7));
            s.scale.set(1, 0.85, 1.1); s.position.set(-2.5 + i * 1.0, 2.05, 0.2);
            if (Math.abs(-2.5 + i) < 0.5) s.position.x += 0; front.add(s);
          }
          var back = new THREE.Group(); back.position.set(0, 3.75, -5.4); back.rotation.x = -0.08; g.add(back);
          back.add(T.box(7.0, 2.4, 0.2, T.m.wood('ulin', false), 0, 1.2, 0));
          [-1, 1].forEach(function (sx) {
            var side = new THREE.Group(); side.position.set(sx * 3.5, 3.75, 0); side.rotation.z = -sx * 0.08; g.add(side);
            side.add(T.box(0.2, 2.4, 10.8, T.m.wood('ulin', false), 0, 1.2, 0));
          });
        }
      },
      {
        key: 'rangka', name: 'Rangka atap', sub: 'Balok vertikal dan diagonal',
        kicker: 'Bagian 4 · rangka', anchor: [0, 9.0, 3.0], cy: 9.0, base: [0, 0, 0], ex: [0, 3.2, 0], q: { x: 0.25 },
        paras: [
          'Omo Sebua tidak punya plafon dalam. Balok vertikal dan diagonal menahan atap, dan ruang di antaranya dipakai untuk menyimpan peralatan rumah tangga.',
          'Seluruh bahan bangunan adalah kayu yang disambung tanpa paku.'
        ],
        note: 'Catatan model: rangka digambar sederhana. Detail sambungan kayu asli tidak disebut dalam sumber.',
        src: ['sl', 'dt'],
        build: function (g, T) {
          var U = function () { return T.m.wood('ulin', true); };
          [-5.4, 5.4].forEach(function (z) { g.add(T.box(7.4, 0.3, 0.3, U(), 0, 6.2, z)); });
          [-3.5, 3.5].forEach(function (x) { g.add(T.box(0.3, 0.3, 11.0, U(), x, 6.2, 0)); });
          [-2.6, 2.6].forEach(function (z) { g.add(T.box(0.3, 5.8, 0.3, T.m.wood('ulin', false), 0, 9.1, z)); });
          g.add(T.box(0.3, 0.3, 5.8, U(), 0, 12.1, 0));
          [-5.4, 5.4].forEach(function (z) { [-3.5, 3.5].forEach(function (x) { g.add(T.strut([x, 6.2, z], [0, 12.1, z > 0 ? 2.9 : -2.9], 0.22, U())); }); });
          [-3.5, 3.5].forEach(function (x) { g.add(T.strut([x, 6.2, 0], [0, 12.1, 0], 0.22, U())); });
          [-2.6, 2.6].forEach(function (z) { [-3.5, 3.5].forEach(function (x) { g.add(T.strut([x, 6.2, z], [0, 9.0, z], 0.18, U())); }); });
        }
      },
      {
        key: 'atap', name: 'Atap rumbia', sub: 'Atap yang menjulang',
        kicker: 'Bagian 5 · penutup', anchor: [0, 10.0, 4.6], cy: 9.3, base: [0, 0, 0], ex: [0, 9.6, 0], q: { x: 0.25 },
        paras: [
          'Atap Omo Sebua menjulang tinggi dan dilapisi daun rumbia.',
          'Ada bukaan ventilasi di bagian atap depan.',
          'Bagian depan yang melengkung disebut ewe atau sikholi di Nias Selatan.'
        ],
        note: 'Catatan model: bentuk atap disederhanakan, dan lengkung ewe belum digambar.',
        src: ['sl', 'dt'],
        build: function (g, T) {
          var roof = new THREE.Mesh(T.frustum(4.6, 6.6, 0.3, 3.0, 6.8), T.m.roof('rumbia'));
          roof.position.y = 5.9; g.add(roof);
          g.add(T.box(0.5, 0.3, 6.3, T.m.plain(0x3a2a14), 0, 12.8, 0));
          var vent = T.box(1.6, 0.9, 0.1, T.m.plain(0x1b120a), 0, 10.2, 4.38);
          vent.rotation.x = -0.49; g.add(vent);
        }
      },
      {
        key: 'tangga', space: true, n: 'T', name: 'Tangga', sub: 'Satu-satunya jalan masuk',
        kicker: 'Akses · pertahanan', anchor: [0, 2.4, 7.0], cy: 2.4, base: [0, 0, 0], ex: [0, 0.8, 3.2], q: { x: 0.6 }, selMove: [0, 0, 2.2],
        paras: [
          'Tangga sempit menjadi satu-satunya akses masuk ke Omo Sebua.',
          'Tangganya dapat digeser, bagian dari rancangan pertahanan rumah. Pilih bagian ini untuk melihat tangga bergeser.'
        ],
        note: 'Catatan model: jumlah anak tangga dan sudutnya hanya gambaran.',
        src: ['sl'],
        build: function (g, T) {
          var U = function () { return T.m.wood('ulin', false); };
          [-0.42, 0.42].forEach(function (x) { g.add(T.strut([x, 0.15, 7.9], [x, 3.75, 5.6], 0.14, U())); });
          for (var i = 0; i < 9; i++) {
            var t = (i + 0.5) / 9;
            g.add(T.box(0.9, 0.1, 0.34, U(), 0, 0.15 + 3.6 * t, 7.9 - 2.3 * t));
          }
        }
      }
    ]
  });
})();
