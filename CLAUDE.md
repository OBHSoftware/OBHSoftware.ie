# OBHSoftware.ie

Marketing site for OBH Software — a Galway software house. Static React SPA, no backend
beyond two serverless form handlers.

## Stack

- **React 19** + **TypeScript**, built with **Vite 7**
- **react-router-dom 7** — client-side routing, `BrowserRouter`
- **framer-motion** — scroll reveals and stagger
- **CSS Modules** per component, with global design tokens in `src/styles/variables.css`
- **@vercel/analytics**
- No CSS framework, no component library, no state manager. Keep it that way.

## Commands

```bash
npm install
npm run dev      # vite dev server, http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve dist/
npm run lint     # eslint
```

## Directory map

```
src/
  components/
    common/     Reusable primitives (Button, Section, Docket, ProductPane, Logo…)
    layout/     Header, Footer
    sections/   Homepage bands (Hero, Proof, Platforms, Services, Work, About, Contact)
    subsite/    Standalone product-microsite components
    icons/      Inline SVG icon set
  data/         ALL copy lives here as JSON. Components read it; they never hardcode text.
  pages/        One component per route
  styles/       variables.css — the design tokens
api/            Vercel serverless functions (contact form)
public/
  shots/        Real product screenshots captured from the live product sites
```

## Design language

The site is styled as **industrial signage** — the visual world of a workshop, not a SaaS
landing page. The rules are load-bearing:

- **No border radius.** Everything is cut, stamped or bolted. `--radius-*` are all `0`.
- **Hard offset shadows**, never soft blurs. `--shadow-plate` is `5px 5px 0`.
- **Thick keylines** (2px), not hairlines.
- **One loud colour** — safety orange `--color-accent`. Hi-vis yellow appears *only* in the
  hazard stripe. Never as type.
- **Type stack is signage:** Archivo (display/heading), Barlow (body), Barlow Condensed
  (labels), IBM Plex Mono (numbers, serials, field keys).
- **The hazard stripe** (`--hazard`) is the one decorative device, and only ever marks a
  boundary.

Both light and dark themes are designed and must stay designed — `color-scheme: light dark`
is declared deliberately, partly to stop Chrome's Auto Dark Theme from inverting the page.
Any new colour must come from a token so it survives the theme flip.

### Page shapes

Pages deliberately do **not** share one template. Each page type takes the shape of a
physical document appropriate to it — a docket, a site notice, a spec plate, a stamped
index. `PageHero` is legacy and is being retired; do not reach for it on new pages.

## Conventions

- **Copy lives in `src/data/*.json`.** Adding a section means adding data, not strings in TSX.
- Every component gets a sibling `.module.css`. No global styles outside `index.css` and
  `variables.css`.
- Use tokens (`var(--…)`) for colour, spacing, type. Never raw hex in a module.
- Prefer the existing primitives in `components/common` before writing a new one.
- Product screenshots live in `public/shots/` and are referenced as `/shots/<name>.png`.
