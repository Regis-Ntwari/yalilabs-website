import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import AnimatedReveal from '../common/AnimatedReveal';

const previews = [
  { icon: '📚', label: 'Education',     text: 'Reading tools and tutoring systems in Kinyarwanda.' },
  { icon: '👨‍💻', label: 'Developer Tools', text: 'Alta Tokenizer is available for NLP pipeline integration today.', active: true, href: '/products?product=tokenizer' },
  { icon: '🏥', label: 'Healthcare',    text: 'Patient communication in local languages.' },
  { icon: '🔬', label: 'Research',      text: 'Open-source tools for African computational linguistics.' },
];

export default function UseCasesPreview() {
  const colors = useColors();

  return (
    <Box component="section" aria-labelledby="use-cases-preview-heading"
      sx={{ py: { xs: 10, md: 12 }, backgroundColor: colors.ink, borderTop: `1px solid ${colors.border.subtle}` }}>
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: { xs: 6, md: 7 }, gap: 3 }}>
          <Box>
            <AnimatedReveal>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>Applications</Typography>
              <Typography id="use-cases-preview-heading" variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, maxWidth: 400 }}>
                What becomes possible.
              </Typography>
            </AnimatedReveal>
          </Box>
          <Button component={Link} to="/use-cases" variant="outlined" endIcon={<ArrowRightAltIcon />} sx={{ alignSelf: { xs: 'flex-start', md: 'auto' } }}>All use cases</Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2 }}>
          {previews.map((item, i) => (
            <AnimatedReveal key={item.label} delay={i * 0.08}>
              <Box
                component={item.href ? Link : 'div'}
                to={item.href || undefined}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  border: `1px solid ${item.active ? colors.accent + '44' : colors.border.subtle}`,
                  borderRadius: '8px',
                  backgroundColor: item.active ? colors.accentFaint : colors.inkLight,
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: item.active ? colors.accent : colors.border.default },
                }}>
                <Typography sx={{ fontSize: '1.5rem', mb: 1.5, lineHeight: 1 }}>{item.icon}</Typography>
                <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '14px', color: item.active ? colors.accent : colors.text.primary, letterSpacing: '-0.01em', mb: 0.75 }}>{item.label}</Typography>
                <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '12.5px', color: colors.text.secondary, lineHeight: 1.6 }}>{item.text}</Typography>
              </Box>
            </AnimatedReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
