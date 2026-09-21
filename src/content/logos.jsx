/**
 * PARTNER LOGO REGISTRY
 * Partners are stored as data; each one references a logo by key.
 * `text` is a generic fallback that renders the partner name as a wordmark,
 * so new partners can be added from the admin without touching code.
 */
export const LOGOS = {
  azure: {
    label: 'Microsoft Azure',
    render: (colors) => (
      <svg viewBox="0 0 96 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, height: 29 }}>
        <path d="M32.68 7.36H28.9l-5.58 9.52-1.82-4.52h-3.56l3.44 7.94L18.5 24h3.7l10.48-16.64zM35 7.36l-4.3 7.64 4.3 7.36h4.28l-4.28-7.36 4.28-7.64H35z" fill={colors.isDark ? '#50b0f0' : '#0078D4'} />
        <path d="M12.4 7.36H8.12L2 24h4.28l4.54-11.74 2.44 5.42H9.7L8.3 21.12h5.84l1.7 2.88H20L12.4 7.36z" fill={colors.isDark ? '#50b0f0' : '#0078D4'} />
        <text x="42" y="19" fontFamily="'Segoe UI', sans-serif" fontSize="12" fontWeight="600" fill={colors.text.secondary}>azure</text>
      </svg>
    ),
  },
  microsoft: {
    label: 'Microsoft',
    render: (colors) => (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 130, height: 28 }}>
        <rect x="0" y="1" width="12" height="12" fill="#F25022" />
        <rect x="13" y="1" width="12" height="12" fill="#7FBA00" />
        <rect x="0" y="14" width="12" height="12" fill="#00A4EF" />
        <rect x="13" y="14" width="12" height="12" fill="#FFB900" />
        <text x="30" y="19" fontFamily="'Segoe UI', sans-serif" fontSize="12" fontWeight="600" fill={colors.text.secondary}>Microsoft</text>
      </svg>
    ),
  },
  nvidia: {
    label: 'NVIDIA',
    render: (colors) => (
      <svg viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 110, height: 28 }}>
        <path d="M8 14C8 8.48 12.48 4 18 4v3.6C14.46 7.6 11.6 10.46 11.6 14S14.46 20.4 18 20.4V24C12.48 24 8 19.52 8 14z" fill="#76B900" />
        <path d="M18 4v3.6c3.54 0 6.4 2.86 6.4 6.4S21.54 20.4 18 20.4V24c5.52 0 10-4.48 10-10S23.52 4 18 4z" fill={colors.isDark ? '#9fd350' : '#76B900'} opacity="0.7" />
        <text x="32" y="19" fontFamily="'Arial', sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1" fill={colors.text.secondary}>NVIDIA</text>
      </svg>
    ),
  },
  'google-cloud': {
    label: 'Google Cloud',
    render: (colors) => (
      <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 120, height: 28 }}>
        <path d="M13 10.5a5.5 5.5 0 0 1 10.8-1.1A4 4 0 0 1 27 13.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4 4 4 0 0 1 4-4h1z" fill="none" stroke={colors.isDark ? '#aaa' : '#5f6368'} strokeWidth="1.5" />
        <circle cx="11.5" cy="13.5" r="1.5" fill="#EA4335" />
        <circle cx="16" cy="13.5" r="1.5" fill="#FBBC04" />
        <circle cx="20.5" cy="13.5" r="1.5" fill="#34A853" />
        <text x="30" y="19" fontFamily="'Product Sans', 'Roboto', sans-serif" fontSize="12" fontWeight="500" fill={colors.text.secondary}>Google Cloud</text>
      </svg>
    ),
  },
  text: {
    label: 'Text wordmark (generic)',
    render: (colors, name) => (
      <span
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: '-0.01em',
          color: colors.text.primary,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    ),
  },
};

export const LOGO_OPTIONS = Object.entries(LOGOS).map(([value, l]) => ({ value, label: l.label }));

export function renderLogo(key, colors, name) {
  const logo = LOGOS[key] || LOGOS.text;
  return logo.render(colors, name);
}
