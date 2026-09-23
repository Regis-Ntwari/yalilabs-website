/** Internal route for a product's section on /products. */
export const productHref = (product) => `/products#${encodeURIComponent(product.id || '')}`;

/** Two-letter initials from a full name, used when a member has none set. */
export function initialsFor(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '··';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
