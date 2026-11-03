// ─────────────────────────────────────────────────────────────
// PRODUCT DATA — one object per fabric. Add / remove freely.
// ⚠ Specs (gsm, composition, width) are PLACEHOLDER values — replace with your real specs.
// `image` is optional: drop a file in public/assets/products/ and set e.g. '/assets/products/single-jersey.jpg'.
// With no image the card shows a clearly labelled placeholder (never a substituted picture).
// ─────────────────────────────────────────────────────────────
export type Product = {
  id: string;
  name: string;
  category: 'Jersey' | 'Rib' | 'Fleece' | 'Interlock' | 'Specialty';
  summary: string;
  gsm: string;
  composition: string;
  width: string;
  handfeel: string;
  uses: string[];
  image?: string;
};

export const products: Product[] = [
  {
    id: 'single-jersey',
    name: 'Single Jersey',
    category: 'Jersey',
    summary: 'The everyday knit — smooth face, soft hand, easy to dye and print.',
    gsm: '120 – 200',
    composition: '100% Cotton / Cotton-Poly',
    width: '36" – 72"',
    handfeel: 'Soft, light, breathable',
    uses: ['T-shirts', 'Kidswear', 'Loungewear'],
  },
  {
    id: 'lycra-jersey',
    name: 'Lycra Jersey',
    category: 'Jersey',
    summary: 'Jersey with stretch and recovery for fitted silhouettes.',
    gsm: '160 – 220',
    composition: 'Cotton / Elastane',
    width: '36" – 66"',
    handfeel: 'Smooth, stretchy, shape-keeping',
    uses: ['Leggings', 'Fitted tops', 'Dresses'],
  },
  {
    id: 'rib',
    name: '1×1 & 2×2 Rib',
    category: 'Rib',
    summary: 'Elastic, textured rib for trims and body-hugging garments.',
    gsm: '180 – 260',
    composition: 'Cotton / Cotton-Lycra',
    width: '30" – 60"',
    handfeel: 'Springy, textured, resilient',
    uses: ['Neckbands', 'Cuffs', 'Tank tops'],
  },
  {
    id: 'interlock',
    name: 'Interlock',
    category: 'Interlock',
    summary: 'Double-face knit with a stable, smooth surface on both sides.',
    gsm: '180 – 260',
    composition: '100% Cotton / Cotton-Poly',
    width: '36" – 66"',
    handfeel: 'Dense, smooth, stable',
    uses: ['Polos', 'Premium tees', 'Nightwear'],
  },
  {
    id: 'pique',
    name: 'Piqué',
    category: 'Specialty',
    summary: 'Textured surface knit with a classic honeycomb character.',
    gsm: '180 – 240',
    composition: 'Cotton / Cotton-Poly',
    width: '36" – 66"',
    handfeel: 'Crisp, breathable, structured',
    uses: ['Polo shirts', 'Uniforms', 'Sportswear'],
  },
  {
    id: 'french-terry',
    name: 'French Terry',
    category: 'Fleece',
    summary: 'Looped back for comfort — a staple for sweats and lounge sets.',
    gsm: '220 – 320',
    composition: 'Cotton / Cotton-Poly',
    width: '36" – 72"',
    handfeel: 'Soft inside, smooth outside',
    uses: ['Sweatshirts', 'Joggers', 'Hoodies'],
  },
  {
    id: 'fleece',
    name: 'Brushed Fleece',
    category: 'Fleece',
    summary: 'Warm, brushed inner surface for cold-season garments.',
    gsm: '260 – 380',
    composition: 'Cotton-Poly',
    width: '36" – 72"',
    handfeel: 'Plush, warm, cosy',
    uses: ['Hoodies', 'Winterwear', 'Kidswear'],
  },
  {
    id: 'printed-jersey',
    name: 'Printed Jersey',
    category: 'Specialty',
    summary: 'Jersey carrying our signature prints — see the full print library.',
    gsm: '140 – 200',
    composition: 'Cotton / Viscose blends',
    width: '36" – 60"',
    handfeel: 'Soft, fluid drape',
    uses: ['Girlswear', 'Dresses', 'Loungewear'],
  },
];

export const categories = ['All', 'Jersey', 'Rib', 'Interlock', 'Fleece', 'Specialty'] as const;
