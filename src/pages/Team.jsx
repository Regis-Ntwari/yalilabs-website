import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import AnimatedReveal from '../components/common/AnimatedReveal';

/**
 * TEAM REGISTRY
 * ─────────────
 * isHead: true  → rendered in the "Leadership" row (large cards, full width on their row)
 * isHead: false → rendered in the "Team" grid below
 *
 * photo: path to image (future) — currently shows styled initials avatar
 * linkedin: optional LinkedIn profile URL
 */
const team = [
  {
    name: 'Murwanashyaka Philbert',
    initials: 'MP',
    role: 'Head of Business Development',
    area: 'Business & Strategy',
    isHead: true,
    photo: null,
    linkedin: null,
    description:
      "Drives Yali Labs' partnerships, strategy, and ecosystem development. Works to connect our research to real-world opportunities and partners across the African tech landscape.",
  },
  {
    name: 'Niyibizi Schadrack',
    initials: 'NS',
    role: 'Head of AI',
    area: 'Artificial Intelligence',
    isHead: true,
    photo: null,
    linkedin: null,
    description:
      'Leads the AI research and model development work at Yali Labs. Co-founder with deep expertise in language models, transformer architectures, and low-resource language AI.',
  },
  {
    name: 'Hirwa Gael',
    initials: 'HG',
    role: 'Head of Data Engineering',
    area: 'Data & Infrastructure',
    isHead: true,
    photo: null,
    linkedin: null,
    description:
      "Responsible for the data pipelines, corpus curation, and infrastructure that underpin Yali Labs' model training. Co-founder and the foundation that model quality is built on.",
  },
  {
    name: 'Uwisoneye Yvette',
    initials: 'UY',
    role: 'Data Scientist',
    area: 'Data Science',
    isHead: false,
    photo: null,
    linkedin: null,
    description:
      'Brings data science expertise to the team, working across data analysis, model evaluation, and research tasks that support the broader Alta ecosystem.',
  },
];

const heads = team.filter((m) => m.isHead);
const staff = team.filter((m) => !m.isHead);

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ member, size = 96 }) {
  const colors = useColors();

  // Derive a hue from the initials for a unique-but-consistent tint
  const hue = (member.initials.charCodeAt(0) * 37 + member.initials.charCodeAt(1) * 13) % 360;
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
          {member.initials}
        </Typography>
      )}
    </Box>
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
            boxShadow: `0 12px 36px ${colors.isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.07)'}`,
            '& .member-avatar': { borderColor: colors.accent + '88' },
          },
          // Accent top-border line
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
          {/* Name + area */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.15rem', md: '1.3rem' },
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: colors.text.primary,
              }}
            >
              {member.name}
            </Typography>
            <Box
              sx={{
                px: 1.25,
                py: 0.3,
                border: `1px solid ${colors.border.default}`,
                borderRadius: '4px',
                backgroundColor: colors.inkSurface,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '9.5px',
                  color: colors.text.tertiary,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {member.area}
              </Typography>
            </Box>
          </Box>

          {/* Role */}
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: colors.accent,
              mb: 1.5,
              letterSpacing: '-0.005em',
            }}
          >
            {member.role}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: colors.text.secondary,
              fontSize: '0.875rem',
              lineHeight: 1.75,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {member.description}
          </Typography>

          {/* LinkedIn — shown only if provided */}
          {member.linkedin && (
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Button
                component="a"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                startIcon={<LinkedInIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  fontSize: '12px',
                  color: colors.text.tertiary,
                  px: 0,
                  '&:hover': { color: colors.accent, backgroundColor: 'transparent' },
                }}
              >
                LinkedIn
              </Button>
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
            boxShadow: `0 10px 28px ${colors.isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'}`,
            '& .member-avatar': { borderColor: colors.accent + '66' },
          },
        }}
      >
        <Avatar member={member} size={80} />

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: colors.text.primary,
              mb: 0.5,
            }}
          >
            {member.name}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              color: colors.accent,
              mb: 1,
            }}
          >
            {member.role}
          </Typography>

          <Box
            sx={{
              display: 'inline-flex',
              px: 1.25,
              py: 0.3,
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '4px',
              backgroundColor: colors.inkSurface,
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '9.5px',
                color: colors.text.tertiary,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {member.area}
            </Typography>
          </Box>

          <Typography
            sx={{
              color: colors.text.secondary,
              fontSize: '0.82rem',
              lineHeight: 1.7,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {member.description}
          </Typography>
        </Box>

        {member.linkedin && (
          <Box sx={{ mt: 'auto', pt: 1 }}>
            <Button
              component="a"
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              startIcon={<LinkedInIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                fontSize: '12px',
                color: colors.text.tertiary,
                '&:hover': { color: colors.accent, backgroundColor: 'transparent' },
              }}
            >
              LinkedIn
            </Button>
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

  return (
    <>
      <title>Our Team — Yali Labs</title>
      <Box component="main">

        {/* ── Hero ── */}
        <Box
          sx={{
            borderBottom: `1px solid ${colors.border.subtle}`,
            py: { xs: 10, md: 14 },
            backgroundColor: colors.ink,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography
                variant="overline"
                sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}
              >
                Our Team
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.25rem', md: '3.25rem' },
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: colors.text.primary,
                  mb: 2.5,
                  maxWidth: 580,
                }}
              >
                The people building African AI.
              </Typography>
              <Typography
                sx={{
                  color: colors.text.secondary,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.75,
                  maxWidth: 520,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                A small team of researchers, engineers, and builders working in Kigali, Rwanda. United by a shared mission.
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* ── Leadership ── */}
        <Box sx={{ py: { xs: 10, md: 14 }, borderBottom: `1px solid ${colors.border.subtle}` }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <AnimatedReveal>
              <Typography
                variant="overline"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '11px',
                  color: colors.text.tertiary,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 4,
                }}
              >
                Leadership
              </Typography>
            </AnimatedReveal>

            {/* One row: every leader gets an equal-width, equal-height card */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: `repeat(${heads.length}, 1fr)`,
                },
                gap: 3,
                alignItems: 'stretch',
              }}
            >
              {heads.map((member, i) => (
                <HeadCard key={member.name} member={member} index={i} />
              ))}
            </Box>

            {/* ── Staff below (only shown if there are non-head members) ── */}
            {staff.length > 0 && (
              <>
                <AnimatedReveal>
                  <Typography
                    variant="overline"
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      color: colors.text.tertiary,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'block',
                      mt: { xs: 8, md: 10 },
                      mb: 4,
                    }}
                  >
                    Team
                  </Typography>
                </AnimatedReveal>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                  }}
                >
                  {staff.map((member, i) => (
                    <StaffCard key={member.name} member={member} index={i} />
                  ))}
                </Box>
              </>
            )}
          </Container>
        </Box>

        {/* ── Join CTA ── */}
        <Box sx={{ py: { xs: 10, md: 12 }, backgroundColor: colors.inkLight }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 5, md: 8 },
                alignItems: 'center',
              }}
            >
              <AnimatedReveal>
                <Typography
                  variant="overline"
                  sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}
                >
                  Work with us
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 600,
                    letterSpacing: '-0.025em',
                    color: colors.text.primary,
                    mb: 2,
                  }}
                >
                  Interested in African AI?
                </Typography>
                <Typography
                  sx={{
                    color: colors.text.secondary,
                    fontSize: '0.95rem',
                    lineHeight: 1.75,
                    fontFamily: '"Inter", sans-serif',
                    mb: 3,
                  }}
                >
                  We welcome researchers, engineers, linguists, and others who want to contribute to African language AI.
                </Typography>
                <Button component={Link} to="/contact-us" variant="contained" endIcon={<ArrowRightAltIcon />}>
                  Get in touch
                </Button>
              </AnimatedReveal>

              <AnimatedReveal delay={0.15}>
                <Box
                  sx={{
                    p: 3,
                    border: `1px solid ${colors.border.subtle}`,
                    borderRadius: '12px',
                    backgroundColor: colors.ink,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '10px',
                      color: colors.text.tertiary,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      mb: 2.5,
                    }}
                  >
                    What we look for
                  </Typography>
                  {[
                    'AI/ML research experience',
                    'Interest in low-resource languages',
                    'Curiosity about African linguistics',
                    'Willingness to build from first principles',
                    'Ability to work in an early-stage environment',
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          backgroundColor: colors.accent,
                          flexShrink: 0,
                          mt: 0.75,
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: '13.5px',
                          color: colors.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </AnimatedReveal>
            </Box>
          </Container>
        </Box>

      </Box>
    </>
  );
}
