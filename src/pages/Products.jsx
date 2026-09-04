import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useSearchParams } from 'react-router-dom';
import { useColors } from '../theme/ThemeContext';
import AnimatedReveal from '../components/common/AnimatedReveal';
import SectionHeader from '../components/common/SectionHeader';
import ProductCarousel from '../components/products/ProductCarousel';
import TokenizerDemo from '../components/products/TokenizerDemo';
import FlowDiagram from '../components/products/FlowDiagram';
import { products } from '../data/products';

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
            sx={{
              fontFamily: '"Space Grotesk",sans-serif',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              fontWeight: 600,
              letterSpacing: '-0.025em',
              lineHeight: 1.3,
              color: colors.text.primary,
              mb: 1.25,
            }}
          >
            {f.title}
          </Typography>
          <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', maxWidth: 560 }}>
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
                heading="Our technology, built layer by layer."
                description="Alta is Yali Labs' AI technology platform for African languages — a set of interconnected tools and models, each building on the last."
              />
            </AnimatedReveal>
          </Container>
        </Box>

        {/* Product carousel — drives every section below it */}
        <Box sx={{ pb: { xs: 9, md: 12 }, backgroundColor: colors.ink }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatedReveal>
              <ProductCarousel activeIndex={activeIndex} onSelect={setActiveIndex} />
            </AnimatedReveal>
          </Container>
        </Box>

        {/* How it works — content swaps with the selected product */}
        <Box sx={{ py: { xs: 9, md: 13 }, backgroundColor: colors.inkLight }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatePresence mode="wait">
              <motion.div key={active.id} {...fade}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 6, lg: 10 }, alignItems: 'center' }}>
                  <SectionHeader
                    overline="How it works"
                    heading={active.howItWorks.heading}
                    description={active.howItWorks.description}
                    maxWidth={620}
                  />
                  <HowItWorksVisual product={active} />
                </Box>
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* Features — content swaps with the selected product */}
        <Box sx={{ py: { xs: 9, md: 13 }, backgroundColor: colors.ink }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <SectionHeader
              overline="Features"
              heading={`What ${active.title} does.`}
              sx={{ mb: { xs: 5, md: 7 } }}
            />
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
                    <Typography
                      variant="h3"
                      sx={{ fontFamily: '"Space Grotesk",sans-serif', fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: colors.text.primary, mb: 3.5 }}
                    >
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
                    <Typography
                      variant="h3"
                      sx={{ fontFamily: '"Space Grotesk",sans-serif', fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: colors.text.primary, mb: 2.5 }}
                    >
                      {active.title} is {active.badge.toLowerCase()}.
                    </Typography>
                    <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 3.5 }}>
                      In the meantime, Alta Tokenizer is available now.
                    </Typography>
                    <Button component="a" href="https://pypi.org/project/alta-tokenizer/" target="_blank" rel="noopener noreferrer" variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
                      Explore Alta Tokenizer
                    </Button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Sequential nav — carry the reader on to the company story */}
            <AnimatedReveal delay={0.1}>
              <Box sx={{ mt: { xs: 6, md: 8 }, pt: { xs: 4, md: 5 }, borderTop: `1px solid ${colors.border.subtle}` }}>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono",monospace',
                    fontSize: '10px',
                    color: colors.text.tertiary,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 1.5,
                  }}
                >
                  Next
                </Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.875rem', md: '0.95rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 3 }}>
                  Want to know who builds Alta? Read about Yali Labs — our mission, our approach, and the people behind the work.
                </Typography>
                <Button component={Link} to="/company/about-us" variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
                  About Yali Labs
                </Button>
              </Box>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
