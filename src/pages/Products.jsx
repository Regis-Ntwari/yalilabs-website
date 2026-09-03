import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useSearchParams } from 'react-router-dom';
import { useColors } from '../theme/ThemeContext';
import AnimatedReveal from '../components/common/AnimatedReveal';
import SectionHeader from '../components/common/SectionHeader';
import TokenizerDemo from '../components/products/TokenizerDemo';
import FlowDiagram from '../components/products/FlowDiagram';
import { products } from '../data/products';

function StatusBadge({ badge, badgeActive }) {
  const colors = useColors();
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.9 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: badgeActive ? colors.accent : colors.stone500, flexShrink: 0 }} />
      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: badgeActive ? colors.accent : colors.stone500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {badge}
      </Typography>
    </Box>
  );
}

/* ─── Product switcher — a scrollable rail of names, underlined when active ─── */
function ProductTabs({ activeIndex, onSelect }) {
  const colors = useColors();
  const tabRefs = useRef([]);

  // Keep the selected product in view on narrow screens, where the rail scrolls.
  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeIndex]);

  return (
    <Box
      role="tablist"
      aria-label="Alta products"
      sx={{
        display: 'flex',
        gap: { xs: 3, md: 5 },
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        // Bleed to the container edges so the rail can scroll fully on mobile.
        mx: { xs: -3, md: 0 },
        px: { xs: 3, md: 0 },
      }}
    >
      {products.map((product, i) => {
        const isActive = i === activeIndex;
        return (
          <Box
            key={product.id}
            ref={(el) => { tabRefs.current[i] = el; }}
            component="button"
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(i)}
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 0,
              pb: 1.5,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${isActive ? colors.accent : 'transparent'}`,
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              '&:hover .product-tab-label': { color: colors.text.primary },
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                flexShrink: 0,
                backgroundColor: product.badgeActive ? colors.accent : colors.stone600,
                opacity: isActive || product.badgeActive ? 1 : 0.6,
              }}
            />
            <Typography
              className="product-tab-label"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: isActive ? 600 : 500,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                color: isActive ? colors.text.primary : colors.text.tertiary,
                transition: 'color 0.2s ease',
              }}
            >
              {product.title}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/* ─── The selected product, in full ─── */
function ProductOverview({ product }) {
  const colors = useColors();
  const Icon = product.icon;
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: { xs: 2.5, md: 3 }, flexWrap: 'wrap' }}>
        <Icon sx={{ fontSize: { xs: 32, md: 38 }, color: product.badgeActive ? colors.accent : colors.text.tertiary }} />
        <StatusBadge badge={product.badge} badgeActive={product.badgeActive} />
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '2.4rem', md: '3rem' },
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: colors.text.primary,
          mb: { xs: 2, md: 2.5 },
        }}
      >
        {product.title}
      </Typography>

      <Typography
        sx={{
          color: colors.text.secondary,
          fontSize: { xs: '1.05rem', md: '1.2rem' },
          lineHeight: 1.8,
          fontFamily: '"Inter", sans-serif',
          maxWidth: 760,
        }}
      >
        {product.description}
      </Typography>

      {product.externalHref && (
        <Button
          component="a"
          href={product.externalHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          endIcon={<ArrowOutwardIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ mt: { xs: 3, md: 3.5 }, px: 0, fontSize: '0.95rem', color: colors.accent, '&:hover': { color: colors.accentBright } }}
        >
          {product.externalLabel}
        </Button>
      )}
    </Box>
  );
}

/* ─── "How it works" visual — a live demo for the tokenizer, a flow diagram otherwise ─── */
function HowItWorksVisual({ product }) {
  if (product.id === 'tokenizer') return <TokenizerDemo />;
  return <FlowDiagram stages={product.flowStages} />;
}

function FeaturesGrid({ features }) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        columnGap: { md: 8 },
        rowGap: { xs: 5, md: 6.5 },
      }}
    >
      {features.map((f, i) => (
        <Box key={f.title}>
          <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.accent, letterSpacing: '0.1em', mb: 1.5 }}>
            {String(i + 1).padStart(2, '0')}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: '1.15rem', md: '1.25rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 1.25 }}
          >
            {f.title}
          </Typography>
          <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.8, fontFamily: '"Inter",sans-serif', maxWidth: 560 }}>
            {f.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function Products() {
  const colors = useColors();
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('product');
  const requestedIndex = products.findIndex(p => p.id === requested);
  const [activeIndex, setActiveIndex] = useState(requestedIndex === -1 ? 0 : requestedIndex);

  const active = products[activeIndex];

  const fade = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <>
      <title>Products — The Alta Ecosystem | Yali Labs</title>
      <Box component="main">
        {/* Header */}
        <Box sx={{ pt: { xs: 8, md: 11 }, pb: { xs: 6, md: 8 }, backgroundColor: colors.ink }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatedReveal>
              <SectionHeader
                id="products-heading"
                heading="Our technology, built layer by layer."
                description="Alta is Yali Labs' AI technology platform for African languages — a set of interconnected tools and models, each building on the last."
              />
            </AnimatedReveal>
          </Container>
        </Box>

        {/* Product switcher + the selected product */}
        <Box sx={{ pb: { xs: 9, md: 12 }, backgroundColor: colors.ink }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <ProductTabs activeIndex={activeIndex} onSelect={setActiveIndex} />
            <Box sx={{ mt: { xs: 5, md: 7 } }}>
              <AnimatePresence mode="wait">
                <motion.div key={active.id} {...fade}>
                  <ProductOverview product={active} />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Container>
        </Box>

        {/* How it works — content swaps with the selected product */}
        <Box sx={{ py: { xs: 9, md: 13 }, backgroundColor: colors.inkLight }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatePresence mode="wait">
              <motion.div key={active.id} {...fade}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 6, lg: 10 }, alignItems: 'center' }}>
                  <Box>
                    <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.7rem' }}>
                      How it works
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: colors.text.primary, mb: 2.5 }}>
                      {active.howItWorks.heading}
                    </Typography>
                    <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.8, fontFamily: '"Inter",sans-serif', maxWidth: 620 }}>
                      {active.howItWorks.description}
                    </Typography>
                  </Box>
                  <HowItWorksVisual product={active} />
                </Box>
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* Features — content swaps with the selected product */}
        <Box sx={{ py: { xs: 9, md: 13 }, backgroundColor: colors.ink }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.7rem' }}>
              Features
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: colors.text.primary, mb: { xs: 5, md: 7 } }}>
              What {active.title} does.
            </Typography>
            <AnimatePresence mode="wait">
              <motion.div key={active.id} {...fade}>
                <FeaturesGrid features={active.features} />
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* CTA — links swap with the selected product */}
        <Box sx={{ py: { xs: 9, md: 12 }, textAlign: 'center', backgroundColor: colors.inkLight }}>
          <Container maxWidth="sm" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {active.externalHref ? (
                  <>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.25, color: colors.text.primary, mb: 3.5 }}>
                      Ready to build with {active.title}?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Button component="a" href={active.externalHref} target="_blank" rel="noopener noreferrer" variant="contained" size="large" endIcon={<ArrowOutwardIcon sx={{ fontSize: '13px !important' }} />}>
                        {active.externalLabel}
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.25, color: colors.text.primary, mb: 2.5 }}>
                      {active.title} is {active.badge.toLowerCase()}.
                    </Typography>
                    <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.8, fontFamily: '"Inter",sans-serif', mb: 3.5 }}>
                      In the meantime, Alta Tokenizer is available now.
                    </Typography>
                    <Button component="a" href="https://pypi.org/project/alta-tokenizer/" target="_blank" rel="noopener noreferrer" variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
                      Explore Alta Tokenizer
                    </Button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>
      </Box>
    </>
  );
}
