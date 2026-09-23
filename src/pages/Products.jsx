import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link, useLocation } from 'react-router-dom';
import { useColors } from '../theme/ThemeContext';
import { useModule } from '../content/useContent';
import { CONTAINER_PX } from '../theme/layout';
import AnimatedReveal from '../components/common/AnimatedReveal';
import SectionHeader from '../components/common/SectionHeader';
import ProductShowcase from '../components/products/ProductShowcase';

const MONO = '"IBM Plex Mono",monospace';
const NAV_OFFSET = 96;

/** Product id carried by the URL, from #id or the legacy ?product=id. */
function requestedId(location) {
  if (location.hash) return decodeURIComponent(location.hash.slice(1));
  return new URLSearchParams(location.search).get('product') || '';
}

export default function Products() {
  const colors = useColors();
  const location = useLocation();
  const { page, catalog } = useModule('products');
  const products = useMemo(() => catalog.items || [], [catalog.items]);
  const showcaseRef = useRef(null);

  // The active product comes from the URL until the visitor picks one in the
  // carousel. Each router navigation (new location.key) hands control back to
  // the URL, so footer / hero links to /products#id always win.
  const [selection, setSelection] = useState(null);
  const urlIndex = Math.max(0, products.findIndex((p) => p.id === requestedId(location)));
  const activeIndex = selection?.key === location.key ? selection.index : urlIndex;

  // A product link (footer, hero panel, shared URL) brings the showcase into view.
  useEffect(() => {
    if (!requestedId(location)) return undefined;
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [location]);

  // Selecting a product in the carousel mirrors it into the hash without a
  // navigation, so the URL stays shareable and the page does not jump.
  const handleChange = useCallback((index) => {
    setSelection({ key: location.key, index });
    const id = products[index]?.id;
    if (id) window.history.replaceState(window.history.state, '', `#${encodeURIComponent(id)}`);
  }, [products, location.key]);

  const safeIndex = Math.min(activeIndex, Math.max(0, products.length - 1));

  return (
    <>
      <title>Products - The Alta Ecosystem | Yali Labs</title>
      <Box component="main">
        <Box sx={{ pt: { xs: 8, md: 12, xl: 14 }, pb: { xs: 10, md: 14, xl: 16 }, backgroundColor: colors.ink }}>
          <Container sx={{ px: CONTAINER_PX }}>
            <SectionHeader heading={page.heading} description={page.description} maxWidth={720} sx={{ mb: { xs: 6, md: 8 } }} />

            {products.length > 0 && (
              <Box ref={showcaseRef} sx={{ scrollMarginTop: NAV_OFFSET }}>
                <AnimatedReveal>
                  <ProductShowcase products={products} page={page} activeIndex={safeIndex} onChange={handleChange} />
                </AnimatedReveal>
              </Box>
            )}
          </Container>
        </Box>

        <Box sx={{ py: { xs: 9, md: 12, xl: 14 }, textAlign: 'center', backgroundColor: colors.inkLight, borderTop: `1px solid ${colors.border.subtle}` }}>
          <Container maxWidth="sm" sx={{ px: CONTAINER_PX }}>
            <AnimatedReveal>
              <Typography sx={{ fontFamily: MONO, fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>
                {page.nextLabel}
              </Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 3.5 }}>
                {page.nextText}
              </Typography>
              <Button component={Link} to={page.nextButtonHref || '/company/about-us'} variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
                {page.nextButtonLabel}
              </Button>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
