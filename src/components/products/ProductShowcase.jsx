import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useColors } from '../../theme/ThemeContext';
import ContentIcon from '../../content/ContentIcon';
import FlowDiagram from './FlowDiagram';

const EASE = [0.22, 1, 0.36, 1];
const MONO = '"IBM Plex Mono",monospace';
const SWIPE_THRESHOLD = 70;

const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.06, delayChildren: 0.06 } },
  exit: (dir) => ({ x: dir >= 0 ? -72 : 72, opacity: 0, transition: { duration: 0.25, ease: EASE } }),
};
const riseItem = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const pad = (n) => String(n).padStart(2, '0');

function StatusBadge({ badge, badgeActive }) {
  const colors = useColors();
  if (!badge) return null;
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.45, borderRadius: '3px', flexShrink: 0,
        border: `1px solid ${badgeActive ? `${colors.accent}44` : `${colors.stone600}55`}`,
        backgroundColor: badgeActive ? colors.accentFaint : `${colors.stone600}0d`,
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: badgeActive ? colors.accent : colors.stone500 }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '10px', color: badgeActive ? colors.accent : colors.stone500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {badge}
      </Typography>
    </Box>
  );
}

function NavButton({ label, onClick, disabled, children }) {
  const colors = useColors();
  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 42, height: 42, borderRadius: '50%',
        color: colors.text.secondary,
        border: `1px solid ${colors.border.default}`,
        transition: 'all 0.22s ease',
        '&:hover': { color: colors.accent, borderColor: colors.accent, backgroundColor: colors.accentFaint, transform: 'translateY(-1px)' },
        '&.Mui-disabled': { opacity: 0.35 },
      }}
    >
      {children}
    </IconButton>
  );
}

/** One tab in the horizontal product strip. */
function ProductTab({ product, index, isActive, onSelect, stretch, tabRef }) {
  const colors = useColors();
  return (
    <Box
      ref={tabRef}
      component="button"
      type="button"
      role="tab"
      id={`tab-${product.id}`}
      aria-selected={isActive}
      aria-controls={`panel-${product.id}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      sx={{
        flex: stretch ? { xs: '0 0 auto', lg: '1 1 0' } : '0 0 auto',
        minWidth: { xs: 232, md: 260 },
        scrollSnapAlign: 'start',
        display: 'flex', alignItems: 'center', gap: 1.75, textAlign: 'left',
        p: { xs: 1.75, md: 2 },
        borderRadius: '12px',
        border: `1px solid ${isActive ? `${colors.accent}55` : colors.border.subtle}`,
        backgroundColor: isActive ? colors.accentFaint : colors.inkLight,
        cursor: 'pointer',
        transition: 'all 0.22s ease',
        outline: 'none',
        '&:hover': { borderColor: isActive ? colors.accent : colors.border.default, transform: 'translateY(-2px)' },
        '&:focus-visible': { borderColor: colors.accent, boxShadow: `0 0 0 3px ${colors.accentSubtle}` },
      }}
    >
      <Box
        sx={{
          width: 42, height: 42, borderRadius: '10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: isActive ? colors.accent : colors.inkSurface,
          color: isActive ? (colors.isDark ? '#0a0a0a' : '#ffffff') : colors.text.tertiary,
          transition: 'all 0.22s ease',
        }}
      >
        <ContentIcon name={product.icon} sx={{ fontSize: 21 }} />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography component="span" sx={{ fontFamily: MONO, fontSize: '10px', color: isActive ? colors.accent : colors.text.tertiary, letterSpacing: '0.08em' }}>
            {pad(index + 1)}
          </Typography>
          <Typography component="span" sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.015em', color: colors.text.primary, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.title}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, mt: 0.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.tagline || product.badge}
        </Typography>
      </Box>
    </Box>
  );
}

/** The active product: overview on the left, "how it works" on the right. */
function ProductStage({ product, page }) {
  const colors = useColors();
  const stages = product.flowStages || [];
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) minmax(0, 1fr)' },
        gap: { xs: 4, lg: 8, xl: 12 },
        alignItems: 'start',
        position: 'relative', zIndex: 1,
      }}
    >
      <Box>
        <Box component={motion.div} variants={riseItem} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: { xs: 56, md: 64 }, height: { xs: 56, md: 64 }, borderRadius: '14px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: product.badgeActive ? colors.accentFaint : colors.inkSurface,
              border: `1px solid ${product.badgeActive ? `${colors.accent}33` : colors.border.subtle}`,
            }}
          >
            <ContentIcon name={product.icon} sx={{ fontSize: { xs: 28, md: 32 }, color: product.badgeActive ? colors.accent : colors.text.tertiary }} />
          </Box>
          <StatusBadge badge={product.badge} badgeActive={product.badgeActive} />
        </Box>

        <Typography
          component={motion.h2}
          variants={riseItem}
          variant="h2"
          sx={{ fontFamily: '"Space Grotesk",sans-serif', fontSize: 'clamp(1.9rem, 1.3rem + 1.8vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 1.25 }}
        >
          {product.title}
        </Typography>
        {product.tagline && (
          <Typography component={motion.p} variants={riseItem} sx={{ fontFamily: MONO, fontSize: '12.5px', color: colors.text.tertiary, letterSpacing: '0.04em', mb: 3, m: 0 }}>
            {product.tagline}
          </Typography>
        )}

        <Typography component={motion.p} variants={riseItem} sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem', xl: '1.1rem' }, lineHeight: 1.8, fontFamily: '"Inter",sans-serif', maxWidth: 560, mt: 3, mb: 4 }}>
          {product.description}
        </Typography>

        <Box component={motion.div} variants={riseItem}>
          {product.externalHref ? (
            <Button
              component="a"
              href={product.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              endIcon={<ArrowOutwardIcon sx={{ fontSize: '14px !important' }} />}
              sx={{ py: 1.25, px: 3 }}
            >
              {product.externalLabel || `Open ${product.title}`}
            </Button>
          ) : (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, px: 2, py: 1.25, border: `1px dashed ${colors.border.default}`, borderRadius: '6px' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.stone500 }} />
              <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.875rem', color: colors.text.secondary }}>
                {page.unreleasedText}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        component={motion.div}
        variants={riseItem}
        sx={{
          p: { xs: 2.5, md: 4, xl: 5 },
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '16px',
          backgroundColor: { xs: colors.inkLight, sm: colors.ink },
          position: 'relative', overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${product.badgeActive ? colors.accent : colors.stone600}, transparent 70%)` }} />
        <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
          {page.howItWorksOverline}
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: '"Space Grotesk",sans-serif', fontSize: { xs: '1.35rem', md: '1.6rem', xl: '1.75rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: colors.text.primary, mb: 1.5 }}>
          {product.howItWorks?.heading}
        </Typography>
        {product.howItWorks?.description && (
          <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.9rem', md: '0.975rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: stages.length ? 4 : 0 }}>
            {product.howItWorks.description}
          </Typography>
        )}
        {stages.length > 0 && (
          <Box sx={{ pt: 3.5, borderTop: `1px solid ${colors.border.subtle}` }}>
            <FlowDiagram stages={stages} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

/**
 * ProductShowcase: a carousel built to scale with the catalogue.
 * A horizontally scrolling strip of product tabs (snap-scrolling, arrows,
 * keyboard) selects the product shown on the stage below; the stage slides
 * between products and supports swipe. The active product is mirrored into
 * the URL hash so every product has a shareable link.
 */
export default function ProductShowcase({ products, page, activeIndex, onChange }) {
  const colors = useColors();
  const count = products.length;
  const [direction, setDirection] = useState(0);
  const stripRef = useRef(null);
  const tabRefs = useRef([]);
  const product = products[activeIndex];

  const go = useCallback((index) => {
    const next = (index + count) % count;
    setDirection(next > activeIndex ? 1 : next < activeIndex ? -1 : 0);
    onChange(next);
  }, [count, activeIndex, onChange]);
  const prev = () => go(activeIndex - 1);
  const next = () => go(activeIndex + 1);

  // Keep the active tab centred in the strip.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!strip || !tab) return;
    const target = tab.offsetLeft + tab.offsetWidth / 2 - strip.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(count - 1); }
  };

  if (!product) return null;
  const stretch = count <= 3;

  return (
    <Box onKeyDown={handleKeyDown}>
      {/* Strip header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Typography aria-live="polite" sx={{ fontFamily: MONO, fontSize: '12px', letterSpacing: '0.08em', color: colors.text.tertiary }}>
            <Box component="span" sx={{ color: colors.text.primary }}>{pad(activeIndex + 1)}</Box>
            {` / ${pad(count)}`}
          </Typography>
          <Typography sx={{ display: { xs: 'none', md: 'block' }, fontFamily: MONO, fontSize: '11px', letterSpacing: '0.04em', color: colors.text.tertiary }}>
            Swipe, or use the arrow keys
          </Typography>
        </Box>
        {count > 1 && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <NavButton label="Previous product" onClick={prev}><ArrowBackIcon sx={{ fontSize: 15 }} /></NavButton>
            <NavButton label="Next product" onClick={next}><ArrowForwardIcon sx={{ fontSize: 15 }} /></NavButton>
          </Box>
        )}
      </Box>

      {/* Tabs strip */}
      <Box
        ref={stripRef}
        role="tablist"
        aria-label="Alta products"
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          scrollPaddingInline: '2px',
          px: '2px',
          pt: '4px',
          pb: 1.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {products.map((p, i) => (
          <ProductTab
            key={p.id}
            product={p}
            index={i}
            isActive={i === activeIndex}
            stretch={stretch}
            onSelect={() => go(i)}
            tabRef={(el) => { tabRefs.current[i] = el; }}
          />
        ))}
      </Box>

      {/* Progress rail */}
      <Box aria-hidden="true" sx={{ position: 'relative', height: 2, borderRadius: 2, backgroundColor: colors.border.subtle, mt: 0.5, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute', top: 0, bottom: 0,
            width: `${100 / count}%`,
            left: `${(100 / count) * activeIndex}%`,
            backgroundColor: colors.accent,
            boxShadow: `0 0 12px ${colors.accentSubtle}`,
            transition: 'left 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </Box>

      {/* Stage */}
      <Box
        role="tabpanel"
        id={`panel-${product.id}`}
        aria-labelledby={`tab-${product.id}`}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          mt: { xs: 3, md: 4 },
          // Phones get a single layer: no outer card, so the content keeps its full width.
          p: { xs: 0, sm: 4, md: 6, xl: 7 },
          border: { xs: 'none', sm: `1px solid ${colors.border.subtle}` },
          borderRadius: '20px',
          backgroundColor: { xs: 'transparent', sm: colors.inkLight },
          minHeight: { lg: 520 },
        }}
      >
        <Box aria-hidden="true" sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${product.badgeActive ? colors.accent : colors.stone700}, transparent 70%)`, transition: 'background 0.4s ease' }} />
        <Box
          aria-hidden="true"
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
            backgroundSize: '26px 26px',
            opacity: colors.isDark ? 0.3 : 0.4,
            maskImage: 'linear-gradient(to left, black, transparent 55%)',
            WebkitMaskImage: 'linear-gradient(to left, black, transparent 55%)',
          }}
        />

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={product.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={count > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x + info.velocity.x * 0.15;
              if (swipe < -SWIPE_THRESHOLD) next();
              else if (swipe > SWIPE_THRESHOLD) prev();
            }}
            style={{ cursor: count > 1 ? 'grab' : 'default', position: 'relative' }}
          >
            <ProductStage product={product} page={page} />
          </motion.div>
        </AnimatePresence>

        <Typography
          aria-hidden="true"
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute', left: 40, bottom: 16, pointerEvents: 'none', userSelect: 'none',
            fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '5.5rem',
            lineHeight: 1, letterSpacing: '-0.05em', color: colors.text.primary, opacity: 0.05,
          }}
        >
          {pad(activeIndex + 1)}
        </Typography>
      </Box>
    </Box>
  );
}
