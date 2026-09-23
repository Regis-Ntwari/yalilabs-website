import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';
import { CONTAINER_PX, SECTION_PY } from '../../theme/layout';
import { useModule } from '../../content/useContent';
import AnimatedReveal from '../common/AnimatedReveal';

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
          whileInView={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
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
  const { mission } = useModule('home');

  return (
    <Box
      component="section"
      aria-labelledby="mission-heading"
      sx={{ py: SECTION_PY, backgroundColor: colors.ink, borderTop: `1px solid ${colors.border.subtle}` }}
    >
      <Container sx={{ px: CONTAINER_PX }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 8, lg: 10 }, alignItems: 'start' }}>
          {/* Left */}
          <Box>
            <AnimatedReveal>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
                {mission.overline}
              </Typography>
              <Typography id="mission-heading" variant="h2"
                sx={{ fontSize: { xs: '1.85rem', md: '2.4rem' }, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.15, color: colors.text.primary, mb: 3 }}>
                {mission.heading}
              </Typography>
              {(mission.paragraphs || []).map((p, i, arr) => (
                <Typography key={i} sx={{ color: colors.text.secondary, fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: i === arr.length - 1 ? 4 : 3 }}>
                  {p}
                </Typography>
              ))}
            </AnimatedReveal>

            {/* Phones: one stat per row (value | label). Larger: three columns. */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 0, sm: 3 } }}>
              {(mission.stats || []).map((stat, i) => (
                <AnimatedReveal key={`${stat.label}-${i}`} delay={i * 0.1}>
                  <Box
                    sx={{
                      borderTop: `1px solid ${colors.border.subtle}`,
                      py: { xs: 2, sm: 0 },
                      pt: { sm: 2 },
                      display: { xs: 'grid', sm: 'block' },
                      gridTemplateColumns: { xs: '104px minmax(0, 1fr)' },
                      columnGap: 2,
                      alignItems: 'start',
                    }}
                  >
                    <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: { xs: '1.6rem', sm: '1.75rem' }, letterSpacing: '-0.03em', color: colors.accent, lineHeight: 1, mb: { xs: 0, sm: 0.75 } }}>
                      {stat.value}
                    </Typography>
                    <Box>
                      <Typography sx={{ fontSize: '12.5px', color: colors.text.secondary, fontFamily: '"Inter",sans-serif', lineHeight: 1.5, mb: 0.5 }}>
                        {stat.label}
                      </Typography>
                      <Typography sx={{ fontSize: '11px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
                        {stat.note}
                      </Typography>
                    </Box>
                  </Box>
                </AnimatedReveal>
              ))}
            </Box>
          </Box>

          {/* Right: data viz */}
          <AnimatedReveal delay={0.2}>
            <Box sx={{ border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', p: 3, backgroundColor: colors.inkLight }}>
              <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', letterSpacing: '0.1em', color: colors.text.tertiary, textTransform: 'uppercase', mb: 2.5 }}>
                {mission.chartTitle}
              </Typography>
              {(mission.bars || []).map((b, i) => (
                <LanguageGapBar key={`${b.lang}-${i}`} lang={b.lang} percent={Number(b.percent) || 0} isAfrican={Boolean(b.isAfrican)} />
              ))}

              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${colors.border.subtle}`, display: 'flex', gap: 2 }}>
                {[
                  { c: colors.stone600, label: mission.legendGlobal },
                  { c: colors.accent,   label: mission.legendAfrican },
                ].map(({ c, label }) => (
                  <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Box sx={{ width: 10, height: 3, borderRadius: 2, backgroundColor: c }} />
                    <Typography sx={{ fontSize: '11px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace' }}>{label}</Typography>
                  </Box>
                ))}
              </Box>
              {mission.footnote && (
                <Typography sx={{ fontSize: '10.5px', color: colors.text.tertiary, fontFamily: '"IBM Plex Mono",monospace', mt: 1.5, fontStyle: 'italic' }}>
                  {mission.footnote}
                </Typography>
              )}
            </Box>
          </AnimatedReveal>
        </Box>
      </Container>
    </Box>
  );
}
