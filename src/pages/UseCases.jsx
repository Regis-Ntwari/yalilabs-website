import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import SectionHeader from '../components/common/SectionHeader';
import AnimatedReveal from '../components/common/AnimatedReveal';

const domains = [
  { id: 'education',   Icon: SchoolRoundedIcon,          title: 'Education',         potential: true,  description: "Language technology can power reading assistants, tutoring systems, and educational content in Kinyarwanda — enabling students to learn in their mother tongue.", examples: ['Kinyarwanda reading comprehension tools','Adaptive language learning','Content summarization for students'] },
  { id: 'government', Icon: AccountBalanceRoundedIcon,   title: 'Public Sector',     potential: true,  description: "Government agencies could use language AI to improve citizen services, translate policy documents, and make information more accessible in local languages.", examples: ['Multilingual citizen services','Document translation & summarization','Accessibility for Kinyarwanda speakers'] },
  { id: 'healthcare', Icon: LocalHospitalRoundedIcon,    title: 'Healthcare',        potential: true,  description: "Patient communication and medical information access are significantly improved when AI can operate in the patient's language.", examples: ['Patient communication support','Medical information in local language','Clinical documentation assistance'] },
  { id: 'agriculture',Icon: GrassRoundedIcon,            title: 'Agriculture',       potential: true,  description: "Much of Rwanda's rural population speaks primarily Kinyarwanda. AI tools in local languages open up advisory and information services for farmers.", examples: ['Agricultural advisory in Kinyarwanda','Market information access','Climate and weather guidance'] },
  { id: 'developers', Icon: BoltRoundedIcon,             title: 'Developer Tools',   potential: false, description: "Alta Tokenizer is available now for developers building NLP pipelines for Kinyarwanda. Researchers and engineers can integrate it directly into existing workflows.", examples: ['NLP pipeline integration','Custom tokenizer training','Kinyarwanda text processing'], cta: { label: 'Try Alta Tokenizer', href: '/products?product=tokenizer' } },
  { id: 'research',   Icon: ScienceRoundedIcon,          title: 'Academic Research', potential: false, description: "Our open-source tools support researchers working in African linguistics, computational linguistics, and low-resource language AI.", examples: ['Kinyarwanda corpus work','Low-resource NLP research','African language benchmarks'] },
];

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.3 }} />;
}

export default function UseCases() {
  const colors = useColors();

  return (
    <>
      <title>Use Cases — Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: { xs: 10, md: 14 }, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>Use Cases</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 640 }}>What becomes possible.</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, maxWidth: 520, fontFamily: '"Inter",sans-serif' }}>
                Language AI for African languages opens up applications that have been difficult or impossible when AI systems only work well in English.
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Disclaimer */}
        <Box sx={{ backgroundColor: colors.inkLight, borderBottom: `1px solid ${colors.border.subtle}`, py: 2 }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: colors.accent, flexShrink: 0, mt: 0.75 }} />
              <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11.5px', color: colors.text.secondary, lineHeight: 1.6, letterSpacing: '0.02em' }}>
                Use cases marked as <strong style={{ color: colors.stone400 }}>potential</strong> describe future applications — not claims that Yali Labs currently serves these industries. <strong style={{ color: colors.stone400 }}>Current</strong> use cases reflect our active tools and research.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Grid */}
        <Box sx={{ py: { xs: 10, md: 14 } }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3,1fr)' }, gap: 2 }}>
              {domains.map((domain, i) => (
                <AnimatedReveal key={domain.id} delay={i * 0.07}>
                  <Box sx={{ p: { xs: 3, md: 3.5 }, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.inkLight, height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s ease', '&:hover': { borderColor: colors.border.default } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <domain.Icon sx={{ fontSize: '1.5rem', color: domain.potential ? colors.stone500 : colors.accent }} />
                      <Box sx={{ px: 1.25, py: 0.3, border: `1px solid ${domain.potential ? colors.stone600 + '55' : colors.accent + '33'}`, borderRadius: '3px', backgroundColor: domain.potential ? `${colors.stone600}0d` : colors.accentFaint }}>
                        <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '9.5px', color: domain.potential ? colors.stone500 : colors.accent, letterSpacing: '0.05em' }}>
                          {domain.potential ? 'potential' : 'current'}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 1.5 }}>{domain.title}</Typography>
                    <Typography sx={{ color: colors.text.secondary, fontSize: '0.875rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 2.5, flex: 1 }}>{domain.description}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: domain.cta ? 2.5 : 0 }}>
                      {domain.examples.map(ex => (
                        <Box key={ex} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.stone600, flexShrink: 0, mt: 0.75 }} />
                          <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.02em', lineHeight: 1.5 }}>{ex}</Typography>
                        </Box>
                      ))}
                    </Box>
                    {domain.cta && <Button component={Link} to={domain.cta.href} variant="outlined" size="small" endIcon={<ArrowRightAltIcon sx={{ fontSize: '13px !important' }} />} sx={{ alignSelf: 'flex-start', fontSize: '12px' }}>{domain.cta.label}</Button>}
                  </Box>
                </AnimatedReveal>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA */}
        <Box sx={{ py: { xs: 10, md: 12 }, borderTop: `1px solid ${colors.border.subtle}`, backgroundColor: colors.inkLight, textAlign: 'center' }}>
          <Container maxWidth="sm">
            <AnimatedReveal>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, mb: 2 }}>Building something with African language AI?</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: '1rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                We would like to hear about it. Get in touch to discuss research collaborations, integration questions, or potential partnerships.
              </Typography>
              <Button component={Link} to="/contact-us" variant="contained" size="large" endIcon={<ArrowRightAltIcon />}>Get in touch</Button>
            </AnimatedReveal>
          </Container>
        </Box>
      </Box>
    </>
  );
}
