export type Vec3 = [number, number, number];

/** Satu sumber rujukan: [judul, url]. */
export type Source = [title: string, url: string];

export interface Layer {
  key: string;
  name: string;
  sub: string;
  kicker: string;
  /** Posisi penanda di model, relatif terhadap `base`. */
  anchor: Vec3;
  /** Tinggi titik bidik kamera saat lapisan dipilih. */
  cy: number;
  base: Vec3;
  /** Offset saat explode. */
  ex: Vec3;
  /** Ilustrasi gempa (hanya Omo Sebua). */
  q?: { x: number; rz?: number };
  /** Geser tambahan saat lapisan dipilih. */
  selMove?: Vec3;
  /** true = ruang/akses (penanda berhuruf), false = struktur (penanda bernomor). */
  space?: boolean;
  /** Huruf penanda untuk ruang. */
  n?: string;
  paras: string[];
  /** "Catatan model": bagian yang disederhanakan. */
  note: string;
  /** Kunci ke House.src. */
  src: string[];
}

export interface House {
  id: string;
  tab: string;
  place: string;
  kicker: string;
  title: string;
  paras: string[];
  note: string;
  srcAll: string[];
  src: Record<string, Source>;
  list1: string;
  list2: string;
  quake?: boolean;
  home: Vec3;
  ty: [number, number];
  bd: number;
  minD: number;
  maxD: number;
  ringR: number;
  layers: Layer[];
}
