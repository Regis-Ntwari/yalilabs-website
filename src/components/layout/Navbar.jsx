import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useScrollTrigger,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Link, useLocation } from 'react-router-dom';
import { useColors, useThemeMode } from '../../theme/ThemeContext';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/company/about-us' },
  { label: 'Team', href: '/company/our-team' },
  { label: 'Contact', href: '/contact-us' },
];

function YaliLogo() {
  const colors = useColors();
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        transition: 'opacity 0.2s',
        '&:hover': { opacity: 0.75 },
      }}
      aria-label="Yali Labs — Home"
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '5px',
          background: colors.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Space Grotesk",sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: colors.isDark ? '#0a0a0a' : '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Y
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: '"Space Grotesk",sans-serif',
          fontWeight: 600,
          fontSize: '15px',
          letterSpacing: '-0.01em',
          color: colors.text.primary,
        }}
      >
        Yali Labs
      </Typography>
    </Box>
  );
}

function NavLink({ item, isActive }) {
  const colors = useColors();
  return (
    <Button
      component={Link}
      to={item.href}
      sx={{
        color: isActive ? colors.accent : colors.text.secondary,
        fontFamily: '"Space Grotesk",sans-serif',
        fontWeight: 500,
        fontSize: '13.5px',
        px: 1.5,
        py: 0.75,
        minWidth: 'auto',
        transition: 'color 0.15s ease',
        position: 'relative',
        '&:hover': { color: colors.text.primary, backgroundColor: 'transparent' },
        '&::after': isActive
          ? {
            content: '""',
            position: 'absolute',
            bottom: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: colors.accent,
          }
          : {},
      }}
    >
      {item.label}
    </Button>
  );
}

function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const colors = useColors();
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        size="small"
        sx={{
          color: colors.text.secondary,
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '6px',
          p: 0.75,
          transition: 'all 0.2s ease',
          '&:hover': {
            color: colors.accent,
            borderColor: colors.accent,
            backgroundColor: colors.accentFaint,
          },
        }}
      >
        {isDark
          ? <WbSunnyIcon sx={{ fontSize: 16 }} />
          : <DarkModeIcon sx={{ fontSize: 16 }} />}
      </IconButton>
    </Tooltip>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const colors = useColors();

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 40 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? colors.navBg : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? `1px solid ${colors.border.subtle}`
            : '1px solid transparent',
          transition: 'all 0.3s ease',
          zIndex: 1200,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            height: scrolled ? 56 : 68,
            minHeight: 'unset !important',
            transition: 'height 0.3s ease',
            justifyContent: 'space-between',
          }}
        >
          <YaliLogo />

          {/* Desktop nav */}
          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map(item => (
              <NavLink key={item.href} item={item} isActive={location.pathname === item.href} />
            ))}
          </Box>

          {/* Desktop actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.25 }}>
            <ThemeToggle />
            {/* <Button
              component="a"
              href="https://altatokenizer.yalilabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              endIcon={<ArrowOutwardIcon sx={{ fontSize: '12px !important' }} />}
              sx={{ fontSize: '13px', py: 0.75, px: 2 }}
            >
              Try Alta
            </Button> */}
          </Box>

          {/* Mobile icons */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <IconButton
              sx={{ color: colors.text.primary }}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: colors.inkLight,
            borderLeft: `1px solid ${colors.border.subtle}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2.5,
              borderBottom: `1px solid ${colors.border.subtle}`,
            }}
          >
            <YaliLogo />
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu" sx={{ color: colors.text.secondary }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ flex: 1, px: 2, py: 3 }}>
            {navItems.map(item => (
              <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.href}
                  onClick={() => setDrawerOpen(false)}
                  selected={location.pathname === item.href}
                  sx={{ borderRadius: 1.5, py: 1.25, px: 2 }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: '"Space Grotesk",sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      letterSpacing: '-0.01em',
                      color: location.pathname === item.href ? colors.accent : colors.text.primary,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ px: 3, py: 3, borderTop: `1px solid ${colors.border.subtle}` }}>
            <Button
              component="a"
              href="https://altatokenizer.yalilabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              fullWidth
              endIcon={<ArrowOutwardIcon sx={{ fontSize: '12px !important' }} />}
              onClick={() => setDrawerOpen(false)}
              sx={{ py: 1.25 }}
            >
              Try Alta Tokenizer
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Spacer */}
      <Box sx={{ height: 68 }} />
    </>
  );
}
