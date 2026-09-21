/**
 * Schema helpers shared by the form renderer and the module page.
 *
 * Field types:
 *   text | textarea | number | boolean | select | lines | pipe | numbers | list | object
 *
 * `lines`, `pipe` and `numbers` are arrays edited as delimited text; while
 * editing they may hold raw strings, and `sanitize` normalises them on save.
 */

export function emptyValueFor(field) {
  switch (field.type) {
    case 'boolean': return false;
    case 'number': return 0;
    case 'lines':
    case 'pipe':
    case 'numbers':
    case 'list': return [];
    case 'object': return Object.fromEntries((field.fields || []).map((f) => [f.name, emptyValueFor(f)]));
    case 'select': return field.options?.[0]?.value ?? '';
    default: return '';
  }
}

export function newItemFor(field) {
  if (field.newItem) return JSON.parse(JSON.stringify(field.newItem));
  return emptyValueFor({ type: 'object', fields: field.itemFields });
}

export function sanitize(fields, value) {
  const out = { ...(value || {}) };
  for (const f of fields) {
    const v = out[f.name];
    switch (f.type) {
      case 'lines':
        out[f.name] = (Array.isArray(v) ? v : []).map((s) => String(s).trim()).filter(Boolean);
        break;
      case 'pipe':
        out[f.name] = (Array.isArray(v) ? v : []).map(String).filter((s) => s !== '');
        break;
      case 'numbers':
        out[f.name] = (Array.isArray(v) ? v : [])
          .map((s) => (typeof s === 'number' ? s : Number(String(s).trim())))
          .filter((n) => Number.isFinite(n));
        break;
      case 'number':
        out[f.name] = v === '' || v == null || Number.isNaN(Number(v)) ? 0 : Number(v);
        break;
      case 'boolean':
        out[f.name] = Boolean(v);
        break;
      case 'text':
      case 'select':
        out[f.name] = typeof v === 'string' ? v.trim() : (v ?? '');
        break;
      case 'textarea':
        out[f.name] = typeof v === 'string' ? v.trim() : (v ?? '');
        break;
      case 'list':
        out[f.name] = (Array.isArray(v) ? v : []).map((item) => sanitize(f.itemFields, item));
        break;
      case 'object':
        out[f.name] = sanitize(f.fields, v);
        break;
      default:
        break;
    }
  }
  return out;
}

/** Order-insensitive deep equality for plain JSON data. */
export function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object') {
    if (Array.isArray(b)) return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

let uidCounter = 0;
export const newUid = () => `u${Date.now().toString(36)}${(uidCounter++).toString(36)}`;
