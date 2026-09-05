import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';
import AnimatedReveal from '../common/AnimatedReveal';

const stats = [
  { value: '2,000+', label: 'African languages documented globally', note: 'most lack NLP resources' },
  { value: '< 1%',  label: 'of AI training data represents African languages', note: 'per major benchmarks' },
  { value: '14M+',  label: 'Kinyarwanda speakers in East Africa', note: 'Rwanda, Uganda, DRC' },
];

function LanguageGapBar({ lang, percent, isAfrican }) {
  const colors = useColors();
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '12.5px', color: isAfrican ? colors.accent : colors.text.secondary, fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
          {lang}
        </Typography>
        <Typography sx={{ fontSize: '12px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace' }}>
          {percent}%
        </Typography>
      </Box>
      <Box sx={{ height: '3px', backgroundColor: colors.inkSurface, borderRadius: 4, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ height: '100%', backgroundColor: isAfrican ? colors.accent : colors.stone600, borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
}

export default function MissionSection() {
  const colors = useColors();

  return (
    <Box
      component="section"
      aria-labelledby="mission-heading"
      sx={{ py: { xs: 10, md: 14 }, backgroundColor: colors.ink, borderTop: `1px solid ${colors.border.subtle}` }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 8, lg: 10 }, alignItems: 'start' }}>
          {/* Left */}
          <Box>
            <AnimatedReveal>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
                Why we exist
              </Typography>
              <Typography id="mission-heading" variant="h2"
                sx={{ fontSize: { xs: '1.85rem', md: '2.4rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15, color: colors.text.primary, mb: 3 }}>
                AI shouldn&apos;t stop at the world&apos;s most spoken languages.
              </Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 3 }}>
                Modern AI systems are largely trained on languages with enormous existing datasets and commercial demand. African languages — with their rich linguistic diversity and hundreds of millions of speakers — are frequently overlooked.
              </Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                Yali Labs is working to change that. We are not simply adapting technology built for other contexts. We are researching, building, and releasing AI that starts from African languages — and Kinyarwanda is where we begin.
              </Typography>
            </AnimatedReveal>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 3 }}>
              {stats.map((stat, i) => (
                <AnimatedReveal key={stat.label} delay={i * 0.1}>
                  <Box sx={{ borderTop: `1px solid ${colors.border.subtle}`, pt: 2 }}>
                    <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1.75rem', letterSpacing: '-0.03em', color: colors.accent, lineHeight: 1, mb: 0.75 }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '12.5px', color: colors.text.secondary, fontFamily: '"Inter",sans-serif', lineHeight: 1.5, mb: 0.5 }}>
                      {stat.label}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
                      {stat.note}
                    </Typography>
                  </Box>
                </AnimatedReveal>
              ))}
            </Box>
          </Box>

          {/* Right: data viz */}
          <AnimatedReveal delay={0.2}>
            <Box sx={{ border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', p: 3, backgroundColor: colors.inkLight }}>
              <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', letterSpacing: '0.1em', color: colors.text.tertiary, textTransform: 'uppercase', mb: 2.5 }}>
                // Estimated NLP data representation
              </Typography>
              <LanguageGapBar lang="English"     percent={92}  isAfrican={false} />
              <LanguageGapBar lang="Mandarin"    percent={58}  isAfrican={false} />
              <LanguageGapBar lang="Spanish"     percent={45}  isAfrican={false} />
              <LanguageGapBar lang="French"      percent={38}  isAfrican={false} />
              <LanguageGapBar lang="Arabic"      percent={21}  isAfrican={false} />
              <LanguageGapBar lang="Swahili"     percent={4.2} isAfrican={true}  />
              <LanguageGapBar lang="Kinyarwanda" percent={0.3} isAfrican={true}  />
              <LanguageGapBar lang="Amharic"     percent={0.4} isAfrican={true}  />
              <LanguageGapBar lang="Yoruba"      percent={0.2} isAfrican={true}  />

              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${colors.border.subtle}`, display: 'flex', gap: 2 }}>
                {[
                  { c: colors.stone600, label: 'Global languages' },
                  { c: colors.accent,   label: 'African languages' },
                ].map(({ c, label }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Box sx={{ width: 10, height: 3, borderRadius: 2, backgroundColor: c }} />
                    <Typography sx={{ fontSize: '11px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace' }}>{label}</Typography>
                  </Box>
                ))}
              </Box>
              <Typography sx={{ fontSize: '10.5px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace', mt: 1.5, fontStyle: 'italic' }}>
                * Approximate figures for illustrative purposes
              </Typography>
            </Box>
          </AnimatedReveal>
        </Box>
      </Container>
    </Box>
  );
}
