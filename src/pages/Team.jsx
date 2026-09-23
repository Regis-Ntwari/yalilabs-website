import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import { CONTAINER_PX, SECTION_PY } from '../theme/layout';
import { useModule } from '../content/useContent';
import { initialsFor } from '../content/helpers';
import AnimatedReveal from '../components/common/AnimatedReveal';

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ member, size = 96 }) {
  const colors = useColors();
  const initials = (member.initials || initialsFor(member.name)).slice(0, 2);

  // Derive a hue from the initials for a unique-but-consistent tint
  const hue = (initials.charCodeAt(0) * 37 + (initials.charCodeAt(1) || 0) * 13) % 360;
  const bgLight = `hsla(${hue},60%,94%,1)`;
  const bgDark  = `hsla(${hue},35%,18%,1)`;

  return (
    <Box
      className="member-avatar"
      sx={{
        width: size,
        height: size,
        borderRadius: '12px',
        overflow: 'hidden',
        flexShrink: 0,
        background: colors.isDark ? bgDark : bgLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${colors.border.subtle}`,
        transition: 'border-color 0.2s ease',
      }}
    >
      {member.photo ? (
        <Box
          component="img"
          src={member.photo}
          alt={member.name}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Typography
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: size * 0.28,
            color: colors.isDark ? `hsl(${hue},70%,75%)` : `hsl(${hue},55%,35%)`,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {initials}
        </Typography>
      )}
    </Box>
  );
}

function LinkedInButton({ href, sx }) {
  const colors = useColors();
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      size="small"
      startIcon={<LinkedInIcon sx={{ fontSize: '14px !important' }} />}
      sx={{
        fontSize: '12px',
        color: colors.text.tertiary,
        '&:hover': { color: colors.accent, backgroundColor: 'transparent' },
        ...sx,
      }}
    >
      LinkedIn
    </Button>
  );
}

/* ─── Head / Leadership card ─────────────────────────────────────────────── */
function HeadCard({ member, index }) {
  const colors = useColors();

  return (
    <AnimatedReveal delay={index * 0.1} sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2.5,
          height: '100%',
          p: { xs: 3, md: 3.5 },
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '14px',
          backgroundColor: colors.inkLight,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          '&:hover': {
            borderColor: colors.accent + '44',
            boxShadow: `0 12px 36px ${colors.isDark ? 'rgba(0,0,0,0.45)' : 'rgba(15,23,42,0.07)'}`,
            '& .member-avatar': { borderColor: colors.accent + '88' },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${colors.accent}88, transparent)`,
          },
        }}
      >
        <Avatar member={member} size={88} />

        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', minWidth: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 700, letterSpacing: '-0.025em', color: colors.text.primary }}
            >
              {member.name}
            </Typography>
            {member.area && (
              <Box sx={{ px: 1.25, py: 0.3, border: `1px solid ${colors.border.default}`, borderRadius: '4px', backgroundColor: colors.inkSurface }}>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9.5px', color: colors.text.tertiary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {member.area}
                </Typography>
              </Box>
            )}
          </Box>

          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '13px', color: colors.accent, mb: 1.5, letterSpacing: '-0.005em' }}>
            {member.role}
          </Typography>

          <Typography sx={{ color: colors.text.secondary, fontSize: '0.875rem', lineHeight: 1.75, fontFamily: '"Inter", sans-serif' }}>
            {member.description}
          </Typography>

          {member.linkedin && (
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <LinkedInButton href={member.linkedin} sx={{ px: 0 }} />
            </Box>
          )}
        </Box>
      </Box>
    </AnimatedReveal>
  );
}

/* ─── Staff member card (compact grid card) ──────────────────────────────── */
function StaffCard({ member, index }) {
  const colors = useColors();

  return (
    <AnimatedReveal delay={index * 0.08}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          p: { xs: 3, md: 3.5 },
          border: `1px solid ${colors.border.subtle}`,
          borderRadius: '14px',
          backgroundColor: colors.inkLight,
          transition: 'all 0.25s ease',
          height: '100%',
          '&:hover': {
            borderColor: colors.border.default,
            transform: 'translateY(-3px)',
            boxShadow: `0 10px 28px ${colors.isDark ? 'rgba(0,0,0,0.4)' : 'rgba(15,23,42,0.06)'}`,
            '& .member-avatar': { borderColor: colors.accent + '66' },
          },
        }}
      >
        <Avatar member={member} size={80} />

        <Box>
          <Typography variant="h4" sx={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: colors.text.primary, mb: 0.5 }}>
            {member.name}
          </Typography>

          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '12px', color: colors.accent, mb: 1 }}>
            {member.role}
          </Typography>

          {member.area && (
            <Box sx={{ display: 'inline-flex', px: 1.25, py: 0.3, border: `1px solid ${colors.border.subtle}`, borderRadius: '4px', backgroundColor: colors.inkSurface, mb: 1.5 }}>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9.5px', color: colors.text.tertiary, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {member.area}
              </Typography>
            </Box>
          )}

          <Typography sx={{ color: colors.text.secondary, fontSize: '0.82rem', lineHeight: 1.7, fontFamily: '"Inter", sans-serif' }}>
            {member.description}
          </Typography>
        </Box>

        {member.linkedin && (
          <Box sx={{ mt: 'auto', pt: 1 }}>
            <LinkedInButton href={member.linkedin} />
          </Box>
        )}
      </Box>
    </AnimatedReveal>
  );
}

/* ─── Dot grid decoration ────────────────────────────────────────────────── */
function DotGrid() {
  const colors = useColors();
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        opacity: colors.isDark ? 0.3 : 0.5,
      }}
    />
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Team() {
  const colors = useColors();
  const { hero, members, join } = useModule('team');
  const all = members.items || [];
  const heads = all.filter((m) => m.isHead);
  const staff = all.filter((m) => !m.isHead);

  return (
    <>
      <title>Our Team - Yali Labs</title>
      <Box component="main">

        {/* ── Hero ── */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: SECTION_PY, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container sx={{ px: CONTAINER_PX, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
                {hero.overline}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.2vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 580 }}>
                {hero.title}
              </Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.75, maxWidth: 520, fontFamily: '"Inter", sans-serif' }}>
                {hero.description}
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* ── Leadership + Team ── */}
        <Box sx={{ py: SECTION_PY, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container sx={{ px: CONTAINER_PX }}>
            {heads.length > 0 && (
              <>
                <AnimatedReveal>
                  <Typography variant="overline" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', mb: 4 }}>
                    {members.leadershipLabel}
                  </Typography>
                </AnimatedReveal>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${Math.min(heads.length, 4)}, 1fr)` },
                    gap: 3,
                    alignItems: 'stretch',
                  }}
                >
                  {heads.map((member, i) => (
                    <HeadCard key={`${member.name}-${i}`} member={member} index={i} />
                  ))}
                </Box>
              </>
            )}

            {staff.length > 0 && (
              <>
                <AnimatedReveal>
                  <Typography variant="overline" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', mt: heads.length > 0 ? { xs: 8, md: 10 } : 0, mb: 4 }}>
                    {members.teamLabel}
                  </Typography>
                </AnimatedReveal>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                  {staff.map((member, i) => (
                    <StaffCard key={`${member.name}-${i}`} member={member} index={i} />
                  ))}
                </Box>
              </>
            )}
          </Container>
        </Box>

        {/* ── Join CTA ── */}
        <Box sx={{ py: { xs: 10, md: 12 }, backgroundColor: colors.inkLight }}>
          <Container sx={{ px: CONTAINER_PX }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 8 }, alignItems: 'center' }}>
              <AnimatedReveal>
                <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
                  {join.overline}
                </Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, mb: 2 }}>
                  {join.heading}
                </Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: '0.95rem', lineHeight: 1.75, fontFamily: '"Inter", sans-serif', mb: 3 }}>
                  {join.text}
                </Typography>
                <Button component={Link} to={join.buttonHref || '/contact-us'} variant="contained" endIcon={<ArrowRightAltIcon />}>
                  {join.buttonLabel}
                </Button>
              </AnimatedReveal>

              {(join.lookFor || []).length > 0 && (
                <AnimatedReveal delay={0.15}>
                  <Box sx={{ p: 3, border: `1px solid ${colors.border.subtle}`, borderRadius: '12px', backgroundColor: colors.ink }}>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 2.5 }}>
                      {join.lookForLabel}
                    </Typography>
                    {join.lookFor.map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
                        <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.accent, flexShrink: 0, mt: 0.75 }} />
                        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: '13.5px', color: colors.text.secondary, lineHeight: 1.6 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </AnimatedReveal>
              )}
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  );
}
