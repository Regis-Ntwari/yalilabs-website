import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedReveal from '../components/common/AnimatedReveal';

const areas = [
  { id: 'lm',    num: '01', title: 'Language Modeling',          themes: ['Morphology','Agglutinative languages','Bantu linguistics'], description: 'Researching how to build language models that capture the morphological richness of Bantu languages like Kinyarwanda — languages with complex verb conjugation, noun class systems, and agglutinative structures.' },
  { id: 'tok',   num: '02', title: 'Tokenization Methods',       themes: ['BPE','Subword units','Compression efficiency'],             description: 'Investigating how standard tokenization approaches fail on African languages and developing better alternatives. Our work on Alta Tokenizer is the practical output of this research stream.', project: { label: 'Alta Tokenizer', href: '/products?product=tokenizer' } },
  { id: 'data',  num: '03', title: 'African Language Datasets',  themes: ['Data curation','Annotation','Kinyarwanda corpus'],          description: 'Curating, cleaning, and creating datasets for Kinyarwanda language tasks. High-quality training data is the limiting factor for most low-resource language AI work.' },
  { id: 'eval',  num: '04', title: 'Evaluation & Benchmarks',    themes: ['Benchmarks','Metrics','Language evaluation'],               description: 'Developing evaluation benchmarks and metrics appropriate for Kinyarwanda language understanding — rather than simply adapting benchmarks designed for English.' },
  { id: 'multi', num: '05', title: 'Multimodal AI',              themes: ['Text + Audio','Vision-language','Multimodal'],              description: 'Exploring how to build systems that understand text, audio, and visual information in African language contexts. Early-stage research direction.', status: 'early-stage' },
  { id: 'infra', num: '06', title: 'Training Infrastructure',    themes: ['Compute efficiency','Training pipelines','Optimization'],   description: 'Researching efficient model training on constrained compute resources — important for any lab working in contexts where access to large GPU clusters is limited.' },
];

const openSource = [
  { name: 'alta-tokenizer', description: 'Kinyarwanda tokenizer based on Byte Pair Encoding.', language: 'Python', href: 'https://pypi.org/project/alta-tokenizer/', status: 'active' },
];

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.3 }} />;
}

export default function Research() {
  const colors = useColors();

  return (
    <>
      <title>Research — Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: { xs: 10, md: 14 }, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>Research</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 640 }}>The lab.</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, maxWidth: 540, fontFamily: '"Inter",sans-serif' }}>
                Yali Labs is an African AI research company. Our research is oriented around a fundamental question: what does it take to build AI that genuinely works for African languages?
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Research areas */}
        <Box sx={{ py: { xs: 10, md: 14 }, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <SectionHeader overline="Research Areas" heading="What we investigate." description="Six interconnected domains that form the technical foundation of Yali Labs' work." sx={{ mb: { xs: 7, md: 9 } }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {areas.map((area, i) => (
                <AnimatedReveal key={area.id} delay={i * 0.07}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '80px 1fr auto' }, gap: { xs: 1.5, md: 4 }, py: { xs: 3.5, md: 4 }, borderBottom: `1px solid ${colors.border.subtle}`, alignItems: 'start', transition: 'background-color 0.15s ease', px: { xs: 0, md: 1 }, mx: { xs: 0, md: -1 }, borderRadius: '6px', '&:hover': { backgroundColor: colors.accentFaint } }}>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.accent, letterSpacing: '0.08em', pt: { xs: 0, md: 0.5 } }}>{area.num}</Typography>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="h3" sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary }}>{area.title}</Typography>
                        {area.status === 'early-stage' && (
                          <Box sx={{ px: 1, py: 0.25, border: `1px solid ${colors.stone600}55`, borderRadius: '3px', backgroundColor: `${colors.stone600}0d` }}>
                            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '9.5px', color: colors.stone500, letterSpacing: '0.05em' }}>early-stage</Typography>
                          </Box>
                        )}
                      </Box>
                      <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 2, maxWidth: 560 }}>{area.description}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {area.themes.map(t => (
                          <Box key={t} sx={{ px: 1.25, py: 0.35, border: `1px solid ${colors.border.subtle}`, borderRadius: '3px', backgroundColor: colors.inkSurface }}>
                            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.03em' }}>{t}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    {area.project && (
                      <Button component={Link} to={area.project.href} variant="outlined" size="small" endIcon={<ArrowRightAltIcon sx={{ fontSize: '13px !important' }} />} sx={{ fontSize: '12px', mt: { xs: 1, md: 0 }, alignSelf: 'flex-start' }}>{area.project.label}</Button>
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
            <SectionHeader overline="Open Source" heading="What we've released." description="We believe in building in public." sx={{ mb: { xs: 6, md: 8 } }} />
            {openSource.map((project, i) => (
              <AnimatedReveal key={project.name} delay={i * 0.1}>
                <Box component="a" href={project.href} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.ink, textDecoration: 'none', transition: 'all 0.2s ease', '&:hover': { borderColor: colors.border.default } }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.75 }}>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontWeight: 500, fontSize: '14px', color: colors.accent, letterSpacing: '-0.01em' }}>{project.name}</Typography>
                      <Box sx={{ px: 1, py: 0.2, border: '1px solid #52c97c33', borderRadius: '3px', backgroundColor: '#52c97c0d' }}>
                        <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '9.5px', color: '#52c97c', letterSpacing: '0.04em' }}>{project.status}</Typography>
                      </Box>
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
            <AnimatedReveal delay={0.1}>
              <Box sx={{ mt: 3, p: 3, border: `1px dashed ${colors.border.subtle}`, borderRadius: '8px', textAlign: 'center' }}>
                <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '12px', color: colors.text.tertiary, letterSpacing: '0.04em' }}>
                  More releases coming. Follow us on GitHub →{' '}
                  <Typography component="a" href="https://github.com/yalilabs" target="_blank" rel="noopener noreferrer" sx={{ color: colors.accent, textDecoration: 'none', fontFamily: '"IBM Plex Mono",monospace', fontSize: '12px' }}>
                    github.com/yalilabs
                  </Typography>
                </Typography>
              </Box>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
