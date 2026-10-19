/* ===== Rumah Bolon (Batak Toba) ===== */
(function () {
  var THREE = App.T.THREE;
  var FY = 1.9;            // tinggi lantai
  var PX = [-2.2, 0, 2.2];  // 3 baris x 6 = 18 tiang
  var PZ = [-4, -2.4, -0.8, 0.8, 2.4, 4];
  function eave(t) { return 4.4 + 1.3 * t * t; }
  function ridge(t) { return 6.2 + 2.1 * t * t; }
  var RZ = 0.4; // atap digeser ke depan: ujung depan lebih panjang
  function tAt(z) { return (z - RZ) / 5.2; }
  function carve(T, rx, ry) { var t = T.tex.carve('gorga').clone(); t.needsUpdate = true; t.repeat.set(rx, ry); return T.m.map(t); }

  App.register({
    id: 'bolon', tab: 'Rumah Bolon', place: 'Batak Toba',
    kicker: 'Rumah Bolon · rumah adat Batak Toba', title: 'Rumah berpunggung kerbau',
    paras: [
      'Rumah Bolon berdiri di atas tiang kayu yang bertumpu pada batu. Atapnya dari ijuk dan melengkung seperti punggung kerbau.',
      'Dinding rumah dibuat miring ke luar, dan bagian depannya dihiasi ukiran bernama gorga.',
      'Pada zaman dahulu, satu rumah bisa dihuni dua sampai enam keluarga.'
    ],
    note: 'Ketuk bagian di daftar, penanda bernomor, atau langsung pada model. Ukuran di model mengikuti angka dari sumber bila ada, sisanya perkiraan.',
    srcAll: ['rb', 'ks'],
    src: {
      rb: ['Ruang Arsitek: Rumah Bolon', 'https://ruangarsitek.com/rumah-adat-batak/'],
      ks: ['KabarSumut: Gorga dan Filosofi', 'https://kabarsumut.co.id/detail/46866/gorga-dan-filosofi-mengenal-lebih-dekat-rumah-adat-batak']
    },
    list1: 'Struktur, disusun dari bawah ke atas', list2: '',
    home: [15, 8, 17], ty: [4.0, 8.4], bd: 0.55, minD: 10, maxD: 70, ringR: 10.4,
    layers: [
      {
        key: 'ojahan', name: 'Batu ojahan', sub: 'Tumpuan berbentuk cincin',
        kicker: 'Bagian 1 · pondasi', anchor: [2.2, 0.3, 4], cy: 0.3, base: [0, 0, 0], ex: [0, 0, 0],
        paras: [
          'Pondasinya bertipe cincin: tiang kayu berdiri di atas batu yang disebut ojahan, tidak ditanam ke tanah.',
          'Susunan ini dinilai fleksibel dan tahan gempa.'
        ],
        note: 'Catatan model: satu batu untuk tiap tiang, bentuknya disederhanakan.',
        src: ['rb'],
        build: function (g, T) {
          PX.forEach(function (x) { PZ.forEach(function (z) { g.add(T.cyl(0.5, 0.58, 0.3, 14, T.m.stone(false), x, 0.15, z)); }); });
        }
      },
      {
        key: 'tiang', name: 'Tiang', sub: '18 tiang kayu',
        kicker: 'Bagian 2 · tiang', anchor: [-2.2, 1.1, 4], cy: 1.1, base: [0, 0, 0], ex: [0, 1.2, 0],
        paras: [
          'Tiang berdiameter sekitar 42 sampai 50 cm. Jumlahnya umumnya 18, yang dimaknai sebagai kekokohan dan kebersamaan.',
          'Tiang bertumpu di atas batu ojahan, bukan tertanam.'
        ],
        note: 'Catatan model: tiang digambar tegak dengan diameter 46 cm, 3 baris masing-masing 6 tiang.',
        src: ['rb'],
        build: function (g, T) {
          var W = T.m.wood('ulin', false);
          PX.forEach(function (x) { PZ.forEach(function (z) { g.add(T.cyl(0.23, 0.23, FY - 0.3, 14, W, x, 0.3 + (FY - 0.3) / 2, z)); }); });
          PX.forEach(function (x) { g.add(T.box(0.2, 0.2, 8.8, W, x, FY - 0.1, 0)); });
        }
      },
      {
        key: 'badan', name: 'Lantai & dinding', sub: 'Dunia tengah, dinding miring',
        kicker: 'Bagian 3 · badan rumah', anchor: [-2.9, 3.0, 0], cy: 3.0, base: [0, 0, 0], ex: [0, 2.6, 0],
        paras: [
          'Badan rumah adalah tempat memasak, tidur, dan bermain, dan disebut dunia tengah. Hiasan ipon-ipon dipasang sebagai penolak bala.',
          'Dinding dibuat miring agar angin mudah masuk ke dalam rumah.',
          'Dinding diikat dengan tali rotan dan ijuk (ret-ret) berpola cicak berkepala dua yang saling berlawanan arah. Polanya dimaknai sebagai penjaga rumah dan simbol saling menghormati penghuni.',
          'Pintu selebar 80 cm dan setinggi sekitar 1,5 m, dibuat menjorok ke dalam.'
        ],
        note: 'Catatan model: tali ret-ret digambar sebagai pita gelap polos, tanpa pola cicak. Tangga belum digambar karena sumber tidak menjelaskannya.',
        src: ['rb'],
        build: function (g, T, L) {
          var W = function () { return T.m.wood('papan', false); };
          var rope = T.m.plain(0x1d1511, 0.9, false);
          g.add(T.box(5.6, 0.18, 9.4, T.m.wood('papan', true), 0, FY + 0.09, 0));
          function wall(len, h) { // dinding berdiri dari y=0 lokal
            var grp = new THREE.Group();
            return grp;
          }
          [-1, 1].forEach(function (s) {
            var piv = new THREE.Group(); piv.position.set(s * 2.7, FY + 0.18, 0); piv.rotation.z = -s * 0.15;
            piv.add(T.box(0.14, 2.0, 9.0, W(), 0, 1.0, 0));
            piv.add(T.box(0.18, 0.12, 9.1, rope, 0, 1.0, 0));
            g.add(piv); T.spread(L, piv, [s * 2.0, 0, 0]);
          });
          // dinding belakang (z -)
          var back = new THREE.Group(); back.position.set(0, FY + 0.18, -4.5); back.rotation.x = -0.15;
          back.add(T.box(5.4, 2.0, 0.14, W(), 0, 1.0, 0)); back.add(T.box(5.5, 0.12, 0.18, rope, 0, 1.0, 0)); g.add(back);
          // dinding depan (z +) dengan pintu 0,8 x 1,5
          var fr = new THREE.Group(); fr.position.set(0, FY + 0.18, 4.5); fr.rotation.x = 0.15;
          fr.add(T.box(2.3, 2.0, 0.14, W(), -1.55, 1.0, 0));
          fr.add(T.box(2.3, 2.0, 0.14, W(), 1.55, 1.0, 0));
          fr.add(T.box(0.8, 0.5, 0.14, W(), 0, 1.75, 0));
          fr.add(T.box(5.5, 0.12, 0.18, rope, 0, 1.0, 0)); g.add(fr);
          // gable belakang polos
          var gb = T.gable(gpts(-4.6), 0.12, W()); gb.position.z = -4.6; g.add(gb);
        }
      },
      {
        key: 'gorga', name: 'Gorga', sub: 'Ukiran merah, putih, hitam',
        kicker: 'Bagian 4 · hiasan', anchor: [0, 6.2, 5.0], cy: 6.2, base: [0, 0, 0], ex: [0, 2.6, 1.2],
        paras: [
          'Gorga adalah ukiran di bagian depan rumah. Warna merah, hitam, dan putih membawa makna perlindungan, keseimbangan, dan kemakmuran.',
          'Motifnya mencakup tumbuhan, hewan, dan pola geometris: cicak (boraspati) melambangkan kemampuan beradaptasi, ular berkah bagi penghuni, kerbau rasa terima kasih, mata ni ari (matahari) sumber kehidupan, dan motif payudara kesuburan keluarga.',
          'Gorga ulu paung dipasang sebagai pelindung rumah.',
          'Rumah yang penuh hiasan disebut Ruma Gorga Sarimunggu, sedangkan yang tanpa hiasan disebut Jabu Batara Siang atau Jabu Ereng.'
        ],
        note: 'Catatan model: motif digambar sebagai bulatan merah, putih, dan hitam saja. Ulu paung digambar sebagai kepala sederhana dan bentuk aslinya tidak dijelaskan sumber.',
        src: ['ks', 'rb'],
        build: function (g, T) {
          var gb = T.gable(gpts(4.7), 0.14, carve(T, 0.35, 0.35)); gb.position.z = 4.72; g.add(gb);
          var pv = new THREE.Group(); pv.position.set(0, FY + 0.18, 4.62); pv.rotation.x = 0.15;
          pv.add(T.box(2.0, 1.3, 0.08, carve(T, 2, 2), -1.55, 0.95, 0.1));
          pv.add(T.box(2.0, 1.3, 0.08, carve(T, 2, 2), 1.55, 0.95, 0.1));
          pv.add(T.box(5.4, 0.3, 0.08, carve(T, 6, 1), 0, 1.85, 0.1));
          g.add(pv);
          var ivory = T.m.plain(0x1d1511, 0.7, true);
          var head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 14, 12), T.m.plain(0xb3261e, 0.6, false));
          head.position.set(0, 4.65, 4.9); g.add(head);
          [-1, 1].forEach(function (s) {
            var h = T.tube([[0, 0, 0], [s * 0.25, 0.25, 0], [s * 0.45, 0.7, 0]], 0.08, 0.02, ivory, 8, 12);
            h.position.set(s * 0.15, 4.85, 4.9); g.add(h);
          });
        }
      },
      {
        key: 'atap', name: 'Atap ijuk', sub: 'Atap melengkung',
        kicker: 'Bagian 5 · penutup', anchor: [0, 7.4, 0], cy: 7.2, base: [0, 0, 0], ex: [0, 6.2, 0],
        paras: [
          'Atap dari ijuk berbentuk melengkung dan disebut menyerupai punggung kerbau. Bentuk melengkung ini dinilai aerodinamis terhadap angin dari danau.',
          'Ujung depan dibuat lebih panjang daripada ujung belakang, dimaknai sebagai doa agar keturunan pemilik rumah memiliki masa depan yang baik.',
          'Bagian dalam atap sering dipakai menyimpan barang pusaka atau keramat.'
        ],
        note: 'Catatan model: lengkung atap hanya perkiraan bentuk.',
        src: ['rb'],
        build: function (g, T) {
          var geo = T.curveRoof({ L: 5.2, halfW: function () { return 3.3; }, eave: eave, ridge: ridge, nz: 36, nu: 14, rx: 4, ry: 8 });
          var r = new THREE.Mesh(geo, T.m.roof('ijuk')); r.position.z = RZ; g.add(r);
        }
      }
    ]
  });

  function gpts(z) {
    var t = tAt(z), e = eave(t), r = ridge(t);
    return [[-3.0, FY + 2.05], [3.0, FY + 2.05], [3.3, e], [0, r], [-3.3, e]];
  }
})();
