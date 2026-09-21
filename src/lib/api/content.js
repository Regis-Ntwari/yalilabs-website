import { api } from './client';
import { MODULE_KEYS } from '../../content/defaults';

/**
 * CONTENT ENDPOINTS
 *
 *   GET /content         → { home: {...}, products: {...}, about: {...}, team: {...}, contact: {...}, footer: {...} }
 *   GET /content/:key    → the module object, e.g. { hero: {...}, mission: {...}, ... }
 *   PUT /content/:key    body: the full module object → the saved module object
 *
 * Responses are raw JSON; parsing/validation against the zod schemas happens in
 * src/content/useContent.js and the admin hooks, so this file stays transport-only.
 */

export async function fetchAllContent() {
  const { data } = await api.get('/content', { skipAuth: true });
  return data && typeof data === 'object' ? data : {};
}

export async function fetchModule(key) {
  assertKey(key);
  const { data } = await api.get(`/content/${key}`);
  return data && typeof data === 'object' ? data : {};
}

export async function saveModule(key, value) {
  assertKey(key);
  const { data } = await api.put(`/content/${key}`, value);
  return data && typeof data === 'object' && Object.keys(data).length > 0 ? data : value;
}

function assertKey(key) {
  if (!MODULE_KEYS.includes(key)) throw new Error(`Unknown content module "${key}"`);
}
