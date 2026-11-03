# Mangisha — website source

React + TypeScript + Vite. GSAP/ScrollTrigger + Lenis for motion and scrolling, React Three Fiber/Drei for the hero fabric rolls (with a CSS-3D fallback), Cloudflare Pages for hosting and the quote-form backend.

> **Status of this build:** the complete source is here, but it has **not been compiled or run yet** — the environment it was written in could not reach the npm registry. Run the three commands below on your own machine first; fix anything they report before deploying. See "Known gaps".

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then writes the site to ./dist
```

To test the quote function locally: copy `.dev.vars.example` to `.dev.vars`, fill it in, then `npm run build && npm run pages:dev`.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repo (or use `npx wrangler pages deploy dist`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command: `npm run build` · Output directory: `dist` · Node version: 20+.
4. Add environment variables (Settings → Environment variables → Production):
   `RESEND_API_KEY` (encrypted), `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`.
5. Deploy. `public/_redirects` makes `/` and `/signature-prints` survive a refresh; `functions/api/quote.ts` becomes `POST /api/quote` automatically.
6. Custom domain (GoDaddy): add the domain in Pages → Custom domains, then either move the domain's nameservers to Cloudflare or add the CNAME record Cloudflare shows. Then set `domain` in `src/data/site.ts` (e.g. `https://www.yourdomain.com`) so canonical and Open Graph URLs are emitted.

## Editing content

| To change… | Edit |
|---|---|
| Phone, WhatsApp, email, address, domain, nav links | `src/data/site.ts` |
| Fabrics (name, GSM, composition, photo…) | `src/data/products.ts` |
| Signature prints (names, codes, files) | `src/data/prints.ts` (+ images in `public/assets/prints/`) |
| Headlines, stats, applications, about, "why us" | `src/data/content.ts` |
| Colours and fonts | `:root` block at the top of `src/styles/global.css` |
| Section order on the homepage | `src/pages/Home.tsx` |
| Hero 3D roll colours | `<Roll … base= shade= highlight=>` in `src/components/three/HeroRoll.tsx` |

## Placeholders you must replace

The brief's original copy and product data were not available when this was built, so these are **my placeholders, not your facts**:

- `site.ts` — WhatsApp number, email, address, hours.
- `products.ts` — all GSM / composition / width values and product list.
- `content.ts` — headline copy, the four statistics, application and "why us" text.
- `prints.ts` — print names and `SP-xx` codes (the images themselves are your supplied files, untouched).

## Quote form

Kleap's form could not be inspected from here, so the form posts to our own Pages Function, which emails you through [Resend](https://resend.com). Until `RESEND_API_KEY`, `QUOTE_TO_EMAIL` and `QUOTE_FROM_EMAIL` are set the function returns an error and the site says so — it never shows a fake "sent". You need a Resend account and a verified sender domain.

## Known gaps

- Not built/tested here (see top). No responsive or browser testing was done at 360/390/768/1024/1440.
- No product photos supplied → cards show labelled placeholders (`public/assets/products/README.txt`).
- React Bits components were not installed (no registry access); I wrote small equivalents (text-mask reveal, spotlight-free buttons, tilt cards) in-house. You can add the official ones from reactbits.dev later.
- GSAP SplitText not used; headline lines are split by hand.
- The hero rolls use a procedural knit texture for the decorative 3D object only. Your print images are never used as, or altered into, 3D materials.
