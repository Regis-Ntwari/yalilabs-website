import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import { useColors } from '../theme/ThemeContext';
import AnimatedReveal from '../components/common/AnimatedReveal';

function ContactForm() {
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
            <Typography sx={{ fontSize: '1.5rem' }}>✓</Typography>
          </Box>
          <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1.1rem', color: colors.text.primary, mb: 1 }}>Message sent.</Typography>
          <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', fontFamily: '"Inter",sans-serif', lineHeight: 1.6 }}>Thanks for reaching out. We will get back to you at {form.email}.</Typography>
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
          <a href="mailto:contact@yalilabs.com" style={{ color: 'inherit' }}>contact@yalilabs.com</a>.
        </Alert>
      )}
      <Button type="submit" variant="contained" size="large" disabled={status === 'loading'} endIcon={status === 'loading' ? <CircularProgress size={14} color="inherit" /> : <ArrowRightAltIcon />} sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
    </Box>
  );
}

function DotGrid() {
  const colors = useColors();
  return <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.3 }} />;
}

export default function Contact() {
  const colors = useColors();

  return (
    <>
      <title>Contact — Yali Labs</title>
      <Box component="main">
        {/* Hero */}
        <Box sx={{ borderBottom: `1px solid ${colors.border.subtle}`, py: { xs: 10, md: 14 }, backgroundColor: colors.ink, position: 'relative', overflow: 'hidden' }}>
          <DotGrid />
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 2, letterSpacing: '0.12em', fontSize: '0.68rem' }}>Contact</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.25rem', md: '3.25rem' }, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: colors.text.primary, mb: 2.5, maxWidth: 600 }}>Let&apos;s build the future of African AI.</Typography>
              <Typography sx={{ color: colors.text.secondary, fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75, maxWidth: 480, fontFamily: '"Inter",sans-serif' }}>
                Whether you&apos;re a researcher, developer, potential partner, or just curious about our work — we would like to hear from you.
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Contact body */}
        <Box sx={{ py: { xs: 10, md: 14 } }}>
          <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.6fr' }, gap: { xs: 8, lg: 10 }, alignItems: 'start' }}>
              {/* Info */}
              <AnimatedReveal>
                <Typography variant="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 600, letterSpacing: '-0.02em', color: colors.text.primary, mb: 3 }}>Get in touch.</Typography>
                <Typography sx={{ color: colors.text.secondary, fontSize: '0.925rem', lineHeight: 1.75, fontFamily: '"Inter",sans-serif', mb: 4 }}>
                  We are a small team — so you will be speaking directly to the people working on Yali Labs, not a support bot.
                </Typography>
                <Box component="a" href="mailto:contact@yalilabs.com"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2.5, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.inkLight, textDecoration: 'none', mb: 3, transition: 'all 0.2s ease', '&:hover': { borderColor: colors.accent, backgroundColor: colors.accentFaint } }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '6px', backgroundColor: colors.accentFaint, border: `1px solid ${colors.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <EmailIcon sx={{ fontSize: 16, color: colors.accent }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.25 }}>Email us directly</Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '13px', color: colors.accent }}>contact@yalilabs.com</Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10px', color: colors.text.tertiary, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1.5 }}>Good reasons to reach out</Typography>
                {['Research collaboration','Developer questions about Alta Tokenizer','Partnership enquiries','Press & media','General questions'].map((reason, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: colors.stone600, flexShrink: 0 }} />
                    <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '13.5px', color: colors.text.secondary }}>{reason}</Typography>
                  </Box>
                ))}
              </AnimatedReveal>

              {/* Form */}
              <AnimatedReveal delay={0.15}>
                <Box sx={{ p: { xs: 3, md: 4 }, border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', backgroundColor: colors.inkLight }}>
                  <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1rem', color: colors.text.primary, mb: 3 }}>Send us a message</Typography>
                  <ContactForm />
                </Box>
              </AnimatedReveal>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
