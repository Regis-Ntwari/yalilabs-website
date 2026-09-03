import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode, c) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main:         c.accent,
        light:        c.accentBright,
        dark:         c.accentDim,
        contrastText: mode === 'dark' ? '#0a0a0a' : '#ffffff',
      },
      secondary: {
        main:  c.stone400,
        light: c.stone300,
        dark:  c.stone600,
      },
      background: {
        default: c.ink,
        paper:   c.inkLight,
      },
      text: {
        primary:  c.text.primary,
        secondary: c.text.secondary,
        disabled:  c.text.tertiary,
      },
      divider: c.border.subtle,
      error:   { main: '#e05252' },
      success: { main: '#52c97c' },
    },
    typography: {
      fontFamily: '"Space Grotesk","Inter",system-ui,sans-serif',
      h1: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 },
      h2: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15 },
      h3: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25 },
      h4: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.3 },
      h5: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, letterSpacing: '-0.01em' },
      h6: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500 },
      body1: { fontFamily: '"Inter","Space Grotesk",sans-serif', fontWeight: 400, lineHeight: 1.7 },
      body2: { fontFamily: '"Inter","Space Grotesk",sans-serif', fontWeight: 400, lineHeight: 1.65, fontSize: '0.875rem' },
      subtitle1: { fontFamily: '"Inter",sans-serif', fontWeight: 400, lineHeight: 1.6 },
      subtitle2: { fontFamily: '"Inter",sans-serif', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' },
      caption: { fontFamily: '"IBM Plex Mono",monospace', fontSize: '0.75rem', letterSpacing: '0.05em' },
      button: { fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, letterSpacing: '0.01em', textTransform: 'none' },
      overline: { fontFamily: '"IBM Plex Mono",monospace', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.7rem' },
    },
    shape: { borderRadius: 4 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontFamily: '"Space Grotesk",sans-serif',
            fontWeight: 500,
            padding: '10px 22px',
            transition: 'all 0.2s ease',
            textTransform: 'none',
          },
          containedPrimary: {
            backgroundColor: c.accent,
            color: mode === 'dark' ? '#0a0a0a' : '#ffffff',
            '&:hover': {
              backgroundColor: mode === 'dark' ? c.accentBright : c.accentDim,
              transform: 'translateY(-1px)',
              boxShadow: `0 8px 24px ${c.accentSubtle}`,
            },
          },
          outlinedPrimary: {
            borderColor: c.border.default,
            color: c.text.primary,
            '&:hover': {
              borderColor: c.accent,
              color: c.accent,
              backgroundColor: c.accentFaint,
            },
          },
          text: {
            color: c.text.secondary,
            '&:hover': { color: c.accent, backgroundColor: 'transparent' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: c.inkLight,
            border: `1px solid ${c.border.subtle}`,
            borderRadius: 8,
            backgroundImage: 'none',
            transition: 'all 0.25s ease',
            '&:hover': { borderColor: c.border.default },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              backgroundColor: c.inkLight,
              '& fieldset': { borderColor: c.border.subtle },
              '&:hover fieldset': { borderColor: c.border.default },
              '&.Mui-focused fieldset': { borderColor: c.accent },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: c.accent },
            '& .MuiInputBase-input': { color: c.text.primary },
            '& .MuiInputLabel-root': { color: c.text.secondary },
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: c.border.subtle } },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontFamily: '"IBM Plex Mono",monospace', fontSize: '0.7rem', letterSpacing: '0.05em', borderRadius: 3 },
          outlined: { borderColor: c.border.default, color: c.text.secondary },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: { color: c.accent, textDecorationColor: 'transparent', '&:hover': { textDecorationColor: c.accent } },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: c.inkLight, backgroundImage: 'none' },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': { backgroundColor: c.accentFaint, color: c.accent },
            '&:hover': { backgroundColor: c.border.subtle },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: c.ink,
            color: c.text.primary,
            scrollBehavior: 'smooth',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: c.inkLight },
            '&::-webkit-scrollbar-thumb': {
              background: c.stone500,
              borderRadius: '3px',
              '&:hover': { background: c.stone400 },
            },
          },
          '*': { boxSizing: 'border-box' },
          '::selection': { backgroundColor: c.accentSubtle, color: c.text.primary },
        },
      },
    },
  });
