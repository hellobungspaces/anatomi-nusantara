var App = (function () {
  'use strict';
  var THREE = window.THREE;
  var $ = function (s) { return document.querySelector(s); };
  var houses = {}, order = [], cur = null;
  var stage = $('#stage'), canvas = $('#gl'), hsBox = $('#hotspots'), card = $('#card');
  var list1 = $('#layers'), list2 = $('#spaces'), list1H = $('#h1'), list2H = $('#h2'), box2 = $('#box2');
  var tabsEl = $('#tabs'), readout = $('#readout'), hint = $('#hint');
  var exRange = $('#ex'), toggleBtn = $('#toggle'), spin = $('#spin'), resetBtn = $('#reset'), quakeBtn = $('#quake');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     Toolkit: tekstur, material, geometri (dipakai tiap rumah)
     ========================================================= */
  var T = { THREE: THREE, m: {}, tex: {} };
  var cache = {};
  function canvasTex(w, h, draw, rx, ry) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    if (rx) t.repeat.set(rx, ry || rx);
    t.anisotropy = 4;
    return t;
  }
  var WOODS = {
    teak: ['#8c4d24', '#4a2410', '#b9703a'],
    ulin: ['#5b3d26', '#26150b', '#8a6240'],
    nangka: ['#9a6a2e', '#5b3a14', '#c79a55'],
    papan: ['#7b4b2a', '#3b200f', '#a8703f'],
    merah: ['#7c3322', '#38150c', '#a85a38']
  };
  T.tex.wood = function (kind, horiz) {
    var key = 'w' + kind + (horiz ? 'h' : 'v');
    if (cache[key]) return cache[key];
    var c = WOODS[kind];
    var t = canvasTex(128, 128, function (g, w, h) {
      g.fillStyle = c[0]; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 80; i++) {
        var x = Math.random() * w;
        g.strokeStyle = Math.random() > 0.5 ? c[1] : c[2];
        g.globalAlpha = 0.1 + Math.random() * 0.14;
        g.lineWidth = 0.6 + Math.random() * 1.8;
        g.beginPath(); g.moveTo(x, 0); g.bezierCurveTo(x + 5, h * 0.3, x - 5, h * 0.7, x + 2, h); g.stroke();
      }
    });
    if (horiz) { t.center.set(0.5, 0.5); t.rotation = Math.PI / 2; }
    cache[key] = t; return t;
  };
  T.tex.stone = function (light) {
    var key = 's' + (light ? 1 : 0);
    if (cache[key]) return cache[key];
    var base = light ? '#a3aaa0' : '#7d877f';
    var t = canvasTex(128, 128, function (g, w, h) {
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 700; i++) {
        g.globalAlpha = 0.12 + Math.random() * 0.2;
        g.fillStyle = Math.random() > 0.5 ? '#4f5953' : '#c4cbc2';
        g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2.5, 1 + Math.random() * 2.5);
      }
    });
    cache[key] = t; return t;
  };
  T.tex.tile = function (rx, ry) {
    return canvasTex(128, 128, function (g, w, h) {
      g.fillStyle = '#9a9ea4'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#6d7178'; g.lineWidth = 3; g.strokeRect(0, 0, w, h);
      for (var i = 0; i < 160; i++) { g.globalAlpha = 0.07; g.fillStyle = Math.random() > 0.5 ? '#fff' : '#000'; g.fillRect(Math.random() * w, Math.random() * h, 3, 3); }
    }, rx, ry);
  };
  T.tex.roof = function (kind) {
    var key = 'r' + kind;
    if (cache[key]) return cache[key];
    var t;
    if (kind === 'tile') {
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = '#6a3226'; g.fillRect(0, 0, w, h);
        var rows = 12, rh = h / rows;
        for (var r = 0; r < rows; r++) {
          var off = (r % 2) * 12;
          for (var x = -12; x < w; x += 24) {
            g.globalAlpha = 1;
            g.fillStyle = (r + Math.floor(x / 24)) % 3 === 0 ? '#74382b' : '#612d22';
            g.fillRect(x + off + 1, r * rh + 1, 22, rh - 2);
          }
          g.globalAlpha = 0.55; g.fillStyle = '#2b110c'; g.fillRect(0, r * rh + rh - 2, w, 2);
        }
      }, 6, 4);
    } else {
      var base = kind === 'ijuk' ? '#2a2420' : '#9a8148';
      var lite = kind === 'ijuk' ? '#4a4038' : '#c4aa62';
      var dark = kind === 'ijuk' ? '#0f0c0a' : '#5e4d26';
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = base; g.fillRect(0, 0, w, h);
        for (var i = 0; i < 900; i++) {
          g.strokeStyle = Math.random() > 0.5 ? lite : dark;
          g.globalAlpha = 0.18 + Math.random() * 0.3;
          g.lineWidth = 0.6 + Math.random() * 1.4;
          var x = Math.random() * w, y = Math.random() * h;
          g.beginPath(); g.moveTo(x, y); g.lineTo(x + (Math.random() - 0.5) * 3, y + 14 + Math.random() * 26); g.stroke();
        }
        g.globalAlpha = 0.5; g.fillStyle = dark;
        for (var b = 0; b < 8; b++) g.fillRect(0, b * 32 + 28, w, 2);
      }, 4, 3);
    }
    cache[key] = t; return t;
  };
  T.tex.carve = function (kind) {
    var key = 'c' + kind;
    if (cache[key]) return cache[key];
    var t;
    if (kind === 'toraja') {
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = '#17110d'; g.fillRect(0, 0, w, h);
        for (var gy = 0; gy < 4; gy++) for (var gx = 0; gx < 4; gx++) {
          var cx = gx * 64 + 32, cy = gy * 64 + 32;
          g.fillStyle = (gx + gy) % 2 ? '#b3261e' : '#d9a62f';
          g.beginPath(); g.moveTo(cx, cy - 28); g.lineTo(cx + 28, cy); g.lineTo(cx, cy + 28); g.lineTo(cx - 28, cy); g.closePath(); g.fill();
          g.fillStyle = '#17110d';
          g.beginPath(); g.moveTo(cx, cy - 16); g.lineTo(cx + 16, cy); g.lineTo(cx, cy + 16); g.lineTo(cx - 16, cy); g.closePath(); g.fill();
          g.fillStyle = '#efe6d0'; g.beginPath(); g.arc(cx, cy, 5, 0, 6.283); g.fill();
        }
        g.strokeStyle = '#b3261e'; g.lineWidth = 3;
        for (var k = 0; k < 4; k++) { g.beginPath(); g.moveTo(0, k * 64); g.lineTo(w, k * 64); g.stroke(); }
      });
    } else if (kind === 'gorga') {
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = '#efe6d0'; g.fillRect(0, 0, w, h);
        g.fillStyle = '#b3261e';
        for (var gy = 0; gy < 4; gy++) for (var gx = 0; gx < 4; gx++) {
          var cx = gx * 64 + 32, cy = gy * 64 + 32;
          g.beginPath(); g.arc(cx, cy, 24, 0, 6.283); g.fill();
          g.fillStyle = '#17110d'; g.beginPath(); g.arc(cx, cy, 13, 0, 6.283); g.fill();
          g.fillStyle = '#b3261e';
        }
        g.strokeStyle = '#17110d'; g.lineWidth = 4;
        for (var k = 0; k < 4; k++) { g.beginPath(); g.moveTo(0, k * 64); g.lineTo(w, k * 64); g.stroke(); }
      });
    } else if (kind === 'nias') {
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = '#4a2f1c'; g.fillRect(0, 0, w, h);
        g.strokeStyle = '#c49a63'; g.lineWidth = 5; g.lineJoin = 'miter';
        for (var r = 0; r < 4; r++) {
          g.beginPath();
          for (var x = 0; x <= w; x += 32) { g.lineTo(x, r * 64 + (x / 32 % 2 ? 14 : 50)); }
          g.stroke();
        }
        g.fillStyle = '#c49a63';
        for (var q = 0; q < 8; q++) for (var p = 0; p < 4; p++) { g.beginPath(); g.arc(q * 32 + 16, p * 64 + 32, 4, 0, 6.283); g.fill(); }
      });
    } else {
      t = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = '#6a2c1d'; g.fillRect(0, 0, w, h);
        g.strokeStyle = '#2a0f08'; g.lineWidth = 2; g.globalAlpha = 0.7;
        for (var x = 0; x <= w; x += 32) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
        g.globalAlpha = 1; g.strokeStyle = '#d9a441'; g.lineWidth = 3;
        for (var row = 0; row < 4; row++) {
          g.beginPath();
          for (var xx = 0; xx <= w; xx += 8) { var yy = row * 64 + 32 + Math.sin(xx / 20 + row) * 14; if (xx === 0) g.moveTo(xx, yy); else g.lineTo(xx, yy); }
          g.stroke();
          g.fillStyle = '#d9a441';
          for (var c = 0; c < 4; c++) { g.beginPath(); g.arc(c * 64 + 32, row * 64 + 32 + Math.sin((c * 64 + 32) / 20 + row) * 14, 5, 0, 6.283); g.fill(); }
        }
      });
    }
    cache[key] = t; return t;
  };
  T.tex.woven = function () {
    if (cache.woven) return cache.woven;
    var t = canvasTex(128, 128, function (g, w, h) {
      g.fillStyle = '#b79b62'; g.fillRect(0, 0, w, h);
      for (var i = -h; i < w + h; i += 12) {
        g.strokeStyle = i % 24 ? '#8a7140' : '#d5bd82'; g.lineWidth = 5; g.globalAlpha = 0.85;
        g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke();
        g.beginPath(); g.moveTo(i + h, 0); g.lineTo(i, h); g.stroke();
      }
    }, 5, 2);
    cache.woven = t; return t;
  };

  function M(opts, base) {
    opts.emissive = new THREE.Color(0xd9a441);
    opts.emissiveIntensity = 0;
    var m = new THREE.MeshStandardMaterial(opts);
    m.userData.base = base == null ? 1 : base;
    return m;
  }
  T.m.wood = function (kind, horiz) { return M({ map: T.tex.wood(kind, horiz), roughness: 0.78, metalness: 0 }); };
  T.m.stone = function (light) { return M({ map: T.tex.stone(light), roughness: 0.95, metalness: 0 }); };
  T.m.gold = function () { return M({ color: 0xc9972f, roughness: 0.42, metalness: 0.25 }); };
  T.m.roof = function (kind) { return M({ map: T.tex.roof(kind), roughness: 0.88, metalness: 0, side: THREE.DoubleSide }); };
  T.m.plain = function (color, rough, dbl) { return M({ color: color, roughness: rough == null ? 0.8 : rough, metalness: 0, side: dbl ? THREE.DoubleSide : THREE.FrontSide }); };
  T.m.map = function (map, dbl) { return M({ map: map, roughness: 0.85, metalness: 0, side: dbl ? THREE.DoubleSide : THREE.FrontSide }); };

  T.box = function (w, h, d, m, x, y, z) {
    var b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    b.position.set(x || 0, y || 0, z || 0);
    return b;
  };
  T.cyl = function (rt, rb, h, seg, m, x, y, z) {
    var c = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), m);
    c.position.set(x || 0, y || 0, z || 0);
    return c;
  };
  T.strut = function (a, b, th, m) {
    var A = new THREE.Vector3(a[0], a[1], a[2]), B = new THREE.Vector3(b[0], b[1], b[2]);
    var d = B.clone().sub(A), len = d.length();
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(th, len, th), m);
    mesh.position.copy(A).add(B).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return mesh;
  };
  T.frustum = function (bx, bz, tx, tz, h) {
    var v = [[-bx,0,-bz],[bx,0,-bz],[bx,0,bz],[-bx,0,bz],[-tx,h,-tz],[tx,h,-tz],[tx,h,tz],[-tx,h,tz]];
    var faces = [[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];
    var pos = [], uv = [];
    faces.forEach(function (f) {
      var a = v[f[0]], b = v[f[1]], c = v[f[2]], d = v[f[3]];
      pos.push.apply(pos, a.concat(b, c, a, c, d));
      uv.push(0,0, 1,0, 1,1, 0,0, 1,1, 0,1);
    });
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.computeVertexNormals();
    return g;
  };
  // Atap lengkung: sumbu panjang = z, t dari -1 ke 1 sepanjang atap.
  T.curveRoof = function (o) {
    var nz = o.nz || 28, nu = o.nu || 12, pos = [], uv = [], idx = [], i, j;
    for (i = 0; i <= nz; i++) {
      var t = i / nz * 2 - 1, z = t * o.L, e = o.eave(t), r = o.ridge(t), w = o.halfW(t);
      for (j = 0; j <= nu; j++) {
        var u = j / nu * 2 - 1, f = Math.pow(1 - Math.abs(u), o.shape || 1);
        pos.push(u * w, e + (r - e) * f, z);
        uv.push((u * 0.5 + 0.5) * (o.rx || 3), (i / nz) * (o.ry || 5));
      }
    }
    var row = nu + 1;
    for (i = 0; i < nz; i++) for (j = 0; j < nu; j++) {
      var a = i * row + j, b = a + 1, c = a + row, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  };
  // Tabung meruncing mengikuti kurva (tanduk, gonjong).
  T.tube = function (pts, r0, r1, m, seg, n) {
    seg = seg || 10; n = n || 22;
    var curve = new THREE.CatmullRomCurve3(pts.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }));
    var fr = curve.computeFrenetFrames(n, false);
    var pos = [], idx = [], i, j;
    for (i = 0; i <= n; i++) {
      var P = curve.getPointAt(i / n), N = fr.normals[i], B = fr.binormals[i], r = r0 + (r1 - r0) * (i / n);
      for (j = 0; j <= seg; j++) {
        var a = j / seg * Math.PI * 2, cs = Math.cos(a), sn = Math.sin(a);
        pos.push(P.x + r * (cs * N.x + sn * B.x), P.y + r * (cs * N.y + sn * B.y), P.z + r * (cs * N.z + sn * B.z));
      }
    }
    for (i = 0; i < n; i++) for (j = 0; j < seg; j++) {
      var p = i * (seg + 1) + j, q = (i + 1) * (seg + 1) + j;
      idx.push(p, q, p + 1, p + 1, q, q + 1);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, m);
  };
  // Papan segi banyak di bidang x-y (untuk bagian depan atap), tebal d.
  T.gable = function (pts, d, m) {
    var s = new THREE.Shape(); s.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    var g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
    g.translate(0, 0, -d / 2);
    return new THREE.Mesh(g, m);
  };
  T.spread = function (L, obj, dir) { L.spreads.push({ obj: obj, p0: obj.position.clone(), dir: dir }); };
  // Penanda ruang: bidang emas di lantai (dan kolom tipis bila diminta).
  T.zone = function (L, spec) {
    var gold = 0xe2b04f, y = spec.y == null ? 0.05 : spec.y, g = L.group;
    spec.cells.forEach(function (c) {
      var pm = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: c.a == null ? 0.2 : c.a, depthWrite: false, side: THREE.DoubleSide });
      pm.userData.base = pm.opacity; pm.userData.forceT = true; pm.userData.noDepth = true;
      var geo = new THREE.PlaneGeometry(c.w, c.d); geo.rotateX(-Math.PI / 2);
      var m = new THREE.Mesh(geo, pm); m.position.set(c.x, y, c.z); m.userData.nopick = true; g.add(m);
      var em = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.95 });
      em.userData.base = 0.95; em.userData.forceT = true; em.userData.noDepth = true;
      var e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(c.w, 0.02, c.d)), em);
      e.position.set(c.x, y + 0.01, c.z); g.add(e);
    });
    if (spec.vol) {
      var vm = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide });
      vm.userData.base = 0.08; vm.userData.forceT = true; vm.userData.noDepth = true;
      var v = new THREE.Mesh(new THREE.BoxGeometry(spec.vol[0], spec.vol[1], spec.vol[2]), vm);
      v.position.set(spec.vol[3], y + spec.vol[1] / 2, spec.vol[4]); v.visible = false; v.userData.nopick = true;
      g.add(v); L.vol = v;
    }
  };

  /* =========================================================
     Registrasi rumah
     ========================================================= */
  function register(h) { houses[h.id] = h; order.push(h.id); h.defs = {}; h.layers.forEach(function (d) { h.defs[d.key] = d; }); }

  /* =========================================================
     Scene bersama
     ========================================================= */
  var renderer, scene, camera, controls, ringG, ringMat, cmpEls = [], sun, ground;
  var selected = null, ex = 0, exT = 0, curTy = 4.4, bdPrev = 1, quakeOn = false, qa = 0;
  var layerBtns = {};

  function setupScene() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(36, 1, 0.1, 400);
    controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.rotateSpeed = 0.8; controls.zoomSpeed = 0.8;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.autoRotateSpeed = 1.3;
    scene.add(new THREE.HemisphereLight(0xe3ebff, 0x4a3524, 0.95));
    sun = new THREE.DirectionalLight(0xfff1da, 1.15);
    sun.position.set(10, 20, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -19; sun.shadow.camera.right = 19;
    sun.shadow.camera.top = 19; sun.shadow.camera.bottom = -19;
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 90;
    sun.shadow.bias = -0.0006;
    scene.add(sun);
    var fill = new THREE.DirectionalLight(0x9ab6ff, 0.4);
    fill.position.set(-10, 6, -9);
    scene.add(fill);
    ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.ShadowMaterial({ opacity: 0.24 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    // cincin derajat (bearing 0 = utara = -z, searah jarum jam)
    ringMat = new THREE.LineBasicMaterial({ color: 0x6f7fa3, transparent: true, opacity: 0.85 });
    ringG = new THREE.Group(); scene.add(ringG);
    var R = 10.4, pts = [], d;
    for (d = 0; d < 360; d += 5) {
      var len = d % 45 === 0 ? 1.0 : d % 15 === 0 ? 0.5 : 0.22;
      var a = d * Math.PI / 180, s = Math.sin(a), c = -Math.cos(a);
      pts.push(R * s, 0.02, R * c, (R + len) * s, 0.02, (R + len) * c);
    }
    var tg = new THREE.BufferGeometry(); tg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    ringG.add(new THREE.LineSegments(tg, ringMat));
    var cp = [];
    for (var i = 0; i <= 160; i++) { var b = i / 160 * Math.PI * 2; cp.push(R * Math.sin(b), 0.02, -R * Math.cos(b)); }
    var cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.Float32BufferAttribute(cp, 3));
    ringG.add(new THREE.Line(cg, ringMat));
    [['U', 0, -1], ['T', 1, 0], ['S', 0, 1], ['B', -1, 0]].forEach(function (c) {
      var e = document.createElement('span'); e.className = 'cmp'; e.textContent = c[0]; e.setAttribute('aria-hidden', 'true');
      hsBox.appendChild(e); cmpEls.push({ el: e, dx: c[1], dz: c[2], v: new THREE.Vector3() });
    });
    applyTheme();
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
      new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    } catch (e) {}
  }
  function applyTheme() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--ring').trim();
    if (v && ringMat) ringMat.color.set(v);
  }

  /* =========================================================
     Bangun rumah (sekali, saat pertama dipilih)
     ========================================================= */
  function assignNumbers(h) {
    var i = 0;
    h.layers.forEach(function (d) { d._n = d.space ? (d.n || '•') : String(++i); });
  }
  function build(h) {
    assignNumbers(h);
    h.root = new THREE.Group(); scene.add(h.root);
    h.L = {}; h.keys = []; h.pickables = []; h.hsEls = []; h.hs = {};
    h.layers.forEach(function (d) {
      var g = new THREE.Group(); g.name = d.key; h.root.add(g);
      var L = { key: d.key, def: d, group: g, fade: 1, sel: 0, mats: [], anchor: new THREE.Object3D(), spreads: [], vol: null };
      g.add(L.anchor); L.anchor.position.set(d.anchor[0], d.anchor[1], d.anchor[2]);
      g.position.set(d.base ? d.base[0] : 0, d.base ? d.base[1] : 0, d.base ? d.base[2] : 0);
      d.build(g, T, L);
      var seen = [];
      g.traverse(function (o) {
        if (o.isMesh || o.isLine) {
          o.userData.layer = d.key;
          if (o.isMesh && !o.userData.nopick) { o.castShadow = true; o.receiveShadow = true; h.pickables.push(o); }
          if (seen.indexOf(o.material) < 0) {
            seen.push(o.material);
            if (o.material.userData.base == null) o.material.userData.base = 1;
            L.mats.push(o.material);
          }
        }
      });
      h.L[d.key] = L; h.keys.push(d.key);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'hs'; b.setAttribute('aria-label', d.name);
      b.innerHTML = d._n + '<span class="tag">' + d.name + '</span>';
      b.addEventListener('click', function () { toggleSel(d.key); });
      b.style.display = 'none';
      hsBox.appendChild(b); h.hsEls.push(b); h.hs[d.key] = b;
    });
  }

  /* =========================================================
     UI
     ========================================================= */
  function buildTabs() {
    tabsEl.innerHTML = '';
    order.forEach(function (id) {
      var h = houses[id];
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', 'false'); b.dataset.id = id;
      b.innerHTML = '<span class="tn">' + h.tab + '</span><span class="tp">' + h.place + '</span>';
      b.addEventListener('click', function () { setHouse(id); });
      tabsEl.appendChild(b);
    });
  }
  function buildLists() {
    list1.innerHTML = ''; list2.innerHTML = ''; layerBtns = {};
    var has2 = false;
    cur.layers.forEach(function (d) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'layer'; b.setAttribute('aria-pressed', 'false');
      b.innerHTML = '<span class="num">' + d._n + '</span><span><span class="nm">' + d.name + '</span><span class="sb">' + d.sub + '</span></span>';
      b.addEventListener('click', function () { toggleSel(d.key); });
      li.appendChild(b);
      if (d.space) { list2.appendChild(li); has2 = true; } else list1.appendChild(li);
      layerBtns[d.key] = b;
    });
    list1H.textContent = cur.list1;
    list2H.textContent = cur.list2 || '';
    box2.hidden = !has2;
  }
  function renderCard(key) {
    var h = cur, d = key ? h.defs[key] : null;
    var kicker = d ? d.kicker : h.kicker, title = d ? d.name : h.title;
    var paras = d ? d.paras : h.paras, note = d ? d.note : h.note, srcs = d ? d.src : h.srcAll;
    var html = '<p class="kicker">' + kicker + '</p><h2>' + title + '</h2>';
    paras.forEach(function (p) { html += '<p>' + p + '</p>'; });
    html += '<p class="note">' + note + '</p><p class="src">Sumber: ';
    srcs.forEach(function (s) { html += '<a href="' + h.src[s][1] + '" target="_blank" rel="noopener">' + h.src[s][0] + '</a>'; });
    card.innerHTML = html + '</p>';
  }
  function setSel(key) {
    selected = key;
    cur.keys.forEach(function (k) {
      layerBtns[k].setAttribute('aria-pressed', k === key ? 'true' : 'false');
      cur.hs[k].classList.toggle('on', k === key);
      if (cur.L[k].vol) cur.L[k].vol.visible = (k === key);
    });
    renderCard(key);
  }
  function toggleSel(k) { setSel(selected === k ? null : k); }
  function syncBtn() { toggleBtn.textContent = exT > 0.5 ? 'Rakit' : 'Bongkar'; }

  function setHouse(id) {
    var h = houses[id]; if (!h) return;
    if (!h.root) build(h);
    order.forEach(function (o) {
      var x = houses[o];
      if (x.root) { x.root.visible = (o === id); x.hsEls.forEach(function (e) { e.style.display = o === id ? '' : 'none'; }); }
    });
    cur = h; quakeOn = false; qa = 0;
    quakeBtn.hidden = !h.quake; quakeBtn.setAttribute('aria-pressed', 'false');
    ex = 0; exT = 0; exRange.value = '0'; syncBtn();
    curTy = h.ty[0]; bdPrev = 1;
    controls.target.set(0, curTy, 0);
    camera.position.set(h.home[0], curTy + h.home[1], h.home[2]);
    ringG.scale.setScalar(h.ringR / 10.4);
    cmpEls.forEach(function (c) { c.v.set(c.dx * (h.ringR + 1.4), 0.02, c.dz * (h.ringR + 1.4)); });
    Array.prototype.forEach.call(tabsEl.children, function (b) { b.setAttribute('aria-selected', b.dataset.id === id ? 'true' : 'false'); });
    buildLists(); setSel(null);
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  /* =========================================================
     Interaksi
     ========================================================= */
  function wire() {
    exRange.addEventListener('input', function () { exT = exRange.value / 100; syncBtn(); });
    toggleBtn.addEventListener('click', function () { exT = exT > 0.5 ? 0 : 1; exRange.value = String(Math.round(exT * 100)); syncBtn(); });
    spin.checked = !reduce; controls.autoRotate = !reduce;
    spin.addEventListener('change', function () { controls.autoRotate = spin.checked; });
    controls.addEventListener('start', function () {
      if (spin.checked) { spin.checked = false; controls.autoRotate = false; }
      hint.classList.add('fade');
    });
    quakeBtn.addEventListener('click', function () {
      quakeOn = !quakeOn; quakeBtn.setAttribute('aria-pressed', quakeOn ? 'true' : 'false');
      quakeBtn.textContent = quakeOn ? 'Hentikan gempa' : 'Simulasi gempa';
    });
    resetBtn.addEventListener('click', function () {
      setSel(null);
      var bd = 1 + cur.bd * ex;
      camera.position.set(cur.home[0] * bd, controls.target.y + cur.home[1] * bd, cur.home[2] * bd);
    });
    var ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), down = null;
    canvas.addEventListener('pointerdown', function (e) { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    canvas.addEventListener('pointerup', function (e) {
      if (!down) return;
      var moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t;
      down = null;
      if (moved > 6 || dt > 500) return;
      var r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      var hits = ray.intersectObjects(cur.pickables, false), hit = null;
      for (var i = 0; i < hits.length; i++) {
        if (cur.L[hits[i].object.userData.layer].fade > 0.5) { hit = hits[i].object.userData.layer; break; }
      }
      if (hit) toggleSel(hit); else setSel(null);
    });
    function resize() {
      var w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      var asp = w / h;
      camera.aspect = asp;
      var f = Math.max(1, 0.95 / asp);
      camera.fov = Math.min(85, 2 * Math.atan(Math.tan(18 * Math.PI / 180) * f) * 180 / Math.PI);
      camera.updateProjectionMatrix();
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
    window.addEventListener('resize', resize);
    resize();
  }

  /* =========================================================
     Loop
     ========================================================= */
  var last = 0, tmp = new THREE.Vector3(), lastAz = -1, lastEx = -1;
  function place(el, v, w, h) {
    tmp.copy(v).project(camera);
    if (tmp.z > 1 || tmp.z < -1) { el.style.visibility = 'hidden'; return; }
    el.style.visibility = 'visible';
    el.style.transform = 'translate3d(' + ((tmp.x * 0.5 + 0.5) * w).toFixed(1) + 'px,' + ((-tmp.y * 0.5 + 0.5) * h).toFixed(1) + 'px,0)';
  }
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    var h = cur, k, i, L, d;
    ex += (exT - ex) * Math.min(1, dt * (reduce ? 30 : 4.5));
    if (Math.abs(exT - ex) < 0.0005) ex = exT;
    qa += ((quakeOn ? 1 : 0) - qa) * Math.min(1, dt * 5);
    var t = now / 1000;
    var qs = (Math.sin(t * 13.5) + 0.45 * Math.sin(t * 31.7 + 1.3)) / 1.45;
    var qx = qs * 0.22 * qa;
    ringG.position.x = qx;

    for (i = 0; i < h.keys.length; i++) {
      k = h.keys[i]; L = h.L[k]; d = L.def;
      var b = d.base || [0, 0, 0], e = d.ex || [0, 0, 0], sm = d.selMove || [0, 0, 0];
      L.sel += ((selected === k ? 1 : 0) - L.sel) * Math.min(1, dt * 6);
      var q = d.q || null;
      L.group.position.set(
        b[0] + e[0] * ex + sm[0] * L.sel + (q ? qx * q.x : 0),
        b[1] + e[1] * ex + sm[1] * L.sel,
        b[2] + e[2] * ex + sm[2] * L.sel
      );
      L.group.rotation.z = q && q.rz ? qs * qa * q.rz : 0;
      for (var s = 0; s < L.spreads.length; s++) {
        var sp = L.spreads[s];
        sp.obj.position.set(sp.p0.x + sp.dir[0] * ex, sp.p0.y + sp.dir[1] * ex, sp.p0.z + sp.dir[2] * ex);
      }
    }

    // kamera mengikuti tinggi model dan bagian terpilih
    var bd = 1 + h.bd * ex;
    var wantTy;
    if (selected) { var sd = h.defs[selected]; wantTy = (sd.base ? sd.base[1] : 0) + sd.cy + (sd.ex ? sd.ex[1] : 0) * ex; }
    else wantTy = h.ty[0] + (h.ty[1] - h.ty[0]) * ex;
    var newTy = curTy + (wantTy - curTy) * Math.min(1, dt * 4);
    var dy = newTy - curTy; curTy = newTy;
    camera.position.y += dy; controls.target.y = newTy;
    var ratio = bd / bdPrev; bdPrev = bd;
    if (Math.abs(ratio - 1) > 1e-6) {
      tmp.copy(camera.position).sub(controls.target).multiplyScalar(ratio);
      camera.position.copy(controls.target).add(tmp);
    }
    controls.minDistance = h.minD * bd; controls.maxDistance = h.maxD * bd;
    controls.update();
    scene.updateMatrixWorld(true);

    // fokus: bagian lain memudar, bagian terpilih bercahaya
    for (i = 0; i < h.keys.length; i++) {
      k = h.keys[i]; L = h.L[k];
      var tgt = (selected === null || selected === k) ? 1 : 0.14;
      L.fade += (tgt - L.fade) * Math.min(1, dt * 8);
      var glow = selected === k ? 0.22 : 0;
      for (var mi = 0; mi < L.mats.length; mi++) {
        var m = L.mats[mi];
        var o = m.userData.base * L.fade;
        var tr = o < 0.995 || !!m.userData.forceT;
        if (m.transparent !== tr) { m.transparent = tr; m.needsUpdate = true; }
        m.opacity = o;
        m.depthWrite = !m.userData.noDepth && L.fade > 0.6;
        if (m.emissive) m.emissiveIntensity += (glow - m.emissiveIntensity) * Math.min(1, dt * 8);
      }
    }

    renderer.render(scene, camera);

    var w = stage.clientWidth, hh = stage.clientHeight;
    for (i = 0; i < h.keys.length; i++) {
      k = h.keys[i];
      h.L[k].anchor.getWorldPosition(tmp);
      place(h.hs[k], tmp.clone(), w, hh);
    }
    cmpEls.forEach(function (c) { place(c.el, c.v, w, hh); });

    var ddx = camera.position.x - controls.target.x, ddz = camera.position.z - controls.target.z;
    var az = Math.round(Math.atan2(ddx, -ddz) * 180 / Math.PI); if (az < 0) az += 360; if (az === 360) az = 0;
    var ep = Math.round(ex * 100);
    if (az !== lastAz || ep !== lastEx) { readout.textContent = 'Sudut ' + az + '° · Terbongkar ' + ep + '%'; lastAz = az; lastEx = ep; }
  }

  function start() {
    buildTabs();
    var hashId = (location.hash || '').replace('#', '');
    var id = houses[hashId] ? hashId : order[0];
    try { setupScene(); }
    catch (e) {
      $('#fallback').hidden = false;
      cur = houses[id]; cur.keys = []; assignNumbers(cur);
      renderCard(null);
      return;
    }
    wire();
    setHouse(id);
    requestAnimationFrame(frame);
  }

  return { register: register, start: start, T: T };
})();
