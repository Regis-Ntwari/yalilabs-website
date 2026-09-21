import home from './home';
import products from './products';
import about from './about';
import team from './team';
import contact from './contact';
import footer from './footer';

/**
 * CODE DEFAULTS
 * The content shipped with the site, one object per admin module. The live
 * content comes from the API (see src/lib/api/content.js); these defaults fill
 * any missing section or field in an API response, and are what the public
 * site shows if the API cannot be reached.
 */
export const defaults = { home, products, about, team, contact, footer };

export const MODULE_KEYS = Object.keys(defaults);

/** Two-level merge: module → section. Arrays and primitives are replaced. */
export function mergeModule(base, patch) {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    const b = base?.[k];
    const bothObjects = b && v && typeof b === 'object' && typeof v === 'object' && !Array.isArray(b) && !Array.isArray(v);
    out[k] = bothObjects ? { ...b, ...v } : v;
  }
  return out;
}
