import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EmailIcon from '@mui/icons-material/Email';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import { CONTAINER_PX, SECTION_PY } from '../theme/layout';
import { useModule } from '../content/useContent';
import AnimatedReveal from '../components/common/AnimatedReveal';

function ContactForm({ copy, email }) {
  const colors = useColors();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message is required.';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Box sx={{ p: 4, border: `1px solid ${colors.accent}33`, borderRadius: '8px', backgroundColor: colors.accentFaint, textAlign: 'center' }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: colors.accentFaint, border: `1px solid ${colors.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <CheckRoundedIcon sx={{ fontSize: 24, color: colors.accent }} />
          </Box>
          <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1.1rem', color: colors.text.primary, mb: 1 }}>{copy.successHeading}</Typography>
          <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', fontFamily: '"Inter",sans-serif', lineHeight: 1.6 }}>
            {(copy.successText || '').replace('{email}', form.email)}
          </Typography>
        </Box>
      </motion.div>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField id="contact-name" name="name" label="Name" value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} fullWidth autoComplete="name" />
      <TextField id="contact-email" name="email" label="Email" type="email" value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth autoComplete="email" />
      <TextField id="contact-message" name="message" label="Message" value={form.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} multiline rows={5} fullWidth />
      {status === 'error' && (
        <Alert severity="error" sx={{ borderRadius: '4px' }}>
          Something went wrong. Please email us at{' '}
          <a href={`mailto:${email}`} style={{ color: 'inherit' }}>{email}</a>.
        </Alert>
      )}
      <Button type="submit" variant="contained" size="large" disabled={status === 'loading'} endIcon={status === 'loading' ? <CircularProgress size={14} color="inherit" /> : <ArrowRightAltIcon />} sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
        {status === 'loading' ? copy.sendingLabel : copy.submitLabel}
      </Button>
    </Box>
  );
}

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: colors.isDark ? 0.3 : 0.5 }} />;
}

export default function Contact() {
  const colors = useColors();
  const { hero, info, form } = useModule('contact');

  return (
    <>
      <title>Contact - Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: SECTION_PY, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container sx={{ px: CONTAINER_PX, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>{hero.overline}</Typography>
              <Typography variant="h1" sx={{ fontSize: 'clamp(2.25rem, 1.6rem + 2.2vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 600 }}>{hero.title}</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75, maxWidth: 480, fontFamily: '"Inter",sans-serif' }}>
                {hero.description}
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Contact body */}
        <Box sx={{ py: SECTION_PY }}>
          <Container sx={{ px: CONTAINER_PX }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.6fr' }, gap: { xs: 8, lg: 10 }, alignItems: 'start' }}>
              {/* Info */}
              <AnimatedReveal>
                <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 3 }}>{info.heading}</Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: '0.925rem', lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                  {info.text}
                </Typography>
                {info.email && (
                  <Box component="a" href={`mailto:${info.email}`}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.inkLight, textDecoration: 'none', mb: 3, transition: 'all 0.2s ease', '&:hover': { borderColor: colors.accent, backgroundColor: colors.accentFaint } }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '6px', backgroundColor: colors.accentFaint, border: `1px solid ${colors.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <EmailIcon sx={{ fontSize: 16, color: colors.accent }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.25 }}>{info.emailLabel}</Typography>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '13px', color: colors.accent }}>{info.email}</Typography>
                    </Box>
                  </Box>
                )}
                {(info.reasons || []).length > 0 && (
                  <>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>{info.reasonsLabel}</Typography>
                    {info.reasons.map((reason, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.stone600, flexShrink: 0 }} />
                        <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '13.5px', color: colors.text.secondary }}>{reason}</Typography>
                      </Box>
                    ))}
                  </>
                )}
              </AnimatedReveal>

              {/* Form */}
              <AnimatedReveal delay={0.15}>
                <Box sx={{ p: { xs: 3, md: 4 }, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.inkLight }}>
                  <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1rem', color: colors.text.primary, mb: 3 }}>{form.title}</Typography>
                  <ContactForm copy={form} email={info.email} />
                </Box>
              </AnimatedReveal>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
