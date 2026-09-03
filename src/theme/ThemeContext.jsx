import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getDarkColors, getLightColors } from './colors';
import { createAppTheme } from './theme';

const ColorCtx = createContext(null);
const ModeCtx  = createContext(null);

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('yali-theme') || 'dark'; }
    catch { return 'dark'; }
  });

  const colors = useMemo(
    () => (mode === 'dark' ? getDarkColors() : getLightColors()),
    [mode],
  );

  const muiTheme = useMemo(() => createAppTheme(mode, colors), [mode, colors]);

  const toggleMode = useCallback(() => {
    setMode(m => {
      const next = m === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('yali-theme', next); } catch {}
      return next;
    });
  }, []);

  return (
    <ModeCtx.Provider value={{ mode, toggleMode }}>
      <ColorCtx.Provider value={colors}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ColorCtx.Provider>
    </ModeCtx.Provider>
  );
}

/** Returns the current semantic color token object */
export const useColors = () => useContext(ColorCtx);

/** Returns { mode, toggleMode } */
export const useThemeMode = () => useContext(ModeCtx);
