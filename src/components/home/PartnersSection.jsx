import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';
import AnimatedReveal from '../common/AnimatedReveal';

/* ─── Partner data with official SVG logos ──────────────────────────────── */
const partners = [
  {
    name: 'Microsoft Azure',
    href: 'https://azure.microsoft.com/',
    description: 'Cloud compute & AI infrastructure',
    logo: (colors) => (
      <svg viewBox="0 0 96 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, height: 29 }}>
        {/* Azure wordmark */}
        <path d="M32.68 7.36H28.9l-5.58 9.52-1.82-4.52h-3.56l3.44 7.94L18.5 24h3.7l10.48-16.64zM35 7.36l-4.3 7.64 4.3 7.36h4.28l-4.28-7.36 4.28-7.64H35z" fill={colors.isDark ? '#50b0f0' : '#0078D4'} />
        {/* Azure icon triangle */}
        <path d="M12.4 7.36H8.12L2 24h4.28l4.54-11.74 2.44 5.42H9.7L8.3 21.12h5.84l1.7 2.88H20L12.4 7.36z" fill={colors.isDark ? '#50b0f0' : '#0078D4'} />
        {/* "azure" text */}
        <text x="42" y="19" fontFamily="'Segoe UI', sans-serif" fontSize="12" fontWeight="600" fill={colors.text.secondary}>azure</text>
      </svg>
    ),
  },
  {
    name: 'Microsoft Founders Hub',
    href: 'https://www.microsoft.com/en-us/startups',
    description: 'Cloud credits & startup resources',
    logo: (colors) => (
      <svg viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 130, height: 28 }}>
        {/* Microsoft 4-square logo */}
        <rect x="0" y="1" width="12" height="12" fill="#F25022" />
        <rect x="13" y="1" width="12" height="12" fill="#7FBA00" />
        <rect x="0" y="14" width="12" height="12" fill="#00A4EF" />
        <rect x="13" y="14" width="12" height="12" fill="#FFB900" />
        <text x="30" y="19" fontFamily="'Segoe UI', sans-serif" fontSize="12" fontWeight="600" fill={colors.text.secondary}>Microsoft</text>
      </svg>
    ),
  },
  {
    name: 'NVIDIA Inception',
    href: 'https://www.nvidia.com/en-us/deep-learning-ai/startups/',
    description: 'GPU technology & AI startup support',
    logo: (colors) => (
      <svg viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 110, height: 28 }}>
        {/* NVIDIA eye logo simplified */}
        <path d="M8 14C8 8.48 12.48 4 18 4v3.6C14.46 7.6 11.6 10.46 11.6 14S14.46 20.4 18 20.4V24C12.48 24 8 19.52 8 14z" fill={colors.isDark ? '#76b900' : '#76B900'} />
        <path d="M18 4v3.6c3.54 0 6.4 2.86 6.4 6.4S21.54 20.4 18 20.4V24c5.52 0 10-4.48 10-10S23.52 4 18 4z" fill={colors.isDark ? '#9fd350' : '#76B900'} opacity="0.7" />
        <text x="32" y="19" fontFamily="'Arial', sans-serif" fontSize="11.5" fontWeight="700" letterSpacing="1" fill={colors.text.secondary}>NVIDIA</text>
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    href: 'https://cloud.google.com/',
    description: 'ML infrastructure & large-scale data',
    logo: (colors) => (
      <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 120, height: 28 }}>
        {/* Google Cloud icon - simplified cloud with colours */}
        <path d="M13 10.5a5.5 5.5 0 0 1 10.8-1.1A4 4 0 0 1 27 13.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4 4 4 0 0 1 4-4h1z" fill="none" stroke={colors.isDark ? '#aaa' : '#5f6368'} strokeWidth="1.5" />
        <circle cx="11.5" cy="13.5" r="1.5" fill="#EA4335" />
        <circle cx="16" cy="13.5" r="1.5" fill="#FBBC04" />
        <circle cx="20.5" cy="13.5" r="1.5" fill="#34A853" />
        <text x="30" y="19" fontFamily="'Product Sans', 'Roboto', sans-serif" fontSize="12" fontWeight="500" fill={colors.text.secondary}>Google Cloud</text>
      </svg>
    ),
  },
];

// Triple the list — the CSS animation shifts the track by -33.33% then resets
// invisibly back to 0%, so the loop is always seamless with no gap.
const TRACK = [...partners, ...partners, ...partners];

export default function PartnersSection() {
  const colors = useColors();
  const [paused, setPaused] = useState(false);

  return (
    <Box
      component="section"
      aria-labelledby="partners-heading"
      sx={{
        py: { xs: 10, md: 12 },
        borderTop: `1px solid ${colors.border.subtle}`,
        backgroundColor: colors.inkLight,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <AnimatedReveal>
          <Box sx={{ mb: { xs: 7, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}
            >
              Partners &amp; Programs
            </Typography>
            <Typography
              id="partners-heading"
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: colors.text.primary,
                maxWidth: 500,
              }}
            >
              Supported by institutions that back serious research.
            </Typography>
          </Box>
        </AnimatedReveal>
      </Container>

      {/* Sliding track — full bleed */}
      <Box
        sx={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left fade mask */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: `linear-gradient(to right, ${colors.inkLight} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Right fade mask */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: `linear-gradient(to left, ${colors.inkLight} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />

        {/* CSS keyframe — shifts the 3× track by one-third, then instantly resets */}
        <style>{`
          @keyframes partners-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.3333%); }
          }
        `}</style>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            py: 2,
            width: 'max-content',
            animation: 'partners-marquee 22s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {TRACK.map((p, i) => (
            <Box
              key={`${p.name}-${i}`}
              component="a"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — ${p.description}`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
                px: 4,
                py: 3,
                border: `1px solid ${colors.border.subtle}`,
                borderRadius: '10px',
                backgroundColor: colors.ink,
                textDecoration: 'none',
                minWidth: 200,
                flexShrink: 0,
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: colors.accent + '55',
                  backgroundColor: colors.inkSurface,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 8px 24px ${colors.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'}`,
                },
              }}
            >
              {/* Logo */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 36,
                  opacity: colors.isDark ? 0.9 : 0.85,
                  transition: 'opacity 0.2s ease',
                  '&:hover': { opacity: 1 },
                }}
              >
                {p.logo(colors)}
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '11.5px',
                  color: colors.text.tertiary,
                  textAlign: 'center',
                  lineHeight: 1.5,
                  maxWidth: 150,
                }}
              >
                {p.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
