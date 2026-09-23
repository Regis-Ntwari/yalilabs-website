import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';
import { useModule } from '../../content/useContent';
import { productHref } from '../../content/helpers';
import { CONTAINER_PX } from '../../theme/layout';
import ContentIcon from '../../content/ContentIcon';

const EASE = [0.22, 1, 0.36, 1];
const CYCLE_MS = 3800;
const MONO = '"IBM Plex Mono",monospace';

// ─── Ecosystem panel ─────────────────────────────────────────────────────────
// Lists the Alta products from the catalogue and slowly cycles through them,
// expanding one at a time. Hovering or focusing a row pins it.
function EcosystemPanel({ label, footer, products, total }) {
  const colors = useColors();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const iv = setInterval(() => setActive((i) => (i + 1) % count), CYCLE_MS);
    return () => clearInterval(iv);
  }, [paused, count]);

  if (count === 0) return null;
  const current = products[Math.min(active, count - 1)];

  return (
    <Box
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      sx={{
        border: `1px solid ${colors.border.subtle}`,
        borderRadius: '14px',
        backgroundColor: colors.isDark ? 'rgba(17,17,17,0.85)' : 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(14px)',
        boxShadow: colors.isDark ? '0 30px 80px rgba(0,0,0,0.45)' : '0 30px 80px rgba(15,23,42,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: { xs: 2.5, md: 3 }, py: 1.75, borderBottom: `1px solid ${colors.border.subtle}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            {['#e05252', '#e8b84a', '#52c97c'].map((c) => (
              <Box key={c} sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: c, opacity: 0.7 }} />
            ))}
          </Box>
          <Typography sx={{ fontFamily: MONO, fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.08em' }}>
            {label}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: MONO, fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.08em' }}>
          {String(total || count).padStart(2, '0')} products
        </Typography>
      </Box>

      {/* Rows */}
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: { xs: 2, md: 2.5 }, display: 'flex', flexDirection: 'column' }}>
        {products.map((p, i) => {
          const isActive = i === active;
          const isLast = i === count - 1;
          return (
            <Box component="li" key={p.id} sx={{ display: 'grid', gridTemplateColumns: '18px 1fr', columnGap: { xs: 1.5, md: 2 } }}>
              {/* Rail */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '22px' }}>
                <Box
                  sx={{
                    width: 9, height: 9, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: isActive ? colors.accent : colors.stone600,
                    boxShadow: isActive ? `0 0 0 5px ${colors.accentFaint}` : 'none',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                />
                {!isLast && <Box sx={{ width: '1px', flex: 1, backgroundColor: colors.border.default, my: 0.75 }} />}
              </Box>

              <Box
                component={Link}
                to={productHref(p)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={isActive ? 'true' : undefined}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  px: { xs: 1.5, md: 2 },
                  py: 1.5,
                  mb: isLast ? 0 : 1,
                  border: `1px solid ${isActive ? `${colors.accent}33` : 'transparent'}`,
                  backgroundColor: isActive ? colors.accentFaint : 'transparent',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': { borderColor: `${colors.accent}55` },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 38, height: 38, borderRadius: '9px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isActive ? colors.accent : colors.inkSurface,
                      color: isActive ? (colors.isDark ? '#0a0a0a' : '#ffffff') : colors.text.tertiary,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ContentIcon name={p.icon} sx={{ fontSize: 20 }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: { xs: '0.95rem', md: '1rem' }, letterSpacing: '-0.015em', color: colors.text.primary, lineHeight: 1.2 }}>
                      {p.title}
                    </Typography>
                    {p.tagline && (
                      <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, mt: 0.35, letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.tagline}
                      </Typography>
                    )}
                  </Box>
                  {p.badge && (
                    <Typography
                      sx={{
                        fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0,
                        color: p.badgeActive ? colors.accent : colors.text.tertiary,
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      {p.badge}
                    </Typography>
                  )}
                </Box>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="desc"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{ overflow: 'hidden' }}
                    >
                      <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '13px', lineHeight: 1.65, color: colors.text.secondary, pt: 1.5, pl: { sm: '54px' } }}>
                        {p.description}
                      </Typography>
                      <Typography sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontFamily: MONO, fontSize: '11px', color: colors.accent, mt: 1.25, pl: { sm: '54px' }, letterSpacing: '0.04em' }}>
                        Learn more <ArrowRightAltIcon sx={{ fontSize: 14 }} />
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cycle progress */}
                {isActive && count > 1 && (
                  <Box
                    key={`bar-${active}`}
                    aria-hidden="true"
                    sx={{
                      position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%',
                      transformOrigin: 'left', backgroundColor: colors.accent, opacity: 0.6,
                      animation: `heroCycle ${CYCLE_MS}ms linear`,
                      animationPlayState: paused ? 'paused' : 'running',
                      '@keyframes heroCycle': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
                    }}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 1, sm: 2 },
          px: { xs: 2.5, md: 3 }, py: 1.75,
          borderTop: `1px solid ${colors.border.subtle}`,
        }}
      >
        <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '12.5px', color: colors.text.tertiary, lineHeight: 1.5 }}>
          {footer}
        </Typography>
        {current?.externalHref && (
          <Typography
            component="a"
            href={current.externalHref}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontFamily: MONO, fontSize: '11px', color: colors.accent, whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none', '&:hover': { opacity: 0.75 } }}
          >
            {current.externalLabel || 'Open platform'} <ArrowOutwardIcon sx={{ fontSize: 12 }} />
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// ─── Particle canvas ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const colors = useColors();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const count = Math.min(180, Math.floor((W * H) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.5,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,159,255,${p.opacity * (colors.isDark ? 0.55 : 0.65)})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i], q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = colors.isDark
              ? `rgba(255,255,255,${0.035 * (1 - dist / 90)})`
              : `rgba(15,23,42,${0.05 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);
    return () => { cancelAnimationFrame(animId); obs.disconnect(); };
  }, [colors.isDark]);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const colors = useColors();
  const { hero } = useModule('home');
  const { catalog } = useModule('products');
  // The panel shows the featured products (first four as a fallback) so it
  // stays compact however large the catalogue grows.
  const all = catalog.items || [];
  const flagged = all.filter((p) => p.featured);
  const products = (flagged.length > 0 ? flagged : all).slice(0, 4);

  const rise = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{
        position: 'relative',
        minHeight: { md: 'min(88vh, 980px)' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: colors.ink,
      }}
    >
      <ParticleCanvas />

      <Box aria-hidden="true" sx={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: colors.isDark ? 0.4 : 0.65,
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 100%)',
        zIndex: 0,
      }} />

      <Box aria-hidden="true" sx={{
        position: 'absolute', top: '5%', right: '-8%', width: '55%', height: '75%',
        background: `radial-gradient(ellipse at center, ${colors.accentSubtle} 0%, transparent 65%)`,
        filter: 'blur(20px)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <Box aria-hidden="true" sx={{
        position: 'absolute', bottom: '-20%', left: '-10%', width: '45%', height: '60%',
        background: `radial-gradient(ellipse at center, ${colors.accentFaint} 0%, transparent 65%)`,
        zIndex: 0, pointerEvents: 'none',
      }} />

      <Container sx={{ position: 'relative', zIndex: 2, px: CONTAINER_PX, py: { xs: 8, md: 10, xl: 12 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.05fr) minmax(0, 0.95fr)' },
            gap: { xs: 7, lg: 8, xl: 12 },
            alignItems: 'center',
          }}
        >
          {/* Copy: centred on phones, left-aligned beside the panel on desktop */}
          <Box sx={{ maxWidth: { lg: 680, xl: 760 }, textAlign: { xs: 'center', lg: 'left' }, mx: { xs: 'auto', lg: 0 } }}>
            

            <motion.div {...rise(0.05)}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: 'clamp(2.5rem, 1.5rem + 3.6vw, 5.25rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                  color: colors.text.primary,
                  mb: 3,
                }}
              >
                {hero.headlinePre}{' '}
                {hero.headlineAccent && (
                  <>
                    <Box component="span" sx={{ color: colors.accent, fontStyle: 'italic', fontWeight: 600 }}>
                      {hero.headlineAccent}
                    </Box>{' '}
                  </>
                )}
                {hero.headlinePost}
              </Typography>
            </motion.div>

            <motion.div {...rise(0.15)}>
              <Typography
                sx={{
                  color: colors.text.secondary,
                  fontSize: 'clamp(1rem, 0.92rem + 0.3vw, 1.25rem)',
                  lineHeight: 1.75,
                  maxWidth: 560,
                  mx: { xs: 'auto', lg: 0 },
                  mb: 4.5,
                  fontFamily: '"Inter",sans-serif',
                }}
              >
                {hero.subtitle}
              </Typography>
            </motion.div>

            <motion.div {...rise(0.25)}>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' } }}>
                <Button component={Link} to={hero.ctaHref || '/products'} variant="contained" size="large" endIcon={<ArrowRightAltIcon />} sx={{ py: 1.35, px: 3.25 }}>
                  {hero.ctaLabel}
                </Button>
                {hero.secondaryCtaLabel && (
                  <Button component={Link} to={hero.secondaryCtaHref || '/company/about-us'} variant="outlined" size="large" sx={{ py: 1.35, px: 3 }}>
                    {hero.secondaryCtaLabel}
                  </Button>
                )}
              </Box>
            </motion.div>
          </Box>

          {/* Ecosystem panel */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: EASE }}>
            <EcosystemPanel label={hero.panelLabel} footer={hero.panelFooter} products={products} total={all.length} />
          </motion.div>
        </Box>
      </Container>

      <Box aria-hidden="true" sx={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to top, ${colors.ink}, transparent)`,
        zIndex: 1, pointerEvents: 'none',
      }} />
    </Box>
  );
}
