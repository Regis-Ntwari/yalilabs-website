import { Box, Container, Typography, Link as MuiLink, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import { useModule } from '../../content/useContent';
import { productHref } from '../../content/helpers';
import { getSocialIcon } from '../../content/socials';

const isInternal = (href = '') => href.startsWith('/');

function FooterLink({ href, children }) {
  const colors = useColors();
  const sx = {
    color: colors.text.secondary,
    fontSize: '13.5px',
    fontFamily: '"Inter",sans-serif',
    transition: 'color 0.15s ease',
    '&:hover': { color: colors.text.primary, textDecoration: 'none' },
  };
  return isInternal(href) ? (
    <MuiLink component={Link} to={href} sx={sx}>{children}</MuiLink>
  ) : (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" sx={sx}>{children}</MuiLink>
  );
}

function FooterLinkGroup({ title, links }) {
  const colors = useColors();
  return (
    <Box>
      <Typography variant="overline" sx={{ color: colors.text.tertiary, display: 'block', mb: 2, letterSpacing: '0.1em' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {links.map((link, i) => (
          <FooterLink key={`${link.href}-${i}`} href={link.href}>{link.label}</FooterLink>
        ))}
      </Box>
    </Box>
  );
}

export default function Footer() {
  const colors = useColors();
  const { brand, links, bottom } = useModule('footer');
  const { catalog } = useModule('products');

  const groups = [...(links.groups || [])];
  if (links.showProducts) {
    // Product links follow the catalogue so renames in the admin propagate here.
    groups.push({
      title: links.productsTitle || 'Products',
      items: (catalog.items || []).map((p) => ({ label: p.title, href: productHref(p) })),
    });
  }
  const columns = Math.max(groups.length, 1);

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
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: `2fr repeat(${columns}, 1fr)` },
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
            {brand.tagline && (
              <Typography sx={{ color: colors.text.secondary, fontSize: '13.5px', lineHeight: 1.7, maxWidth: 260, fontFamily: '"Inter",sans-serif', mb: 3 }}>
                {brand.tagline}
              </Typography>
            )}
            {brand.socials?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {brand.socials.map((s, i) => {
                  const Icon = getSocialIcon(s.platform);
                  return (
                    <IconButton
                      key={`${s.platform}-${i}`}
                      component="a" href={s.href} target="_blank" rel="noopener noreferrer"
                      aria-label={`Yali Labs on ${s.label || s.platform}`} size="small"
                      sx={{
                        color: colors.text.tertiary,
                        border: `1px solid ${colors.border.subtle}`,
                        borderRadius: '6px', p: 0.75,
                        '&:hover': { color: colors.text.primary, borderColor: colors.border.default },
                      }}
                    >
                      <Icon sx={{ fontSize: 16 }} />
                    </IconButton>
                  );
                })}
              </Box>
            )}
          </Box>

          {groups.map((g, i) => (
            <FooterLinkGroup key={`${g.title}-${i}`} title={g.title} links={g.items || []} />
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
            {bottom.copyright}
          </Typography>
          <Typography sx={{ color: colors.text.tertiary, fontSize: '12.5px', fontFamily: '"IBM Plex Mono",monospace', letterSpacing: '0.02em' }}>
            {bottom.location}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
