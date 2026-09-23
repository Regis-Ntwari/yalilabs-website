import { Box, Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import { useModule } from '../../content/useContent';
import { CONTAINER_PX, SECTION_PY } from '../../theme/layout';
import ContentIcon from '../../content/ContentIcon';
import { productHref } from '../../content/helpers';
import SectionHeader from '../common/SectionHeader';
import AnimatedReveal from '../common/AnimatedReveal';

const MONO = '"IBM Plex Mono", monospace';

function StatusBadge({ badge, badgeActive }) {
  const colors = useColors();
  if (!badge) return null;
  return (
    <Box
      sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.4, borderRadius: '3px',
        border: `1px solid ${badgeActive ? colors.accent + '44' : colors.stone600 + '55'}`,
        backgroundColor: badgeActive ? colors.accentFaint : `${colors.stone600}0d`,
      }}
    >
      <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: badgeActive ? colors.accent : colors.stone500 }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '10px', color: badgeActive ? colors.accent : colors.stone500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {badge}
      </Typography>
    </Box>
  );
}

function ProductCard({ product, index, learnMoreLabel }) {
  const colors = useColors();
  const stages = (product.flowStages || []).map((s) => s.label).filter(Boolean);

  return (
    <AnimatedReveal
      delay={index * 0.1}
      sx={{
        height: '100%',
        minWidth: 0,
        // On two-column tablets an odd last card spans the row instead of dangling.
        '&:last-child:nth-of-type(odd)': { gridColumn: { sm: '1 / -1', lg: 'auto' } },
      }}
    >
      <Box
        sx={{
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '14px',
          p: { xs: 3, md: 3.5, xl: 4 },
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
            boxShadow: `0 16px 40px ${colors.isDark ? 'rgba(0,0,0,0.4)' : 'rgba(15,23,42,0.08)'}`,
          },
          '&::before': product.badgeActive
            ? { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${colors.accent}, transparent)` }
            : {},
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 52, height: 52, borderRadius: '10px', flexShrink: 0,
              backgroundColor: product.badgeActive ? colors.accentFaint : colors.inkSurface,
              border: `1px solid ${product.badgeActive ? colors.accent + '33' : colors.border.subtle}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ContentIcon name={product.icon} sx={{ fontSize: 26, color: product.badgeActive ? colors.accent : colors.text.tertiary }} />
          </Box>
          <StatusBadge badge={product.badge} badgeActive={product.badgeActive} />
        </Box>

        <Typography variant="h4" sx={{ fontSize: { xs: '1.25rem', md: '1.4rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 0.75 }}>
          {product.title}
        </Typography>
        {product.tagline && (
          <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.04em', mb: 2 }}>
            {product.tagline}
          </Typography>
        )}

        <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.9rem', xl: '0.95rem' }, lineHeight: 1.75, fontFamily: '"Inter", sans-serif', mb: 3, flex: 1 }}>
          {product.description}
        </Typography>

        {stages.length > 0 && (
          <Box
            role="list"
            aria-label={`How it works: ${stages.join(', then ')}`}
            sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 0.75, rowGap: 0.5, mb: 3.5 }}
          >
            {stages.map((label, i) => (
              <Box key={`${label}-${i}`} role="listitem" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                {i > 0 && <Box component="span" aria-hidden="true" sx={{ fontFamily: MONO, fontSize: '10.5px', color: colors.stone600 }}>→</Box>}
                <Typography component="span" sx={{ fontFamily: MONO, fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Button component={Link} to={productHref(product)} variant="outlined" size="small" endIcon={<ArrowRightAltIcon sx={{ fontSize: '14px !important' }} />} sx={{ fontSize: '13px', px: 2, whiteSpace: 'nowrap' }}>
            {learnMoreLabel}
          </Button>
          {product.externalHref && (
            <Button component="a" href={product.externalHref} target="_blank" rel="noopener noreferrer" variant="text" size="small" endIcon={<ArrowOutwardIcon sx={{ fontSize: '12px !important' }} />} sx={{ fontSize: '13px', px: 0.5, color: colors.text.tertiary, whiteSpace: 'nowrap' }}>
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
  const { alta } = useModule('home');
  const { catalog } = useModule('products');
  const items = catalog.items || [];
  const flagged = items.filter((p) => p.featured);
  const featured = flagged.length > 0 ? flagged : items.slice(0, 3);
  const columns = Math.min(featured.length, 3);

  return (
    <Box
      component="section"
      aria-labelledby="alta-heading"
      sx={{ py: SECTION_PY, backgroundColor: colors.ink, borderTop: `1px solid ${colors.border.subtle}` }}
    >
      <Container sx={{ px: CONTAINER_PX }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 3 }}>
          <SectionHeader id="alta-heading" heading={alta.heading} description={alta.description} />
          <Button component={Link} to="/products" variant="outlined" endIcon={<ArrowRightAltIcon />} sx={{ flexShrink: 0, display: { xs: 'none', md: 'inline-flex' } }}>
            {alta.buttonLabel}
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: columns > 1 ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)', lg: `repeat(${columns}, minmax(0, 1fr))` },
            gap: { xs: 2.5, md: 3 },
            mt: { xs: 6, md: 8 },
          }}
        >
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} learnMoreLabel={alta.learnMoreLabel || 'Learn more'} />
          ))}
        </Box>

        <AnimatedReveal delay={0.15} sx={{ display: { xs: 'block', md: 'none' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button component={Link} to="/products" variant="outlined" size="large" endIcon={<ArrowRightAltIcon />}>
              {alta.buttonLabel}
            </Button>
          </Box>
        </AnimatedReveal>
      </Container>
    </Box>
  );
}
