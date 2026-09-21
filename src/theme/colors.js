/**
 * Yali Labs Design System — Color Tokens
 *
 * Accent palette: blues from the provided brand scale.
 *   400: #1a9fff  — vivid, used on dark backgrounds
 *   500: #0077e6  — solid, used on light backgrounds
 *   600: #005cb3  — deep, used for hover/dim
 */

const blue = {
  50:  '#e6f7ff',
  100: '#b3e0ff',
  200: '#80caff',
  300: '#4db5ff',
  400: '#1a9fff',
  500: '#0077e6',
  600: '#005cb3',
  700: '#004080',
  800: '#00264d',
  900: '#001433',
};

export const getDarkColors = () => ({
  // Surfaces
  ink:        '#0a0a0a',
  inkLight:   '#111111',
  inkMid:     '#1a1a1a',
  inkSurface: '#222222',
  inkElevated:'#2a2a2a',

  // Neutral grays (decorative / UI chrome)
  stone900: '#1c1c1c',
  stone800: '#2c2c2c',
  stone700: '#3d3d3d',
  stone600: '#555555',
  stone500: '#737373',
  stone400: '#9a9a9a',
  stone300: '#b8b8b8',
  stone200: '#d4d4d4',
  stone100: '#ececec',
  stone50:  '#f7f7f5',

  // Accent — vivid blue on dark
  accent:       blue[400],          // #1a9fff
  accentDim:    blue[600],          // #005cb3
  accentBright: blue[300],          // #4db5ff
  accentFaint:  'rgba(26,159,255,0.08)',
  accentSubtle: 'rgba(26,159,255,0.15)',

  // Text
  text: {
    primary:   '#f0f0ee',
    secondary: '#9a9a9a',
    tertiary:  '#636363',
    accent:    blue[400],
  },

  // Borders
  border: {
    subtle:  'rgba(255,255,255,0.06)',
    default: 'rgba(255,255,255,0.11)',
    strong:  'rgba(255,255,255,0.20)',
  },

  // Navbar backdrop
  navBg: 'rgba(10,10,10,0.92)',

  // Dot-grid color
  dotColor: '#2c2c2c',

  // Blue reference (for SVGs etc.)
  blue,
  isDark: true,
});

/**
 * Light mode is built outward from pure white. Every other surface is a very
 * faint cool tint of white (a whisper of the brand blue), and borders / grays
 * are slate-tinted so they read as "white with depth" rather than flat grey.
 */
export const getLightColors = () => ({
  // Surfaces — white base, then progressively cooler tints
  ink:        '#ffffff',
  inkLight:   '#f7f9fc',   // alternating sections, cards on white
  inkMid:     '#f0f4f9',
  inkSurface: '#e9eff6',   // chips, pills, inset panels
  inkElevated:'#dde5ef',

  // Neutral grays — slate-tinted so they harmonise with the blue accent
  stone900: '#f3f6fa',
  stone800: '#e4e9f0',
  stone700: '#b9c2ce',
  stone600: '#8d97a7',
  stone500: '#6a7488',
  stone400: '#4d576a',
  stone300: '#323b4c',
  stone200: '#1c2330',
  stone100: '#10151e',
  stone50:  '#0a0e15',

  // Accent — deeper blue on white
  accent:       blue[500],          // #0077e6
  accentDim:    blue[700],          // #004080
  accentBright: blue[400],          // #1a9fff
  accentFaint:  'rgba(0,119,230,0.06)',
  accentSubtle: 'rgba(0,119,230,0.12)',

  // Text — near-black with a cool undertone
  text: {
    primary:   '#0f1320',
    secondary: '#4b5566',
    tertiary:  '#8b94a5',
    accent:    blue[500],
  },

  // Borders — slate-tinted translucent lines blend into the white
  border: {
    subtle:  'rgba(15,23,42,0.08)',
    default: 'rgba(15,23,42,0.14)',
    strong:  'rgba(15,23,42,0.24)',
  },

  // Navbar backdrop
  navBg: 'rgba(255,255,255,0.86)',

  // Dot-grid color
  dotColor: '#d6dde7',

  // Blue reference
  blue,
  isDark: false,
});

// Static fallback for files that haven't migrated to the hook yet
export const colors = getDarkColors();
