// ─────────────────────────────────────────────────────────────
// SITE SETTINGS — edit contact details, domain and nav here.
// ⚠ Phone / email / address below are PLACEHOLDERS. Replace before launch.
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'Mangisha',
  tagline: 'A House of Knit Fabrics',
  // Set to your real domain once connected (used for canonical + Open Graph URLs). No trailing slash.
  domain: '',
  logo: '/assets/mangisha-logo.jpg',
  contact: {
    whatsappNumber: '910000000000', // international format, digits only (placeholder)
    whatsappDisplay: '+91 00000 00000',
    email: 'sales@example.com',
    address: 'Your factory / office address, City, State, India',
    hours: 'Mon – Sat, 10:00 – 19:00 IST',
  },
  whatsappMessage: 'Hello Mangisha, I would like to enquire about your knit fabrics.',
};

export const navLinks = [
  { label: 'Collection', href: '/#collection' },
  { label: 'Signature Prints', href: '/signature-prints' },
  { label: 'Applications', href: '/#applications' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export const whatsappUrl = (text: string = site.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
