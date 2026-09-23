import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useColors } from '../theme/ThemeContext';
import notFoundContent from '../content/static/notFound';

export default function NotFound() {
  const colors = useColors();
  const { notFound } = notFoundContent;

  return (
    <>
      <title>404 - Page Not Found | Yali Labs</title>
      <Box component="main" sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', backgroundColor: colors.ink }}>
        <Container maxWidth="sm" sx={{ px: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 2 }}>{notFound.label}</Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 600, letterSpacing: '-0.03em', color: colors.text.primary, mb: 2 }}>{notFound.heading}</Typography>
          <Typography sx={{ color: colors.text.secondary, fontSize: '1rem', lineHeight: 1.7, fontFamily: '"Inter",sans-serif', mb: 4 }}>
            {notFound.text}
          </Typography>
          <Button component={Link} to="/" variant="contained" size="large" endIcon={<ArrowRightAltIcon />}>{notFound.buttonLabel}</Button>
        </Container>
      </Box>
    </>
  );
}
