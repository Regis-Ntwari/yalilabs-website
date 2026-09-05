import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';

// ─── Animated token visualization ────────────────────────────────────────────
const DEMO = {
  text: 'Nagiye gusura abanyeshuri.',
  tokens: ['Na', 'gi', 'ye', ' gu', 'su', 'ra', ' aba', 'nye', 'shu', 'ri', '.'],
  ids: [78, 1760, 203, 5256, 892, 451, 1845, 634, 907, 46, 12],
  chars: 26,
};

function TokenViz() {
  const colors = useColors();
  const [phase, setPhase] = useState(0); // 0=text 1=splitting 2=tokens
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let idx = 0;
    const iv = setInterval(() => { idx = (idx + 1) % 3; setPhase(idx); }, 2800);
    return () => clearInterval(iv);
  }, [visible]);

  const label = phase === 0 ? '// input text' : phase === 1 ? '// tokenizing...' : '// tokens';

  return (
    <Box sx={{ fontFamily: '"IBM Plex Mono",monospace', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', letterSpacing: '0.12em', color: colors.text.tertiary, mb: 1.5, textTransform: 'uppercase' }}>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: phase === 2 ? 0.75 : 0, transition: 'gap 0.4s ease', minHeight: 44, alignItems: 'center' }}>
        {phase === 0 && (
          <motion.span key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            style={{ color: colors.text.primary, fontSize: '17px', fontWeight: 500, letterSpacing: '-0.01em' }}>
            {DEMO.text}
          </motion.span>
        )}
        {(phase === 1 || phase === 2) && DEMO.tokens.map((tok, i) => (
          <motion.span key={`${phase}-${i}`}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.04 }}
            style={{
              display: 'inline-block',
              backgroundColor: phase === 2 ? (i % 2 === 0 ? colors.accentFaint : colors.inkSurface) : 'transparent',
              border: phase === 2 ? `1px solid ${colors.border.subtle}` : '1px solid transparent',
              borderRadius: '3px',
              padding: phase === 2 ? '3px 8px' : '0',
              color: phase === 2 ? (i % 2 === 0 ? colors.accent : colors.text.secondary) : colors.text.primary,
              fontSize: '15px',
              fontWeight: 500,
              transition: 'all 0.3s ease',
            }}>
            {tok}
          </motion.span>
        ))}
      </Box>

      {phase === 2 && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
          <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, mt: 1.5, letterSpacing: '0.03em' }}>
            → [{DEMO.ids.join(', ')}]
          </Typography>
          <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.accent, mt: 0.5, letterSpacing: '0.03em' }}>
            compression: 3.7× · {DEMO.chars} chars → {DEMO.tokens.length} tokens
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}

// ─── Particle canvas ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const colors = useColors();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const count = Math.floor((W * H) / 12000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.5,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Use blue accent particles — stronger in light mode so they show up
        ctx.fillStyle = `rgba(26,159,255,${p.opacity * (colors.isDark ? 0.55 : 0.65)})`;
        ctx.fill();
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = colors.isDark
              ? `rgba(255,255,255,${0.035 * (1 - dist / 90)})`
              : `rgba(0,0,0,${0.04 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 1 }} />
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export default function Hero() {
  const colors = useColors();

  return (
    <Box
      component="section"
      aria-label="Hero"
      sx={{ position: 'relative', minHeight: { xs: '85vh', md: '88vh' }, display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: colors.ink }}
    >
      <ParticleCanvas />

      {/* Dot grid */}
      <Box aria-hidden="true" sx={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: colors.isDark ? 0.4 : 0.65,
        zIndex: 0,
      }} />

      {/* Accent glow */}
      <Box aria-hidden="true" sx={{
        position: 'absolute', top: '10%', right: '-10%', width: '55%', height: '70%',
        background: `radial-gradient(ellipse at center, ${colors.accentFaint} 0%, transparent 70%)`,
        zIndex: 0, pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 3, md: 4 }, py: { xs: 8, md: 0 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 6, lg: 8 }, alignItems: 'center' }}>

          {/* Left: copy */}
          <Box>
            {/* Headline — no pill badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.25rem', md: '3.75rem', lg: '4rem' },
                  fontWeight: 600,
                  letterSpacing: '-0.035em',
                  lineHeight: 1.08,
                  color: colors.text.primary,
                  mb: 3,
                }}
              >
                Building AI that{' '}
                <Box component="span" sx={{ color: colors.accent, fontStyle: 'italic', fontWeight: 600 }}>
                  understands
                </Box>{' '}
                Africa.
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <Typography
                sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, maxWidth: 480, mb: 4.5, fontFamily: '"Inter",sans-serif' }}
              >
                Yali Labs builds language technologies, foundation models, and developer tools designed around African languages — starting with Kinyarwanda.
              </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={Link} to="/products" variant="contained" size="large" endIcon={<ArrowRightAltIcon />} sx={{ py: 1.25, px: 3 }}>
                  Explore our work
                </Button>
                {/* <Button component={Link} to="/company/about-us" variant="outlined" size="large" sx={{ py: 1.25, px: 3 }}>
                  Meet Yali Labs
                </Button> */}
              </Box>
            </motion.div>
          </Box>

          {/* Right: tokenizer demo */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <Box
              sx={{
                border: `1px solid ${colors.border.subtle}`,
                borderRadius: '8px',
                backgroundColor: colors.inkLight,
                p: { xs: 2.5, md: 3.5 },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Terminal header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2, mb: 2.5, borderBottom: `1px solid ${colors.border.subtle}` }}>
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                  {['#e05252', '#e8b84a', '#52c97c'].map((c, i) => (
                    <Box key={i} sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c, opacity: 0.7 }} />
                  ))}
                </Box>
                <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.06em', ml: 0.5 }}>
                  alta-tokenizer · kinyarwanda
                </Typography>
              </Box>

              <TokenViz />

              <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px solid ${colors.border.subtle}` }}>
                <Typography
                  component="a"
                  href="https://altatokenizer.yalilabs.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontFamily: '"IBM Plex Mono",monospace',
                    fontSize: '11.5px',
                    color: colors.accent,
                    textDecoration: 'none',
                    transition: 'opacity 0.15s ease',
                    '&:hover': { opacity: 0.7 },
                  }}
                >
                  Try the playground
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>

      {/* Bottom fade */}
      <Box aria-hidden="true" sx={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to top, ${colors.ink}, transparent)`,
        zIndex: 1, pointerEvents: 'none',
      }} />
    </Box>
  );
}
