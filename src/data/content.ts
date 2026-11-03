// ─────────────────────────────────────────────────────────────
// PAGE COPY — all headings and paragraphs for homepage sections.
// ⚠ Statistics are PLACEHOLDERS — replace with real figures before launch.
// ─────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: 'A House of Knit Fabrics',
  title: ['Knit fabrics,', 'made with', 'quiet precision.'],
  body: 'Jerseys, ribs, interlocks and fleeces — engineered for garment makers and brands who care how a fabric feels, drapes and lasts.',
  primaryCta: { label: 'Explore the collection', href: '/#collection' },
  secondaryCta: { label: 'Request a quote', href: '/#quote' },
};

export const buyerTypes = [
  { id: 'brand', title: 'Fashion Brands', text: 'Consistent shades, signature prints and reliable repeat orders for your seasonal lines.', pick: 'Jersey' as const },
  { id: 'manufacturer', title: 'Garment Manufacturers', text: 'Bulk-ready knits, stable GSM and trims that run clean on your production floor.', pick: 'Interlock' as const },
  { id: 'kids', title: 'Kidswear Labels', text: 'Soft, breathable fabrics and playful prints designed with skin-comfort in mind.', pick: 'Specialty' as const },
  { id: 'winter', title: 'Activewear & Winterwear', text: 'Fleece, French terry and stretch knits for performance and warmth.', pick: 'Fleece' as const },
];

// value = number to count up to; suffix shown after it.
export const stats = [
  { value: 20, suffix: '+', label: 'Fabric constructions' },
  { value: 6, suffix: '', label: 'Signature prints' },
  { value: 100, suffix: '%', label: 'Quality-checked rolls' },
  { value: 24, suffix: 'h', label: 'Quote response target' },
];

export const applications = [
  { title: 'Everyday T-shirts', text: 'Single jersey and interlock for tees that keep their shape.', index: '01' },
  { title: 'Kidswear', text: 'Soft knits and gentle prints for little ones.', index: '02' },
  { title: 'Loungewear & Nightwear', text: 'Fluid drape and comfort for restful hours.', index: '03' },
  { title: 'Sweats & Hoodies', text: 'French terry and brushed fleece with body and warmth.', index: '04' },
  { title: 'Polos & Uniforms', text: 'Piqué and interlock that stay crisp wash after wash.', index: '05' },
  { title: 'Activewear', text: 'Stretch and recovery for movement.', index: '06' },
];

export const about = {
  eyebrow: 'About Mangisha',
  title: 'A house built around knit.',
  paragraphs: [
    'Mangisha is a house of knit fabrics. We focus on one craft — knitting — and the details that decide how a fabric performs in a garment: yarn choice, structure, finishing and consistency from roll to roll.',
    'From plain jerseys to our signature printed collections, every fabric is selected and checked with the garment maker in mind.',
  ],
};

export const whyUs = [
  { title: 'Knit specialists', text: 'One focus — knit fabrics — so every construction gets real attention.' },
  { title: 'Signature prints', text: 'An in-house print library with distinctive, wearable character.' },
  { title: 'Consistency', text: 'Careful checks so shade and GSM stay stable across bulk orders.' },
  { title: 'Responsive service', text: 'Direct conversations on WhatsApp or email — quotes without the runaround.' },
];
