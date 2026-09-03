import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedReveal from '../components/common/AnimatedReveal';

const timeline = [
  { year: '2024',         title: 'The beginning.',         body: 'Three researchers — Niyibizi Schadrack, Hirwa Gael, and Murwanashyaka Philbert — come together with a shared ambition: to build the first Kinyarwanda foundation model from scratch.' },
  { year: 'Early challenge', title: 'The gap becomes clear.', body: "Working with existing AI tools makes the problem obvious. Current models treat Kinyarwanda as an afterthought. They miss linguistic nuances, fail on common expressions, and produce outputs that do not reflect how the language actually works." },
  { year: 'First milestone', title: 'Alta Tokenizer.',       body: 'The team builds a custom tokenizer specifically for Kinyarwanda. Using Byte Pair Encoding trained on Kinyarwanda text, it achieves over 3.7× compression — far outperforming generic tokenizers. Published open-source.' },
  { year: 'Now',           title: 'Building the foundation model.', body: 'Work expands toward Alta Model, a Kinyarwanda foundation model built on transformer architecture with a Mixture of Experts design. The tokenizer work directly informs the model architecture.' },
  { year: 'Ahead',         title: 'African AI.',              body: "Yali Labs is not just building for Kinyarwanda. The goal is to develop the research, tools, and infrastructure that enable high-quality AI across African languages. Kinyarwanda is where we start — not where we stop." },
];

const values = [
  { title: 'Language-first',      description: 'We do not adapt systems built for other languages. We build from the language itself.' },
  { title: 'Open by default',     description: 'We publish our tools and research openly. The African AI ecosystem grows when knowledge is shared.' },
  { title: 'Technically honest',  description: 'We do not overclaim what our systems can do. Credibility is built through consistent, honest work.' },
  { title: 'Community-grounded',  description: 'The technology should be useful to the people whose languages it works with. That means building with, not just for, the community.' },
];

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.3 }} />;
}

export default function About() {
  const colors = useColors();

  return (
    <>
      <title>About — Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: { xs: 10, md: 14 }, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <Box sx={{ maxWidth: 680 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>About Yali Labs</Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5 }}>Building the future of AI in Africa.</Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 3 }}>
                  Yali Labs is an AI research company based in Kigali, Rwanda. We build language technology for African languages — starting with Kinyarwanda, and expanding from there.
                </Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif' }}>
                  We are not building AI for Africa by adapting technology created for other contexts. We are researching, building, and releasing AI that is grounded in African languages, datasets, and linguistic structures.
                </Typography>
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* Story */}
        <Box sx={{ py: { xs: 10, md: 14 }, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <SectionHeader overline="Our Story" heading="How we got here." sx={{ mb: { xs: 7, md: 9 } }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 0, lg: 10 } }}>
              <Box>
                {timeline.map((item, i) => (
                  <AnimatedReveal key={item.year} delay={i * 0.09}>
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
                  <Typography variant="overline" sx={{ color: colors.text.tertiary, display: 'block', mb: 3, letterSpacing: '0.1em', fontSize: '0.68rem' }}>What we believe</Typography>
                  {values.map((value, i) => (
                    <Box key={value.title} sx={{ py: 3, borderBottom: i < values.length - 1 ? `1px solid ${colors.border.subtle}` : 'none' }}>
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
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, mb: 2 }}>Meet the team.</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: '1rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                The people behind Yali Labs bring together expertise in artificial intelligence, data engineering, and business development.
              </Typography>
              <Button component={Link} to="/company/our-team" variant="contained" size="large" endIcon={<ArrowRightAltIcon />}>Meet the team</Button>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
