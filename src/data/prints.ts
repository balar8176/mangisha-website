// ─────────────────────────────────────────────────────────────
// SIGNATURE PRINTS — the six supplied images, shown unchanged.
// Files live in public/assets/prints/. To swap an image, replace the file (keep name) or edit `src`.
// width/height are the real pixel sizes (prevents layout shift).
// `code` and `name` are working labels — rename to your own design codes.
// ─────────────────────────────────────────────────────────────
export type Print = {
  id: string;
  code: string;
  name: string;
  family: 'Doodle Bloom' | 'Blossom Scatter';
  colourway: string;
  src: string;
  width: number;
  height: number;
};

export const prints: Print[] = [
  { id: 'p1', code: 'SP-01', name: 'Plum Meadow', family: 'Doodle Bloom', colourway: 'Plum / Lime / Cream', src: '/assets/prints/print-01-plum-meadow.jpeg', width: 1178, height: 341 },
  { id: 'p2', code: 'SP-02', name: 'Charcoal Rose', family: 'Doodle Bloom', colourway: 'Charcoal / Coral / Cream', src: '/assets/prints/print-02-charcoal-rose.jpeg', width: 1179, height: 366 },
  { id: 'p3', code: 'SP-03', name: 'Slate Lilac', family: 'Doodle Bloom', colourway: 'Slate / Lilac / Cream', src: '/assets/prints/print-03-slate-lilac.jpeg', width: 1178, height: 350 },
  { id: 'p4', code: 'SP-04', name: 'Blue Blossom', family: 'Blossom Scatter', colourway: 'Blue-grey / Blush / White', src: '/assets/prints/print-04-blue-blossom.jpeg', width: 1179, height: 365 },
  { id: 'p5', code: 'SP-05', name: 'Mauve Sky', family: 'Blossom Scatter', colourway: 'Mauve / Sky / White', src: '/assets/prints/print-05-mauve-sky.jpeg', width: 1179, height: 366 },
  { id: 'p6', code: 'SP-06', name: 'Violet Cream', family: 'Blossom Scatter', colourway: 'Violet / Butter / White', src: '/assets/prints/print-06-violet-cream.jpeg', width: 1180, height: 360 },
];
