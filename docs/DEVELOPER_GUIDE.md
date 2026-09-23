# Developer guide

Everything a new developer needs to work on the Yali Labs website. The [README](../README.md) covers setup, configuration and the API contract; this guide explains how the code is organised, how content flows through it, and the conventions to follow.

## 1. Ten-minute tour

```bash
npm install
npm run dev          # http://localhost:5173, mock API on by default
npm run lint         # eslint, must pass before a PR
npm run build        # production build to dist/
```

Open `/` for the public site and `/admin` for the content admin. In demo mode sign in with `admin@yalilabs.com` / `yalilabs2026`. Edit something in the admin, save, and reload the public site: your edit is live (stored in `localStorage` in demo mode).

Stack: React 19, Vite, MUI 9 (`@mui/material`, `@mui/icons-material`), framer-motion, react-router 7, TanStack Query, axios, zustand, zod. Plain JavaScript with JSX, no TypeScript.

## 2. Repository map

```
src/
  main.jsx                 entry: theme provider + <App />
  App.jsx                  routes, page transitions, scroll-to-top, lazy pages
  index.css                global reset, fonts, reduced-motion rule

  pages/                   one component per public route
    Home.jsx  Products.jsx  About.jsx  Team.jsx  Contact.jsx  NotFound.jsx

  components/
    layout/                Navbar, Footer
    home/                  Hero, MissionSection, AltaSection (product preview), PartnersSection
    products/              ProductShowcase (carousel), FlowDiagram
    common/                SectionHeader, AnimatedReveal, GridBackground, RichText

  content/                 THE CONTENT LAYER (see section 3)
    defaults/<module>.js   copy shipped with the site, one file per admin module
    schemas/<module>.js    zod schema per module
    useContent.js          useSiteContent(), useModule(key)
    helpers.js             productHref(), initialsFor()
    icons.js               icon registry: name -> MUI icon
    logos.jsx              partner logo registry
    socials.js             social platform registry
    ContentIcon.jsx        <ContentIcon name="Psychology" />
    static/notFound.js     the only non-editable copy

  admin/                   the content admin at /admin
    AdminApp.jsx           routing + auth gate
    components/            AdminLayout, LoginPage, ModulePage, SchemaForm, ConfirmDialog, schema.js
    modules/<module>.js    form definition (sections + fields) per module
    hooks/                 useAuth, useContentQueries

  lib/
    api/client.js          axios instance, bearer token, 401 handling, mock switch
    api/auth.js  api/content.js
    api/mock.js            in-browser mock API (demo mode)
    queryClient.js         TanStack QueryClient + query keys

  stores/                  zustand: authStore (session), adminUiStore (unsaved flag)
  theme/
    colors.js              colour tokens for dark and light mode
    theme.js               MUI theme built from the tokens
    ThemeContext.jsx       useColors(), useThemeMode()
    layout.js              CONTAINER_PX, SECTION_PY spacing tokens
```

## 3. The content layer

Almost every word on the public site is data, not JSX. A **module** is one editable area (`home`, `products`, `about`, `team`, `contact`, `footer`). Each module is defined in three places that must stay in sync:

| File | Purpose |
| --- | --- |
| `src/content/defaults/<module>.js` | The default copy. Also the fallback when the API is down and what "Reset to defaults" writes. |
| `src/content/schemas/<module>.js` | zod schema. Validates API responses and admin saves. Unknown keys are stripped. |
| `src/admin/modules/<module>.js` | The admin form: sections (tabs) and fields. |

### Reading content in a page

```jsx
import { useModule } from '../content/useContent';

const { hero, mission } = useModule('home');
```

`useSiteContent()` fetches `GET /content` once for the whole site and caches it. `useModule(key)` returns that module merged over its defaults and validated, or the defaults while loading or on error, so a page never renders empty.

### Adding an editable field

1. Add it to `defaults/<module>.js`.
2. Add it to `schemas/<module>.js` (use `str`, `url`, `bool`, `num`, `lines` from `schemas/common.js`).
3. Add a field to `admin/modules/<module>.js`. Field types: `text`, `textarea`, `number`, `boolean`, `select`, `lines`, `pipe`, `numbers`, `list`, `object`. `half: true` puts two fields on one row.
4. Read it with `useModule()`.

If the field is a list of things (products, partners, team members), use `type: 'list'` with `itemFields`, an `itemLabel` function for the collapsed row title, and a `newItem` template.

### Icons, logos and socials are referenced by name

Content stores strings such as `icon: 'Psychology'`. The registries in `src/content/icons.js`, `logos.jsx` and `socials.js` map names to components and also feed the admin's select boxes. To offer a new icon, import it from `@mui/icons-material` and add one line to `ICONS`.

## 4. Products

The product catalogue (`defaults/products.js`, `catalog.items`) is the single source of truth for:

- the hero's ecosystem panel (featured products, at most four),
- the homepage preview cards (featured products),
- the `/products` carousel (all products),
- the footer's product links.

Each product has `id`, `title`, `tagline`, `badge` / `badgeActive`, `featured`, `icon`, `description`, `howItWorks { heading, description }`, `flowStages [{ label, sub }]`, `externalHref` and `externalLabel`.

Deep links are `/products#<id>`; use `productHref(product)` from `content/helpers.js` rather than building the string. `ProductShowcase` mirrors the selected product into the hash with `history.replaceState` (no router navigation, so the page does not jump), and `Products.jsx` reads the hash on every router navigation so links from other pages select the right product and scroll it into view.

## 5. Routing and pages

Routes live in `App.jsx`. Pages are lazy-loaded. `PublicLayout` wraps every public route with the navbar, footer and a fade transition, and scrolls to the top on pathname change unless the URL has a hash. The admin is a separate lazy chunk under `/admin/*` and is not linked from the public site.

A page is `<main>` with stacked `<section>`s. Each section is a `Box` with `py: SECTION_PY` holding a `<Container sx={{ px: CONTAINER_PX }}>`. Use `SectionHeader` for the overline / heading / description block and wrap blocks that should fade in on scroll in `AnimatedReveal`.

Legacy URLs (`/research`, `/use-cases`, `/products/alta-model`) redirect; keep those `<Navigate>` routes when adding new ones.

## 6. Design system

### Colours

Never hard-code a colour in a component. Get tokens from the theme context:

```jsx
const colors = useColors();
// colors.ink, colors.inkLight, colors.inkSurface      surfaces
// colors.text.primary / secondary / tertiary          text
// colors.accent, accentDim, accentBright, accentFaint, accentSubtle
// colors.border.subtle / default / strong
// colors.isDark                                        branch when a value must differ per mode
```

Both palettes live in `theme/colors.js`. Dark mode is near-black; light mode is built from pure white with cool tints (do not introduce grey bases in light mode). The MUI theme in `theme/theme.js` maps these to `palette`, typography and component overrides.

### Typography

Headings: Space Grotesk. Body: Inter. Labels, badges and metadata: IBM Plex Mono (`const MONO = '"IBM Plex Mono",monospace'`). Large headings use fluid sizes, e.g. `fontSize: 'clamp(1.75rem, 1.3rem + 1.4vw, 2.75rem)'`, so they scale with the viewport.

### Layout and responsiveness

- Containers default to `maxWidth="xl"` (1536px) via the theme. Use `<Container sx={{ px: CONTAINER_PX }}>` and `py: SECTION_PY` from `theme/layout.js`; do not invent new gutters.
- Breakpoints: `xs` phones, `sm` 600, `md` 900, `lg` 1200, `xl` 1536. Style mobile first: `{ xs: ..., md: ..., xl: ... }`.
- Grids use `minmax(0, 1fr)` tracks and children get `minWidth: 0` so long content can never widen the page. Text that must not break gets `whiteSpace: 'nowrap'` plus `overflow: 'hidden'`/`textOverflow: 'ellipsis'`.
- Test at 360, 390, 768, 1440, 1920 and 2560px. Nothing may scroll horizontally.

### Icons

Use `@mui/icons-material` components for every icon, including arrows, ticks and bullets. Do not use text characters (`→`, `✓`, `•`) or emoji as icons. Content-driven icons go through `<ContentIcon name="..." />` and the registry.

### Motion

framer-motion is used for entrance animations (`AnimatedReveal`, `SectionHeader`), carousel slides and the hero panel. Keep durations around 0.3 to 0.6s with the shared ease `[0.22, 1, 0.36, 1]`. `index.css` disables animation for users who prefer reduced motion.

### Copy

No em dashes or en dashes anywhere: not in content, code comments, admin labels or page titles. Use a comma, colon, parentheses or a plain hyphen. Page titles follow `Page - Yali Labs`.

## 7. The admin

`AdminApp` gates everything behind `useAuth`. `ModulePage` loads one module with `GET /content/:key`, renders its sections as tabs, and drives `SchemaForm`, a generic renderer for the field types above. Saving runs `sanitize()` (`admin/components/schema.js`), validates with the module's zod schema, shows issues per tab, then `PUT`s the module and refreshes both the admin and public caches. Ctrl/Cmd+S saves; unsaved changes are guarded on navigation and page unload.

You rarely touch these components. Adding content means editing the three module files in section 3.

## 8. API and demo mode

`lib/api/client.js` builds the axios instance from `VITE_API_URL`. When that variable is empty (or `VITE_USE_MOCK_API=true`), requests are answered by `lib/api/mock.js`, which implements the full contract from the README and persists saves in `localStorage` under a versioned key. Bump `STORAGE_KEY` in `mock.js` whenever a module's shape changes so stale demo saves are dropped.

The backend does not exist yet. The zod schemas define the exact payloads; the defaults are valid seed data.

## 9. Verifying changes

There is no test suite yet. Before opening a PR:

1. `npm run lint` and `npm run build` must pass.
2. Load every page you touched in both themes (toggle in the navbar).
3. Check phone (390px), tablet (768px) and wide (1920px+) widths in the browser's device toolbar. Confirm no horizontal scroll.
4. If you changed a module's shape, open it in `/admin`, save, and reload the public page.

## 10. Deployment

Vercel builds `npm run build` and serves `dist/` with SPA rewrites (`vercel.json`). The Content-Security-Policy there only allows `connect-src 'self'`; add the API origin when the backend goes live. Set `VITE_API_URL` in the Vercel project settings.
