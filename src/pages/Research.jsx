import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import research from '../content/static/research';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedReveal from '../components/common/AnimatedReveal';

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: colors.isDark ? 0.3 : 0.5 }} />;
}

export default function Research() {
  const colors = useColors();
  const { hero, areas, openSource } = research;

  return (
    <>
      <title>Research — Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: { xs: 10, md: 14 }, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>{hero.overline}</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 640 }}>{hero.title}</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, maxWidth: 540, fontFamily: '"Inter",sans-serif' }}>
                {hero.description}
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Research areas */}
        <Box sx={{ py: { xs: 10, md: 14 }, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <SectionHeader overline={areas.overline} heading={areas.heading} description={areas.description} sx={{ mb: { xs: 7, md: 9 } }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {(areas.items || []).map((area, i) => (
                <AnimatedReveal key={area.id || i} delay={i * 0.07}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '80px 1fr auto' }, gap: { xs: 1.5, md: 4 }, py: { xs: 3.5, md: 4 }, borderBottom: `1px solid ${colors.border.subtle}`, alignItems: 'start', transition: 'background-color 0.15s ease', px: { xs: 0, md: 1 }, mx: { xs: 0, md: -1 }, borderRadius: '6px', '&:hover': { backgroundColor: colors.accentFaint } }}>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.accent, letterSpacing: '0.08em', pt: { xs: 0, md: 0.5 } }}>{area.num || String(i + 1).padStart(2, '0')}</Typography>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="h3" sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary }}>{area.title}</Typography>
                        {area.earlyStage && (
                          <Box sx={{ px: 1, py: 0.25, border: `1px solid ${colors.stone600}55`, borderRadius: '3px', backgroundColor: `${colors.stone600}0d` }}>
                            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '9.5px', color: colors.stone500, letterSpacing: '0.05em' }}>early-stage</Typography>
                          </Box>
                        )}
                      </Box>
                      <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 2, maxWidth: 560 }}>{area.description}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {(area.themes || []).map(t => (
                          <Box key={t} sx={{ px: 1.25, py: 0.35, border: `1px solid ${colors.border.subtle}`, borderRadius: '3px', backgroundColor: colors.inkSurface }}>
                            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.03em' }}>{t}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    {area.projectLabel && area.projectHref && (
                      <Button component={Link} to={area.projectHref} variant="outlined" size="small" endIcon={<ArrowRightAltIcon sx={{ fontSize: '13px !important' }} />} sx={{ fontSize: '12px', mt: { xs: 1, md: 0 }, alignSelf: 'flex-start' }}>{area.projectLabel}</Button>
                    )}
                  </Box>
                </AnimatedReveal>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Open source */}
        <Box sx={{ py: { xs: 10, md: 12 }, backgroundColor: colors.inkLight }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <SectionHeader overline={openSource.overline} heading={openSource.heading} description={openSource.description} sx={{ mb: { xs: 6, md: 8 } }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(openSource.items || []).map((project, i) => (
                <AnimatedReveal key={`${project.name}-${i}`} delay={i * 0.1}>
                  <Box component="a" href={project.href} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.ink, textDecoration: 'none', transition: 'all 0.2s ease', '&:hover': { borderColor: colors.border.default } }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                        <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontWeight: 500, fontSize: '14px', color: colors.accent, letterSpacing: '-0.01em' }}>{project.name}</Typography>
                        {project.status && (
                          <Box sx={{ px: 1, py: 0.2, border: '1px solid #52c97c33', borderRadius: '3px', backgroundColor: '#52c97c0d' }}>
                            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '9.5px', color: '#3fae68', letterSpacing: '0.04em' }}>{project.status}</Typography>
                          </Box>
                        )}
                      </Box>
                      <Typography sx={{ color: colors.text.secondary, fontSize: '13.5px', fontFamily: '"Inter",sans-serif' }}>{project.description}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.text.tertiary, display: { xs: 'none', sm: 'block' } }}>{project.language}</Typography>
                      <ArrowRightAltIcon sx={{ fontSize: 18, color: colors.text.tertiary }} />
                    </Box>
                  </Box>
                </AnimatedReveal>
              ))}
            </Box>
            {(openSource.noteText || openSource.noteLinkLabel) && (
              <AnimatedReveal delay={0.1}>
                <Box sx={{ mt: 3, p: 3, border: `1px dashed ${colors.border.default}`, borderRadius: '8px', textAlign: 'center' }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '12px', color: colors.text.tertiary, letterSpacing: '0.04em' }}>
                    {openSource.noteText}{' '}
                    {openSource.noteLinkHref && (
                      <Typography component="a" href={openSource.noteLinkHref} target="_blank" rel="noopener noreferrer" sx={{ color: colors.accent, textDecoration: 'none', fontFamily: '"IBM Plex Mono",monospace', fontSize: '12px' }}>
                        {openSource.noteLinkLabel}
                      </Typography>
                    )}
                  </Typography>
                </Box>
              </AnimatedReveal>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}
