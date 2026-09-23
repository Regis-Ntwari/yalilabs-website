import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import { CONTAINER_PX, SECTION_PY } from '../theme/layout';
import { useModule } from '../content/useContent';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedReveal from '../components/common/AnimatedReveal';

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: colors.isDark ? 0.3 : 0.5 }} />;
}

export default function About() {
  const colors = useColors();
  const { hero, story, cta } = useModule('about');
  const timeline = story.timeline || [];
  const values = story.values || [];

  return (
    <>
      <title>About - Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: SECTION_PY, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container sx={{ px: CONTAINER_PX, position: 'relative', zIndex: 1 }}>
            <Box sx={{ maxWidth: 680 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>{hero.overline}</Typography>
                <Typography variant="h1" sx={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.2vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5 }}>{hero.title}</Typography>
                {(hero.paragraphs || []).map((p, i, arr) => (
                  <Typography key={i} sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: i === 0 ? '1.1rem' : '1.05rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: i < arr.length - 1 ? 3 : 0 }}>
                    {p}
                  </Typography>
                ))}
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* Story */}
        <Box sx={{ py: SECTION_PY, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container sx={{ px: CONTAINER_PX }}>
            <SectionHeader overline={story.overline} heading={story.heading} sx={{ mb: { xs: 7, md: 9 } }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 0, lg: 10 } }}>
              <Box>
                {timeline.map((item, i) => (
                  <AnimatedReveal key={`${item.year}-${i}`} delay={i * 0.09}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '80px 1fr', sm: '100px 1fr' }, gap: 3, mb: { xs: 4, md: 5 }, pb: { xs: 4, md: 5 }, borderBottom: i < timeline.length - 1 ? `1px solid ${colors.border.subtle}` : 'none' }}>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10.5px', color: colors.accent, letterSpacing: '0.06em', lineHeight: 1.5 }}>{item.year}</Typography>
                      <Box>
                        <Typography variant="h4" sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 1 }}>{item.title}</Typography>
                        <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.75, fontFamily: '"Inter",sans-serif' }}>{item.body}</Typography>
                      </Box>
                    </Box>
                  </AnimatedReveal>
                ))}
              </Box>

              <AnimatedReveal delay={0.2}>
                <Box sx={{ position: { lg: 'sticky' }, top: { lg: 100 } }}>
                  <Typography variant="overline" sx={{ color: colors.text.tertiary, display: 'block', mb: 3, letterSpacing: '0.1em', fontSize: '0.68rem' }}>{story.valuesOverline}</Typography>
                  {values.map((value, i) => (
                    <Box key={`${value.title}-${i}`} sx={{ py: 3, borderBottom: i < values.length - 1 ? `1px solid ${colors.border.subtle}` : 'none' }}>
                      <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.015em', color: colors.text.primary, mb: 0.75 }}>{value.title}</Typography>
                      <Typography sx={{ color: colors.text.secondary, fontSize: '0.875rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif' }}>{value.description}</Typography>
                    </Box>
                  ))}
                </Box>
              </AnimatedReveal>
            </Box>
          </Container>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 10, md: 12 }, backgroundColor: colors.inkLight, textAlign: 'center' }}>
          <Container maxWidth="sm">
            <AnimatedReveal>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, mb: 2 }}>{cta.heading}</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: '1rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                {cta.text}
              </Typography>
              <Button component={Link} to={cta.buttonHref || '/company/our-team'} variant="contained" size="large" endIcon={<ArrowRightAltIcon />}>{cta.buttonLabel}</Button>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
