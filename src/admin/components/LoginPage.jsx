import { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment, CircularProgress, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';
import { loginSchema } from '../../lib/api/auth';
import { isApiConfigured, isMockApi } from '../../lib/api/client';
import { DEMO_ACCOUNTS } from '../../lib/api/mock';
import { useLogin } from '../hooks/useAuth';

const MONO = '"IBM Plex Mono",monospace';

/** Shown in mock mode: lists the demo accounts and fills the form on click. */
function DemoAccounts({ onPick, disabled }) {
  const colors = useColors();
  return (
    <Box sx={{ mt: 3, pt: 2.5, borderTop: `1px dashed ${colors.border.default}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#e8b84a', boxShadow: '0 0 0 3px rgba(232,184,74,0.2)' }} />
        <Typography sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.text.tertiary }}>
          Demo mode · no backend connected
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', color: colors.text.secondary, lineHeight: 1.6, mb: 1.5 }}>
        Sign in with one of the demo accounts. Edits are saved in this browser only.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {DEMO_ACCOUNTS.map((acct) => (
          <Box
            key={acct.email}
            component="button"
            type="button"
            disabled={disabled}
            onClick={() => onPick(acct)}
            sx={{
              all: 'unset',
              boxSizing: 'border-box',
              cursor: disabled ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: '6px',
              border: `1px solid ${colors.border.subtle}`,
              backgroundColor: colors.ink,
              transition: 'all 0.15s ease',
              opacity: disabled ? 0.6 : 1,
              '&:hover': disabled ? undefined : { borderColor: colors.accent, backgroundColor: colors.accentFaint },
              '&:focus-visible': { outline: `2px solid ${colors.accent}`, outlineOffset: 2 },
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', fontWeight: 500, color: colors.text.primary, lineHeight: 1.3 }}>
                {acct.name}
              </Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {acct.email} · {acct.password}
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.accent, flexShrink: 0 }}>
              Use
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function LoginPage() {
  const colors = useColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const loginMutation = useLogin();
  const configured = isApiConfigured();
  const mock = isMockApi();

  const busy = loginMutation.isPending;

  const pickDemo = (acct) => {
    loginMutation.reset();
    setFieldErrors({});
    setEmail(acct.email);
    setPassword(acct.password);
  };

  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    loginMutation.reset();

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const errs = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field && !errs[field]) errs[field] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    loginMutation.mutate(parsed.data, {
      onError: () => setPassword(''),
    });
  };

  const serverError = loginMutation.error
    ? loginMutation.error.status === 401 || loginMutation.error.status === 400
      ? 'Incorrect email or password.'
      : loginMutation.error.status === 429
        ? 'Too many attempts. Please wait a moment and try again.'
        : loginMutation.error.message
    : null;

  return (
    <>
      <title>Admin — Yali Labs</title>
      <meta name="robots" content="noindex, nofollow" />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.ink,
          px: 2,
        }}
      >
        <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: colors.isDark ? 0.35 : 0.55 }} />
        <Box aria-hidden="true" sx={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: `radial-gradient(ellipse at center, ${colors.accentFaint} 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 400 }}>
          <Box
            sx={{
              border: `1px solid ${colors.border.subtle}`,
              borderRadius: '12px',
              backgroundColor: colors.inkLight,
              boxShadow: colors.isDark ? '0 30px 80px rgba(0,0,0,0.5)' : '0 30px 80px rgba(15,23,42,0.08)',
              p: { xs: 3, sm: 4 },
              position: 'relative',
              overflow: 'hidden',
              '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${colors.accent}, transparent)` },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 3.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '6px', background: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 700, fontSize: '16px', color: colors.isDark ? '#0a0a0a' : '#fff', lineHeight: 1 }}>Y</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '15px', color: colors.text.primary, lineHeight: 1.1 }}>Yali Labs</Typography>
                <Typography sx={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.accent, mt: 0.4 }}>Content admin</Typography>
              </Box>
            </Box>

            <Typography variant="h1" sx={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary, mb: 1 }}>
              Sign in
            </Typography>
            <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.875rem', color: colors.text.secondary, lineHeight: 1.6, mb: 3 }}>
              Use your admin account to manage the website content.
            </Typography>

            {!configured ? (
              <Box sx={{ p: 2, border: `1px solid ${colors.border.default}`, borderRadius: '6px', backgroundColor: colors.ink }}>
                <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.85rem', color: colors.text.primary, mb: 1, fontWeight: 500 }}>
                  The API is not configured for this build.
                </Typography>
                <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', color: colors.text.secondary, lineHeight: 1.6 }}>
                  Set <Box component="code" sx={{ fontFamily: MONO, fontSize: '0.75rem', color: colors.accent }}>VITE_API_URL</Box> in
                  the environment (see <Box component="code" sx={{ fontFamily: MONO, fontSize: '0.75rem' }}>.env.example</Box>) and rebuild.
                </Typography>
              </Box>
            ) : (
              <Box component="form" onSubmit={submit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {serverError && (
                  <Alert severity="error" sx={{ borderRadius: '6px', fontFamily: '"Inter",sans-serif', fontSize: '0.85rem' }}>
                    {serverError}
                  </Alert>
                )}
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                  autoFocus
                  autoComplete="username"
                  inputMode="email"
                  fullWidth
                  disabled={busy}
                  error={Boolean(fieldErrors.email)}
                  helperText={fieldErrors.email || ' '}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlinedIcon sx={{ fontSize: 16, color: colors.text.tertiary }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((f) => ({ ...f, password: undefined })); }}
                  autoComplete="current-password"
                  fullWidth
                  disabled={busy}
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password || ' '}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ fontSize: 16, color: colors.text.tertiary }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShow((s) => !s)} edge="end" size="small" aria-label={show ? 'Hide password' : 'Show password'} sx={{ color: colors.text.tertiary }}>
                            {show ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!email || !password || busy}
                  endIcon={busy ? <CircularProgress size={14} color="inherit" /> : <ArrowRightAltIcon />}
                  sx={{ py: 1.25 }}
                >
                  {busy ? 'Signing in…' : 'Sign in'}
                </Button>
              </Box>
            )}

            {configured && mock && <DemoAccounts onPick={pickDemo} disabled={busy} />}
          </Box>

          <Typography sx={{ fontFamily: MONO, fontSize: '10.5px', color: colors.text.tertiary, textAlign: 'center', mt: 3, letterSpacing: '0.04em' }}>
            Restricted area · Yali Labs
          </Typography>
        </motion.div>
      </Box>
    </>
  );
}
