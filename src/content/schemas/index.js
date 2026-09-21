import home from './home';
import products from './products';
import about from './about';
import team from './team';
import contact from './contact';
import footer from './footer';
import { defaults, mergeModule } from '../defaults';

/**
 * CONTENT SCHEMAS
 * One zod schema per admin module. They validate what the admin saves and what
 * the API returns. Keys must match src/content/defaults.
 */
export const schemas = { home, products, about, team, contact, footer };

export const getSchema = (key) => schemas[key];

/**
 * Turn an API payload for one module into a trusted value: missing sections or
 * fields fall back to the code defaults, then the whole thing is validated.
 * Returns `{ value, issues }`; `value` is always usable (defaults on failure).
 */
export function parseModule(key, raw) {
  const schema = schemas[key];
  const merged = mergeModule(defaults[key], raw);
  if (!schema) return { value: merged, issues: [] };
  const result = schema.safeParse(merged);
  if (result.success) return { value: result.data, issues: [] };
  if (import.meta.env.DEV) {
    console.warn(`[content] "${key}" from the API failed validation; using defaults for it.`, result.error.issues);
  }
  return { value: defaults[key], issues: result.error.issues };
}

/** Parse the full `GET /content` payload. Unknown keys are ignored. */
export function parseAllContent(raw) {
  const out = {};
  for (const key of Object.keys(defaults)) out[key] = parseModule(key, raw?.[key]).value;
  return out;
}

/** Validate an admin draft before saving. Returns `{ ok, data, issues }`. */
export function validateModule(key, value) {
  const schema = schemas[key];
  if (!schema) return { ok: true, data: value, issues: [] };
  const result = schema.safeParse(value);
  return result.success
    ? { ok: true, data: result.data, issues: [] }
    : { ok: false, data: value, issues: result.error.issues };
}

/** "catalog › items › 2 › id" style label for a zod issue path. */
export function describeIssuePath(path = []) {
  return path
    .map((p) => (typeof p === 'number' ? `#${p + 1}` : String(p)))
    .join(' › ');
}
