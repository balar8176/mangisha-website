# Asset audit

| Asset | Status | Location |
|---|---|---|
| Logo (578×494 JPG) | Supplied, copied unchanged | `public/assets/mangisha-logo.jpg` |
| Signature print 1 (1178×341) | Supplied, unchanged | `public/assets/prints/print-01-plum-meadow.jpeg` |
| Signature print 2 (1179×366) | Supplied, unchanged | `public/assets/prints/print-02-charcoal-rose.jpeg` |
| Signature print 3 (1178×350) | Supplied, unchanged | `public/assets/prints/print-03-slate-lilac.jpeg` |
| Signature print 4 (1179×365) | Supplied, unchanged | `public/assets/prints/print-04-blue-blossom.jpeg` |
| Signature print 5 (1179×366) | Supplied, unchanged | `public/assets/prints/print-05-mauve-sky.jpeg` |
| Signature print 6 (1180×360) | Supplied, unchanged | `public/assets/prints/print-06-violet-cream.jpeg` |
| Product photos (8 fabrics) | **NOT supplied** | upload to `public/assets/products/` (see README there) |
| Kleap `/uploads/...` URLs | None were present in the files received | — |

Notes
- Prints were renamed from `WhatsApp_Image_2026-11-01_at_6.29.xx_PM*.jpeg` to descriptive names; pixel data is untouched (byte copies).
- The supplied logo is a JPG with a white background; it sits on light surfaces (header, About card, footer badge). A transparent PNG/SVG would look cleaner on dark areas — send one if you have it.
- Print names (Plum Meadow, etc.) are my working labels derived from the colours; rename freely in `src/data/prints.ts`.
