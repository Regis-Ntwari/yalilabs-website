import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';
import { useModule } from '../../content/useContent';
import { renderLogo } from '../../content/logos';
import { CONTAINER_PX, SECTION_PY } from '../../theme/layout';
import AnimatedReveal from '../common/AnimatedReveal';

const GAP = 24;       // px between cards, and between repeated sets
const SPEED = 60;     // px per second

function PartnerCard({ partner, hidden }) {
  const colors = useColors();
  return (
    <Box
      component="a"
      href={partner.href || undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hidden ? undefined : `${partner.name} - ${partner.description}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
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
        minWidth: 220,
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 36, opacity: colors.isDark ? 0.9 : 0.85 }}>
        {renderLogo(partner.logo, colors, partner.name)}
      </Box>
      <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '11.5px', color: colors.text.tertiary, textAlign: 'center', lineHeight: 1.5, maxWidth: 160 }}>
        {partner.description}
      </Typography>
    </Box>
  );
}

/**
 * Marquee of partner cards. One "set" is the full partner list; it is
 * repeated until the track is at least twice as wide as the viewport, and the
 * animation shifts by exactly half the track, so the loop is seamless and the
 * cards always fill the whole width no matter how wide the screen is.
 */
export default function PartnersSection() {
  const colors = useColors();
  const { partners } = useModule('home');
  const items = partners.items || [];
  const [paused, setPaused] = useState(false);
  const [layout, setLayout] = useState({ copies: 2, setWidth: 0 });
  const viewportRef = useRef(null);
  const setRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = setRef.current;
    if (!viewport || !firstSet) return undefined;

    const measure = () => {
      const vw = viewport.offsetWidth;
      const sw = firstSet.offsetWidth; // includes the trailing gap
      if (!vw || !sw) return;
      const perHalf = Math.max(1, Math.ceil(vw / sw));
      setLayout((prev) => (prev.copies === perHalf * 2 && prev.setWidth === sw ? prev : { copies: perHalf * 2, setWidth: sw }));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(firstSet);
    return () => ro.disconnect();
  }, [items.length]);

  if (items.length === 0) return null;

  const halfDistance = (layout.copies / 2) * layout.setWidth;
  const duration = Math.max(12, halfDistance / SPEED);

  return (
    <Box
      component="section"
      aria-labelledby="partners-heading"
      sx={{ py: SECTION_PY, borderTop: `1px solid ${colors.border.subtle}`, backgroundColor: colors.inkLight, overflow: 'hidden' }}
    >
      <Container sx={{ px: CONTAINER_PX }}>
        <AnimatedReveal>
          <Box sx={{ mb: { xs: 7, md: 8 } }}>
            <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
              {partners.overline}
            </Typography>
            <Typography
              id="partners-heading"
              variant="h2"
              sx={{ fontSize: 'clamp(1.75rem, 1.3rem + 1.4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, maxWidth: 560 }}
            >
              {partners.heading}
            </Typography>
          </Box>
        </AnimatedReveal>
      </Container>

      {/* Full-bleed sliding track */}
      <Box
        ref={viewportRef}
        sx={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {['left', 'right'].map((side) => (
          <Box
            key={side}
            aria-hidden="true"
            sx={{
              position: 'absolute', [side]: 0, top: 0, bottom: 0, width: { xs: 48, md: 140 }, zIndex: 2, pointerEvents: 'none',
              background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, ${colors.inkLight} 0%, transparent 100%)`,
            }}
          />
        ))}

        <Box
          sx={{
            display: 'flex',
            width: 'max-content',
            py: 2,
            animation: `partners-marquee ${duration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            '@keyframes partners-marquee': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          {Array.from({ length: layout.copies }, (_, copy) => (
            <Box
              key={copy}
              ref={copy === 0 ? setRef : undefined}
              sx={{ display: 'flex', alignItems: 'stretch', gap: `${GAP}px`, pr: `${GAP}px`, flexShrink: 0 }}
            >
              {items.map((p, i) => (
                <PartnerCard key={`${copy}-${p.name}-${i}`} partner={p} hidden={copy > 0} />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
