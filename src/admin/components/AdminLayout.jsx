import { useState } from 'react';
import { Box, Typography, IconButton, Drawer, Tooltip, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { useColors, useThemeMode } from '../../theme/ThemeContext';
import { modules } from '../modules';
import { useAdminUiStore } from '../../stores/adminUiStore';
import { useAuthUser } from '../../stores/authStore';
import { isMockApi } from '../../lib/api/client';
import { resetMockContent } from '../../lib/api/mock';
import { queryKeys } from '../../lib/queryClient';
import { useConfirm } from './ConfirmDialog';

const SIDEBAR_WIDTH = 248;
const MONO = '"IBM Plex Mono",monospace';

/** Mock-mode notice in the sidebar, with a way to restore the seeded demo content. */
function DemoNotice({ onReset }) {
  const colors = useColors();
  return (
    <Box sx={{ mx: 1.5, mb: 2, p: 1.5, borderRadius: '8px', border: '1px solid rgba(232,184,74,0.35)', backgroundColor: 'rgba(232,184,74,0.08)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
        <ScienceOutlinedIcon sx={{ fontSize: 14, color: colors.isDark ? '#e8c84a' : '#9a6b00' }} />
        <Typography sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.isDark ? '#e8c84a' : '#9a6b00' }}>
          Demo mode
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '11.5px', color: colors.text.secondary, lineHeight: 1.5 }}>
        No backend connected. Saves are kept in this browser only.
      </Typography>
      <Button
        onClick={onReset}
        variant="text"
        size="small"
        sx={{ mt: 0.75, p: 0, minWidth: 0, fontSize: '11.5px', color: colors.text.tertiary, '&:hover': { color: colors.accent, backgroundColor: 'transparent' } }}
      >
        Reset demo content
      </Button>
    </Box>
  );
}

function Brand() {
  const colors = useColors();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box sx={{ width: 28, height: 28, borderRadius: '5px', background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: '14px', color: colors.isDark ? '#0a0a0a' : '#ffffff', lineHeight: 1, letterSpacing: '-0.03em' }}>
          Y
        </Typography>
      </Box>
      <Box sx={{ lineHeight: 1 }}>
        <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '14.5px', letterSpacing: '-0.01em', color: colors.text.primary, lineHeight: 1.1 }}>
          Yali Labs
        </Typography>
        <Typography sx={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.accent, mt: 0.4 }}>
          Content admin
        </Typography>
      </Box>
    </Box>
  );
}

function NavItem({ to, icon: Icon, label, active, onNavigate }) {
  const colors = useColors();
  return (
    <Box
      component={Link}
      to={to}
      onClick={(e) => onNavigate(e, to)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: 1,
        borderRadius: '6px',
        textDecoration: 'none',
        color: active ? colors.accent : colors.text.secondary,
        backgroundColor: active ? colors.accentFaint : 'transparent',
        transition: 'all 0.15s ease',
        '&:hover': { backgroundColor: active ? colors.accentFaint : colors.border.subtle, color: active ? colors.accent : colors.text.primary },
      }}
    >
      <Icon sx={{ fontSize: 18, opacity: active ? 1 : 0.8 }} />
      <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '-0.005em', flex: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}

function Sidebar({ onNavigate, onLogout, onResetDemo, signingOut, onClose }) {
  const colors = useColors();
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();
  const user = useAuthUser();
  const isDark = mode === 'dark';
  const mock = isMockApi();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2.25, borderBottom: `1px solid ${colors.border.subtle}` }}>
        <Brand />
        {onClose && (
          <IconButton onClick={onClose} size="small" aria-label="Close menu" sx={{ color: colors.text.secondary }}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
        <Typography sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.text.tertiary, px: 1.5, mb: 1 }}>
          Pages
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          {modules.map((m) => {
            const to = `/admin/${m.key}`;
            return (
              <NavItem
                key={m.key}
                to={to}
                icon={m.icon}
                label={m.label}
                active={location.pathname === to}
                onNavigate={onNavigate}
              />
            );
          })}
        </Box>
      </Box>

      {mock && <DemoNotice onReset={onResetDemo} />}

      <Box sx={{ px: 2, py: 2, borderTop: `1px solid ${colors.border.subtle}`, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {user?.email && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 0.5, minWidth: 0 }}>
            <AccountCircleIcon sx={{ fontSize: 18, color: colors.text.tertiary, flexShrink: 0 }} />
            <Typography
              title={user.email}
              sx={{ fontFamily: '"Inter",sans-serif', fontSize: '12.5px', color: colors.text.secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {user.name || user.email}
            </Typography>
          </Box>
        )}
        <Button
          component="a"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          fullWidth
          endIcon={<OpenInNewIcon sx={{ fontSize: '13px !important' }} />}
          sx={{ fontSize: '13px', justifyContent: 'space-between', px: 1.5 }}
        >
          View site
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={toggleMode}
              size="small"
              aria-label="Toggle theme"
              sx={{ color: colors.text.secondary, border: `1px solid ${colors.border.subtle}`, borderRadius: '6px', flex: 1, '&:hover': { color: colors.accent, borderColor: colors.accent, backgroundColor: colors.accentFaint } }}
            >
              {isDark ? <WbSunnyIcon sx={{ fontSize: 16 }} /> : <DarkModeIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign out">
            <span style={{ flex: 1, display: 'flex' }}>
              <IconButton
                onClick={onLogout}
                disabled={signingOut}
                size="small"
                aria-label="Sign out"
                sx={{ color: colors.text.secondary, border: `1px solid ${colors.border.subtle}`, borderRadius: '6px', flex: 1, '&:hover': { color: '#d04b4b', borderColor: '#d04b4b55', backgroundColor: 'rgba(208,75,75,0.06)' } }}
              >
                <LogoutIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default function AdminLayout({ children, onLogout, signingOut = false }) {
  const colors = useColors();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const dirty = useAdminUiStore((s) => s.dirty);
  const [confirm, confirmDialog] = useConfirm();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Mock mode only: drop every saved edit and reload the seeded demo content.
  const handleResetDemo = async () => {
    setDrawerOpen(false);
    const ok = await confirm({
      title: 'Reset demo content?',
      body: 'Every change saved in this browser is discarded and all modules go back to the seeded demo content.',
      confirmLabel: 'Reset demo content',
      danger: true,
    });
    if (!ok) return;
    resetMockContent();
    await qc.invalidateQueries({ queryKey: queryKeys.content });
  };

  // Guard in-app navigation while a module has unsaved changes.
  const handleNavigate = async (e, to) => {
    setDrawerOpen(false);
    if (!dirty) return;
    e.preventDefault();
    const ok = await confirm({
      title: 'Leave without saving?',
      body: 'You have unsaved changes in this module. They will be lost if you leave now.',
      confirmLabel: 'Leave anyway',
      danger: true,
    });
    if (ok) navigate(to);
  };

  const handleLogout = async () => {
    if (dirty) {
      const ok = await confirm({
        title: 'Sign out without saving?',
        body: 'You have unsaved changes. They will be lost.',
        confirmLabel: 'Sign out',
        danger: true,
      });
      if (!ok) return;
    }
    onLogout();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.ink }}>
      {/* Desktop sidebar */}
      <Box
        component="aside"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          borderRight: `1px solid ${colors.border.subtle}`,
          backgroundColor: colors.inkLight,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Sidebar onNavigate={handleNavigate} onLogout={handleLogout} onResetDemo={handleResetDemo} signingOut={signingOut} />
      </Box>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: SIDEBAR_WIDTH + 24, backgroundColor: colors.inkLight, backgroundImage: 'none', borderRight: `1px solid ${colors.border.subtle}` } } }}
      >
        <Sidebar onNavigate={handleNavigate} onLogout={handleLogout} onResetDemo={handleResetDemo} signingOut={signingOut} onClose={() => setDrawerOpen(false)} />
      </Drawer>

      {/* Main */}
      <Box component="main" sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${colors.border.subtle}`,
            backgroundColor: colors.inkLight,
          }}
        >
          <Brand />
          <IconButton onClick={() => setDrawerOpen(true)} aria-label="Open menu" sx={{ color: colors.text.primary }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1 }}>{children}</Box>
      </Box>

      {confirmDialog}
    </Box>
  );
}
