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

export const getLightColors = () => ({
  // Surfaces
  ink:        '#f5f6f8',
  inkLight:   '#ffffff',
  inkMid:     '#eceef1',
  inkSurface: '#e4e6ea',
  inkElevated:'#d8dade',

  // Neutral grays
  stone900: '#f0f0ed',
  stone800: '#e0e0dd',
  stone700: '#b4b4b0',
  stone600: '#909090',
  stone500: '#6e6e6e',
  stone400: '#555555',
  stone300: '#333333',
  stone200: '#1a1a1a',
  stone100: '#0d0d0d',
  stone50:  '#080808',

  // Accent — deeper blue on light
  accent:       blue[500],          // #0077e6
  accentDim:    blue[700],          // #004080
  accentBright: blue[400],          // #1a9fff
  accentFaint:  'rgba(0,119,230,0.07)',
  accentSubtle: 'rgba(0,119,230,0.13)',

  // Text
  text: {
    primary:   '#0f1117',
    secondary: '#4a4a55',
    tertiary:  '#888896',
    accent:    blue[500],
  },

  // Borders
  border: {
    subtle:  'rgba(0,0,0,0.07)',
    default: 'rgba(0,0,0,0.13)',
    strong:  'rgba(0,0,0,0.22)',
  },

  // Navbar backdrop
  navBg: 'rgba(245,246,248,0.93)',

  // Dot-grid color
  dotColor: '#c8c8c5',

  // Blue reference
  blue,
  isDark: false,
});

// Static fallback for files that haven't migrated to the hook yet
export const colors = getDarkColors();
