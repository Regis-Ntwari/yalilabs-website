import { AxiosError } from 'axios';
import { defaults, MODULE_KEYS } from '../../content/defaults';

/**
 * MOCK API
 *
 * An in-browser stand-in for the content/auth backend so the admin and the
 * public site can be demoed before the API exists. It implements the exact
 * contract from the README (see src/lib/api/client.js for how it is enabled):
 *
 *   POST /auth/login      GET /auth/me      POST /auth/logout
 *   GET  /content         GET /content/:key PUT  /content/:key
 *
 * Content starts from `SEED_CONTENT` and every PUT is written to localStorage,
 * so edits survive a reload and show up on the public site in the same browser.
 * Responses are delayed a little so loading and saving states are visible.
 */

export const DEMO_ACCOUNTS = [
  { id: 'usr_demo_admin', email: 'admin@yalilabs.com', password: 'yalilabs2026', name: 'Demo Admin' },
  { id: 'usr_demo_editor', email: 'editor@yalilabs.com', password: 'editor2026', name: 'Demo Editor' },
];

// Bump the suffix whenever the content shape changes so stale demo saves are dropped.
const STORAGE_KEY = 'yali-mock-content-v2';
const TOKEN_PREFIX = 'demo-token.';
const LATENCY = { min: 250, max: 650 };

/* ------------------------------------------------------------------ */
/* Seed content: the code defaults with a few edits, so some modules   */
/* show as "Live" in the admin and others as "Default content".        */
/* ------------------------------------------------------------------ */

const clone = (v) => JSON.parse(JSON.stringify(v));

function buildSeed() {
  const seed = clone(defaults);

  seed.home.hero.subtitle =
    'Yali Labs builds language technologies, foundation models, and developer tools designed around African languages, starting with Kinyarwanda and expanding across East Africa.';
  seed.home.hero.ctaLabel = 'See what we are building';
  seed.home.mission.stats[2] = { value: '15M+', label: 'Kinyarwanda speakers in East Africa', note: 'Rwanda, Uganda, DRC, Tanzania' };

  seed.team.hero.description =
    'A small team of researchers, engineers, and builders working from Kigali, Rwanda. United by one mission: AI that starts from African languages.';
  seed.team.join.lookFor.push('Fluency in Kinyarwanda or another African language');

  seed.contact.info.reasons.splice(3, 0, 'Speaking & event invitations');

  return seed;
}

export const SEED_CONTENT = buildSeed();

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return { ...clone(SEED_CONTENT), ...parsed };
    }
  } catch {
    /* fall through to the seed */
  }
  return clone(SEED_CONTENT);
}

function writeStore(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    /* storage unavailable (private mode, quota); the in-memory copy still works */
  }
}

let memory = null;
const getContent = () => (memory ??= readStore());

/** Drop every saved edit and go back to the seed content. */
export function resetMockContent() {
  memory = clone(SEED_CONTENT);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

const publicUser = ({ id, email, name }) => ({ id, email, name });

function issueToken(user) {
  return `${TOKEN_PREFIX}${user.id}.${Math.random().toString(36).slice(2, 10)}`;
}

function userFromToken(header) {
  const token = String(header || '').replace(/^Bearer\s+/i, '');
  if (!token.startsWith(TOKEN_PREFIX)) return null;
  const id = token.slice(TOKEN_PREFIX.length).split('.')[0];
  return DEMO_ACCOUNTS.find((u) => u.id === id) ?? null;
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const ok = (data, status = 200) => ({ status, data });
const fail = (status, message) => ({ status, data: { message } });

function route(method, path, body, headers) {
  if (method === 'POST' && path === '/auth/login') {
    const email = String(body?.email || '').trim().toLowerCase();
    const password = String(body?.password || '');
    const user = DEMO_ACCOUNTS.find((u) => u.email === email && u.password === password);
    if (!user) return fail(401, 'Incorrect email or password.');
    return ok({ token: issueToken(user), user: publicUser(user) });
  }

  if (path === '/auth/me' || path === '/auth/logout') {
    const user = userFromToken(headers.Authorization ?? headers.authorization);
    if (!user) return fail(401, 'Your session has expired. Please sign in again.');
    if (method === 'GET' && path === '/auth/me') return ok({ user: publicUser(user) });
    if (method === 'POST' && path === '/auth/logout') return ok(null, 204);
  }

  if (method === 'GET' && path === '/content') {
    return ok(clone(getContent()));
  }

  const match = path.match(/^\/content\/([a-z]+)$/);
  if (match) {
    const key = match[1];
    if (!MODULE_KEYS.includes(key)) return fail(404, `Unknown content module "${key}".`);

    const user = userFromToken(headers.Authorization ?? headers.authorization);
    if (!user) return fail(401, 'Your session has expired. Please sign in again.');

    if (method === 'GET') return ok(clone(getContent()[key]));
    if (method === 'PUT') {
      if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'The request body must be the module object.');
      const content = getContent();
      content[key] = clone(body);
      writeStore(content);
      return ok(clone(content[key]));
    }
  }

  return fail(404, `No mock handler for ${method} ${path}.`);
}

/* ------------------------------------------------------------------ */
/* Axios adapter                                                       */
/* ------------------------------------------------------------------ */

function pathOf(config) {
  const raw = String(config.url || '');
  const base = String(config.baseURL || '');
  const stripped = base && raw.startsWith(base) ? raw.slice(base.length) : raw;
  try {
    return new URL(stripped, 'http://mock.local').pathname.replace(/\/+$/, '') || '/';
  } catch {
    return stripped;
  }
}

function parseBody(data) {
  if (data == null) return null;
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return data;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function mockAdapter(config) {
  const method = String(config.method || 'get').toUpperCase();
  const path = pathOf(config);
  const headers = typeof config.headers?.toJSON === 'function' ? config.headers.toJSON() : { ...(config.headers || {}) };

  await sleep(LATENCY.min + Math.random() * (LATENCY.max - LATENCY.min));

  const result = route(method, path, parseBody(config.data), headers);
  const response = {
    data: result.data,
    status: result.status,
    statusText: result.status < 400 ? 'OK' : 'Error',
    headers: { 'content-type': 'application/json' },
    config,
    request: { mock: true, method, path },
  };

  if (result.status >= 400) {
    throw new AxiosError(result.data?.message || 'Request failed', AxiosError.ERR_BAD_RESPONSE, config, response.request, response);
  }
  return response;
}
