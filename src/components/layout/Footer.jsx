import { Box, Container, Typography, Link as MuiLink, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useColors } from '../../theme/ThemeContext';

const footerLinks = {
  Explore: [
    { label: 'Products',  href: '/products' },
  ],
  Company: [
    { label: 'About',   href: '/company/about-us' },
    { label: 'Team',    href: '/company/our-team' },
    { label: 'Contact', href: '/contact-us' },
  ],
  Products: [
    { label: 'Alta Tokenizer', href: '/products?product=tokenizer' },
    { label: 'Alta Model',     href: '/products?product=model' },
    { label: 'AltaScribe',     href: '/products?product=scribe' },
    { label: 'Alta Foundry',   href: '/products?product=foundry' },
  ],
};

function FooterLinkGroup({ title, links }) {
  const colors = useColors();
  return (
    <Box>
      <Typography variant="overline" sx={{ color: colors.text.tertiary, display: 'block', mb: 2, letterSpacing: '0.1em' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {links.map(link => (
          <MuiLink
            key={link.href}
            component={Link}
            to={link.href}
            sx={{
              color: colors.text.secondary,
              fontSize: '13.5px',
              fontFamily: '"Inter",sans-serif',
              transition: 'color 0.15s ease',
              '&:hover': { color: colors.text.primary, textDecoration: 'none' },
            }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
}

export default function Footer() {
  const colors = useColors();

  return (
    <Box
      component="footer"
      sx={{ borderTop: `1px solid ${colors.border.subtle}`, backgroundColor: colors.ink, mt: 'auto' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: { xs: 5, md: 4 },
          }}
        >
          {/* Brand */}
          <Box>
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', mb: 2 }}>
              <Box
                sx={{
                  width: 26, height: 26, borderRadius: '4px',
                  background: colors.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: '13px', color: colors.isDark ? '#0a0a0a' : '#ffffff', lineHeight: 1 }}>
                  Y
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '14px', color: colors.text.primary, letterSpacing: '-0.01em' }}>
                Yali Labs
              </Typography>
            </Box>
            <Typography sx={{ color: colors.text.secondary, fontSize: '13.5px', lineHeight: 1.7, maxWidth: 260, fontFamily: '"Inter",sans-serif', mb: 3 }}>
              Building language technology for African languages. Starting with Kinyarwanda.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { href: 'https://github.com/yalilabs', icon: <GitHubIcon sx={{ fontSize: 16 }} />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/company/yalilabs', icon: <LinkedInIcon sx={{ fontSize: 16 }} />, label: 'LinkedIn' },
              ].map(s => (
                <IconButton
                  key={s.label}
                  component="a" href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={`Yali Labs on ${s.label}`} size="small"
                  sx={{
                    color: colors.text.tertiary,
                    border: `1px solid ${colors.border.subtle}`,
                    borderRadius: '6px', p: 0.75,
                    '&:hover': { color: colors.text.primary, borderColor: colors.border.default },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {Object.entries(footerLinks).map(([title, links]) => (
            <FooterLinkGroup key={title} title={title} links={links} />
          ))}
        </Box>

        <Divider sx={{ borderColor: colors.border.subtle }} />

        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Typography sx={{ color: colors.text.tertiary, fontSize: '12.5px', fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
            © 2026 Yali Labs. All rights reserved.
          </Typography>
          <Typography sx={{ color: colors.text.tertiary, fontSize: '12.5px', fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
            Kigali, Rwanda
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
