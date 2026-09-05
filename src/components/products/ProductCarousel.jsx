import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useColors } from '../../theme/ThemeContext';
import { products } from '../../data/products';

const EASE = [0.22, 1, 0.36, 1];

// Slide travel — the outgoing slide leaves the way the incoming one arrives from,
// and its children cascade in behind it so the card doesn't read as one flat block.
const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? 64 : -64, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 },
  },
  exit: (dir) => ({ x: dir >= 0 ? -64 : 64, opacity: 0, transition: { duration: 0.25, ease: EASE } }),
};
const riseItem = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function StatusBadge({ badge, badgeActive }) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.45,
        border: `1px solid ${badgeActive ? `${colors.accent}44` : `${colors.stone600}55`}`,
        borderRadius: '3px',
        backgroundColor: badgeActive ? colors.accentFaint : `${colors.stone600}0d`,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: badgeActive ? colors.accent : colors.stone500,
          ...(badgeActive && {
            boxShadow: `0 0 0 0 ${colors.accentSubtle}`,
            animation: 'altaPulse 2.4s ease-out infinite',
            '@keyframes altaPulse': {
              '0%': { boxShadow: `0 0 0 0 ${colors.accentSubtle}` },
              '70%': { boxShadow: `0 0 0 6px rgba(0,0,0,0)` },
              '100%': { boxShadow: `0 0 0 0 rgba(0,0,0,0)` },
            },
          }),
        }}
      />
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          color: badgeActive ? colors.accent : colors.stone500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {badge}
      </Typography>
    </Box>
  );
}

/* ─── One product, filling the carousel frame ─── */
function ProductSlide({ product }) {
  const colors = useColors();
  const Icon = product.icon;

  return (
    <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* Icon + status */}
      <Box
        component={motion.div}
        variants={riseItem}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: { xs: 3, md: 3.5 } }}
      >
        <Box
          sx={{
            width: { xs: 52, md: 60 },
            height: { xs: 52, md: 60 },
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            backgroundColor: product.badgeActive ? colors.accentFaint : colors.inkSurface,
            border: `1px solid ${product.badgeActive ? `${colors.accent}33` : colors.border.subtle}`,
          }}
        >
          <Icon sx={{ fontSize: { xs: 26, md: 30 }, color: product.badgeActive ? colors.accent : colors.text.tertiary }} />
        </Box>
        <StatusBadge badge={product.badge} badgeActive={product.badgeActive} />
      </Box>

      {/* Title — same type treatment as the page heading */}
      <Typography
        component={motion.h2}
        variants={riseItem}
        variant="h2"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 600,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: colors.text.primary,
          mb: 2.5,
        }}
      >
        {product.title}
      </Typography>

      <Typography
        component={motion.p}
        variants={riseItem}
        sx={{
          color: colors.text.secondary,
          fontSize: { xs: '0.9rem', md: '1rem' },
          lineHeight: 1.75,
          fontFamily: '"Inter", sans-serif',
          maxWidth: 640,
          m: 0,
        }}
      >
        {product.description}
      </Typography>

      {/* Feature keywords — a quick read of what's inside */}
      <Box component={motion.div} variants={riseItem} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 3 }}>
        {product.features.slice(0, 4).map((f) => (
          <Box
            key={f.title}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              px: 1,
              py: 0.35,
              backgroundColor: colors.inkSurface,
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '4px',
            }}
          >
            <Box sx={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: colors.stone600, flexShrink: 0 }} />
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.02em' }}>
              {f.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {product.externalHref && (
        <Box component={motion.div} variants={riseItem}>
          <Button
            component="a"
            href={product.externalHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            endIcon={<ArrowOutwardIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ mt: 3, px: 0, fontSize: '0.9rem', color: colors.accent, '&:hover': { color: colors.accentBright } }}
          >
            {product.externalLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
}

/* ─── Arrow control ─── */
function NavButton({ label, onClick, children }) {
  const colors = useColors();
  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        color: colors.text.secondary,
        border: `1px solid ${colors.border.default}`,
        backgroundColor: 'transparent',
        transition: 'all 0.22s ease',
        '&:hover': {
          color: colors.accent,
          borderColor: colors.accent,
          backgroundColor: colors.accentFaint,
          transform: 'translateY(-1px)',
        },
        '&:active': { transform: 'translateY(0)' },
      }}
    >
      {children}
    </IconButton>
  );
}

/**
 * ProductCarousel — one product per slide, advanced with arrows, swipe,
 * arrow keys, or the segmented progress rail. Reports the active index up so
 * the rest of the page (how it works, features, CTA) stays in step.
 */
export default function ProductCarousel({ activeIndex, onSelect }) {
  const colors = useColors();
  const [direction, setDirection] = useState(0);
  const count = products.length;
  const product = products[activeIndex];
  const nextProduct = products[(activeIndex + 1) % count];

  const go = (index, dir) => {
    setDirection(dir);
    onSelect((index + count) % count);
  };
  const next = () => go(activeIndex + 1, 1);
  const prev = () => go(activeIndex - 1, -1);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label="Alta products"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      sx={{ outline: 'none', '&:focus-visible': { '& .carousel-frame': { borderColor: colors.accent } } }}
    >
      {/* Frame */}
      <Box
        className="carousel-frame"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          border: `1px solid ${colors.border.subtle}`,
          backgroundColor: colors.inkLight,
          p: { xs: 3, sm: 4, md: 6 },
          // Height is held steady so the page doesn't jump as slides swap; shorter
          // slides sit centered rather than leaving all the slack at the bottom.
          minHeight: { xs: 500, sm: 460, md: 440 },
          display: 'flex',
          alignItems: 'center',
          transition: 'border-color 0.25s ease',
        }}
      >
        {/* Accent hairline across the top, brightest on the available product */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${product.badgeActive ? colors.accent : colors.stone700}, transparent 70%)`,
            transition: 'background 0.4s ease',
          }}
        />

        {/* Dot grid + accent bloom, fading out toward the text */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
            backgroundSize: '26px 26px',
            opacity: colors.isDark ? 0.3 : 0.2,
            maskImage: 'linear-gradient(to left, black, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to left, black, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: -120,
            right: -100,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${product.badgeActive ? colors.accentSubtle : colors.border.subtle}, transparent 65%)`,
            filter: 'blur(10px)',
            pointerEvents: 'none',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Index watermark */}
        <Typography
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: { xs: 12, md: 20 },
            right: { xs: 16, md: 28 },
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
            fontSize: { xs: '3.5rem', md: '5rem' },
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: colors.text.primary,
            opacity: 0.05,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')}
        </Typography>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={product.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x + info.velocity.x * 0.15;
              if (swipe < -70) next();
              else if (swipe > 70) prev();
            }}
            style={{ cursor: 'grab', width: '100%' }}
          >
            <ProductSlide product={product} />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, md: 3 },
          mt: { xs: 3, md: 3.5 },
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        {/* Counter */}
        <Typography
          aria-live="polite"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: colors.text.tertiary,
            flexShrink: 0,
          }}
        >
          <Box component="span" sx={{ color: colors.text.primary }}>{String(activeIndex + 1).padStart(2, '0')}</Box>
          {` / ${String(count).padStart(2, '0')}`}
        </Typography>

        {/* Segmented rail — the active segment stretches and fills with accent */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 120 }}>
          {products.map((p, i) => {
            const isActive = i === activeIndex;
            return (
              <Box
                key={p.id}
                component="button"
                type="button"
                aria-label={`Show ${p.title}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => go(i, i > activeIndex ? 1 : -1)}
                sx={{
                  flex: isActive ? 2.4 : 1,
                  height: 26,
                  p: 0,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'flex 0.45s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover .rail-bar': { backgroundColor: isActive ? colors.accent : colors.stone500 },
                }}
              >
                <Box
                  className="rail-bar"
                  sx={{
                    width: '100%',
                    height: 2,
                    borderRadius: 2,
                    backgroundColor: isActive ? colors.accent : colors.border.default,
                    boxShadow: isActive ? `0 0 12px ${colors.accentSubtle}` : 'none',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                />
              </Box>
            );
          })}
        </Box>

        {/* Up next */}
        <Typography
          sx={{
            display: { xs: 'none', md: 'block' },
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.06em',
            color: colors.text.tertiary,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Next — {nextProduct.title}
        </Typography>

        {/* Arrows */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0, ml: { xs: 'auto', sm: 0 } }}>
          <NavButton label="Previous product" onClick={prev}>
            <ArrowBackIcon sx={{ fontSize: 15 }} />
          </NavButton>
          <NavButton label="Next product" onClick={next}>
            <ArrowForwardIcon sx={{ fontSize: 15 }} />
          </NavButton>
        </Box>
      </Box>
    </Box>
  );
}
