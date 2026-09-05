import { Box, Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import SectionHeader from '../common/SectionHeader';
import AnimatedReveal from '../common/AnimatedReveal';
import { products } from '../../data/products';

// Homepage spotlights the two most mature products; the rest live on /products.
const FEATURED_COUNT = 2;

function StatusBadge({ badge, badgeActive }) {
  const colors = useColors();
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.4,
        border: `1px solid ${badgeActive ? colors.accent + '44' : colors.stone600 + '55'}`,
        borderRadius: '3px',
        backgroundColor: badgeActive ? colors.accentFaint : `${colors.stone600}0d`,
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: badgeActive ? colors.accent : colors.stone500 }} />
      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: badgeActive ? colors.accent : colors.stone500, letterSpacing: '0.06em' }}>
        {badge}
      </Typography>
    </Box>
  );
}

function ProductCard({ product, index }) {
  const colors = useColors();
  const Icon = product.icon;

  return (
    <AnimatedReveal delay={index * 0.1}>
      <Box
        sx={{
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '14px',
          p: { xs: 3, md: 4 },
          backgroundColor: colors.inkLight,
          transition: 'all 0.25s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: colors.border.default,
            transform: 'translateY(-3px)',
            boxShadow: `0 16px 40px ${colors.isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)'}`,
          },
          '&::before': product.badgeActive
            ? { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${colors.accent}, transparent)` }
            : {},
        }}
      >
        {/* Header row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '10px',
              backgroundColor: product.badgeActive ? colors.accentFaint : colors.inkSurface,
              border: `1px solid ${product.badgeActive ? colors.accent + '33' : colors.border.subtle}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 26, color: product.badgeActive ? colors.accent : colors.text.tertiary }} />
          </Box>
          <StatusBadge badge={product.badge} badgeActive={product.badgeActive} />
        </Box>

        {/* Title */}
        <Typography variant="h4" sx={{ fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 1.5 }}>
          {product.title}
        </Typography>

        {/* Description */}
        <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.75, fontFamily: '"Inter", sans-serif', mb: 3, flex: 1 }}>
          {product.description}
        </Typography>

        {/* Feature pills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3.5 }}>
          {product.features.slice(0, 4).map((f) => (
            <Box key={f.title} sx={{ display: 'flex', alignItems: 'center', gap: 0.6, px: 1, py: 0.3, backgroundColor: colors.inkSurface, border: `1px solid ${colors.border.subtle}`, borderRadius: '4px' }}>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: colors.stone600, flexShrink: 0 }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.02em' }}>
                {f.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* CTA row */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 'auto' }}>
          <Button component={Link} to={product.href} variant="outlined" size="small" endIcon={<ArrowRightAltIcon sx={{ fontSize: '14px !important' }} />} sx={{ fontSize: '13px' }}>
            Learn more
          </Button>
          {product.externalHref && (
            <Button component="a" href={product.externalHref} target="_blank" rel="noopener noreferrer" variant="text" size="small" endIcon={<ArrowOutwardIcon sx={{ fontSize: '12px !important' }} />} sx={{ fontSize: '13px', color: colors.text.tertiary }}>
              {product.externalLabel}
            </Button>
          )}
        </Box>
      </Box>
    </AnimatedReveal>
  );
}

export default function AltaSection() {
  const colors = useColors();
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <Box
      component="section"
      aria-labelledby="alta-heading"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: colors.ink,
        borderTop: `1px solid ${colors.border.subtle}`,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Section intro */}
        <AnimatedReveal>
          <SectionHeader
            id="alta-heading"
            heading="Our technology, built layer by layer."
            description="Alta is Yali Labs' AI technology platform for African languages — a set of interconnected tools and models, each building on the last."
          />
        </AnimatedReveal>

        {/* Two featured products */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mt: { xs: 6, md: 8 } }}>
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </Box>

        {/* View more */}
        <AnimatedReveal delay={0.15}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 5, md: 6 } }}>
            <Button component={Link} to="/products" variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
              View all products
            </Button>
          </Box>
        </AnimatedReveal>
      </Container>
    </Box>
  );
}
