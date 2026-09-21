# Yali Labs website

React 19 + Vite + MUI single-page site, deployed on Vercel. Content is served by an API and edited in a hidden admin.

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run lint
```

## Configuration

| Variable       | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `VITE_API_URL` | Base URL of the content/auth API, no trailing slash. |

- Local development: put it in `.env.local` (git-ignored, see `.env.example`).
- Production: set it in Vercel → Project → Settings → Environment Variables, then redeploy.
- The Content-Security-Policy in `vercel.json` only allows `connect-src 'self'`. Add the API origin there (e.g. `connect-src 'self' https://api.yalilabs.com`) or requests from the deployed site will be blocked by the browser.

## Content admin (`/admin`)

Nothing on the public site links to it. Editors sign in with **email + password**, then edit one module per page:
**Home, Products, About, Team, Contact, Footer**. Every save is a `PUT` to the API and is live for all visitors immediately.

Stack: [TanStack Query](https://tanstack.com/query) for fetching/caching, [axios](https://axios-http.com) for HTTP, [zustand](https://zustand.docs.pmnd.rs) for the auth session and admin UI state, [zod](https://zod.dev) for validation.

```
src/lib/api/client.js          axios instance: base URL, bearer token, 401 → sign out
src/lib/api/auth.js            login / me / logout + login form schema
src/lib/api/content.js         GET /content, GET|PUT /content/:key
src/lib/queryClient.js         QueryClient + query keys
src/stores/authStore.js        session token + user (persisted in sessionStorage)
src/stores/adminUiStore.js     unsaved-changes flag shared with the layout
src/content/defaults/*.js      code defaults per module (fallback + "reset to defaults")
src/content/schemas/*.js       zod schema per module
src/content/useContent.js      useSiteContent() / useModule(key) for the public site
src/admin/hooks/*.js           useLogin/useLogout/useMe, useModuleQuery/useSaveModule
src/admin/modules/*.js         form definition (sections + fields) per module
```

### How content flows

- **Public site** – `useSiteContent()` loads everything with one `GET /content` and caches it for the session. Each module is merged over its code defaults and validated with zod; if the API is unreachable or a module fails validation, the defaults are shown so the site never renders empty.
- **Admin** – `useModuleQuery(key)` loads one module with `GET /content/:key`. Saving sanitises the form, validates it with the module's zod schema (errors are listed above the form and the offending tab is highlighted), then `PUT /content/:key`. On success the admin cache and the public cache are refreshed.
- **Reset to defaults** writes the code defaults to the API.

### API contract

The frontend expects these endpoints under `VITE_API_URL`. Responses are plain JSON.

| Method | Path            | Auth   | Request body                 | Response                                                           |
| ------ | --------------- | ------ | ---------------------------- | ------------------------------------------------------------------ |
| POST   | `/auth/login`   | none   | `{ email, password }`        | `{ token, user: { id, email, name? } }`; `401` on bad credentials |
| GET    | `/auth/me`      | bearer | –                            | `{ user: { id, email, name? } }` (or the user object directly)     |
| POST   | `/auth/logout`  | bearer | –                            | `204`                                                              |
| GET    | `/content`      | none   | –                            | `{ home, products, about, team, contact, footer }`                 |
| GET    | `/content/:key` | bearer | –                            | the module object, e.g. `{ hero: {…}, mission: {…}, … }`           |
| PUT    | `/content/:key` | bearer | the full module object       | the saved module object                                            |

- Authenticated requests send `Authorization: Bearer <token>`. Any `401` on an authenticated request signs the admin out.
- Error responses may include `{ message }` (or `{ error }`); it is shown to the editor.
- `key` is one of `home`, `products`, `about`, `team`, `contact`, `footer`. The exact shape of each module is the zod schema in `src/content/schemas/<key>.js`; the defaults in `src/content/defaults/<key>.js` are valid example payloads to seed the database with.

### Adding editable content

1. Add the default value in `src/content/defaults/<module>.js`.
2. Add it to the zod schema in `src/content/schemas/<module>.js`.
3. Add a field for it in `src/admin/modules/<module>.js` (types: `text`, `textarea`, `number`, `boolean`, `select`, `lines`, `pipe`, `numbers`, `list`, `object`).
4. Read it in the page via `useModule('<module>')`.

Icons, partner logos and social platforms are referenced by name; extend `src/content/icons.js`, `src/content/logos.jsx` or `src/content/socials.js` to offer more choices.

### Pages outside the admin

`/research`, `/use-cases` and the 404 page are not linked from the navigation and are not editable. Their copy lives in `src/content/static/`.
