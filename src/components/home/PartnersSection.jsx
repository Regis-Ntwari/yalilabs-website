import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';
import { useModule } from '../../content/useContent';
import { renderLogo } from '../../content/logos';
import AnimatedReveal from '../common/AnimatedReveal';

export default function PartnersSection() {
  const colors = useColors();
  const { partners } = useModule('home');
  const [paused, setPaused] = useState(false);
  const items = partners.items || [];

  if (items.length === 0) return null;

  // Triple the list — the CSS animation shifts the track by -33.33% then resets
  // invisibly back to 0%, so the loop is always seamless with no gap.
  const track = [...items, ...items, ...items];

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
              {partners.overline}
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
              {partners.heading}
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
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: `linear-gradient(to right, ${colors.inkLight} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: `linear-gradient(to left, ${colors.inkLight} 0%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />

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
            animation: `partners-marquee ${Math.max(12, items.length * 5.5)}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {track.map((p, i) => (
            <Box
              key={`${p.name}-${i}`}
              component="a"
              href={p.href || undefined}
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
                  backgroundColor: colors.isDark ? colors.inkSurface : colors.ink,
                  transform: 'translateY(-3px)',
                  boxShadow: `0 8px 24px ${colors.isDark ? 'rgba(0,0,0,0.5)' : 'rgba(15,23,42,0.08)'}`,
                },
              }}
            >
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
                {renderLogo(p.logo, colors, p.name)}
              </Box>

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
