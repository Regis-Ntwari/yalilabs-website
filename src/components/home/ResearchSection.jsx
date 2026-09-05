import { Box, Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import SectionHeader from '../common/SectionHeader';
import AnimatedReveal from '../common/AnimatedReveal';

const areas = [
  { id: 'lang',   label: '01', title: 'Language Technology',    tags: ['Tokenization','BPE','Morphology'],           description: 'Building tokenizers, parsers, and linguistic tools that understand the structural nuances of African languages — not adapted from systems built for European or Asian languages.' },
  { id: 'models', label: '02', title: 'Foundation Models',      tags: ['Transformers','MoE','Kinyarwanda'],           description: 'Developing transformer-based foundation models trained on African language data. Alta Model is our first Kinyarwanda-focused foundation model built on transformer architecture.' },
  { id: 'data',   label: '03', title: 'Data & Infrastructure',  tags: ['Dataset curation','Pipelines','Annotation'],  description: 'Creating the datasets, pipelines, and infrastructure required to train models on under-resourced languages. Quality data is the foundation of any serious language model.' },
  { id: 'multi',  label: '04', title: 'Multimodal AI',          tags: ['Text','Audio','Vision'],                      description: 'Exploring systems that understand text, audio, images, and other modalities — all grounded in African language context. This is our longer-term research direction.' },
];

export default function ResearchSection() {
  const colors = useColors();

  return (
    <Box
      component="section"
      aria-labelledby="research-heading"
      sx={{ py: { xs: 10, md: 14 }, backgroundColor: colors.inkLight, borderTop: `1px solid ${colors.border.subtle}`, borderBottom: `1px solid ${colors.border.subtle}` }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: { xs: 7, md: 9 }, gap: 4 }}>
          <SectionHeader id="research-heading" overline="Research Areas" heading="What we're building." description="Our technical work spans language technology, data infrastructure, and model development." maxWidth={520} />
          <Button component={Link} to="/research" variant="outlined" endIcon={<ArrowRightAltIcon />} sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', md: 'auto' } }}>
            View all research
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 0, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', overflow: 'hidden' }}>
          {areas.map((area, i) => (
            <AnimatedReveal key={area.id} delay={i * 0.08}>
              <Box sx={{
                p: { xs: 3, md: 4 },
                borderRight: { xs: 'none', sm: i % 2 === 0 ? `1px solid ${colors.border.subtle}` : 'none' },
                borderBottom: i < areas.length - 2
                  ? { xs: `1px solid ${colors.border.subtle}`, sm: `1px solid ${colors.border.subtle}` }
                  : { xs: i < areas.length - 1 ? `1px solid ${colors.border.subtle}` : 'none', sm: 'none' },
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: colors.accentFaint },
              }}>
                <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.accent, letterSpacing: '0.08em', mb: 2 }}>
                  {area.label}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 1.5 }}>
                  {area.title}
                </Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: '0.875rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 2.5 }}>
                  {area.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {area.tags.map(tag => (
                    <Box key={tag} sx={{ px: 1.25, py: 0.4, border: `1px solid ${colors.border.subtle}`, borderRadius: '3px', backgroundColor: colors.inkSurface }}>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.04em' }}>{tag}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </AnimatedReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
