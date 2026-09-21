import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography, Tabs, Tab, Snackbar, Alert, Chip, CircularProgress } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useBeforeUnload } from 'react-router-dom';
import { useColors } from '../../theme/ThemeContext';
import { defaults } from '../../content/defaults';
import { parseModule, validateModule, describeIssuePath } from '../../content/schemas';
import { useAdminUiStore } from '../../stores/adminUiStore';
import { useModuleQuery, useSaveModule } from '../hooks/useContentQueries';
import SchemaForm from './SchemaForm';
import { sanitize, deepEqual } from './schema';
import { useConfirm } from './ConfirmDialog';

const MONO = '"IBM Plex Mono",monospace';
const MAX_ISSUES_SHOWN = 8;

function Centered({ children }) {
  const colors = useColors();
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 3, backgroundColor: colors.ink }}>
      {children}
    </Box>
  );
}

/** Loads the module from the API, then hands the editor a stable starting value. */
export default function ModulePage({ module }) {
  const colors = useColors();
  const query = useModuleQuery(module.key);

  if (query.isPending) {
    return (
      <Centered>
        <CircularProgress size={24} sx={{ color: colors.accent }} />
      </Centered>
    );
  }

  if (query.isError) {
    return (
      <Centered>
        <Box sx={{ maxWidth: 420, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1.1rem', color: colors.text.primary, mb: 1 }}>
            Could not load “{module.label}”
          </Typography>
          <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.875rem', color: colors.text.secondary, lineHeight: 1.6, mb: 2.5 }}>
            {query.error?.message || 'The server did not respond.'}
          </Typography>
          <Button onClick={() => query.refetch()} variant="outlined" size="small" startIcon={<RefreshIcon sx={{ fontSize: '16px !important' }} />}>
            Try again
          </Button>
        </Box>
      </Centered>
    );
  }

  return <ModuleEditor module={module} saved={query.data.value} serverIssues={query.data.issues} />;
}

function ModuleEditor({ module, saved, serverIssues }) {
  const colors = useColors();
  const setDirty = useAdminUiStore((s) => s.setDirty);
  const [confirm, confirmDialog] = useConfirm();
  const saveMutation = useSaveModule(module.key);

  const [draft, setDraft] = useState(saved);
  const [formVersion, setFormVersion] = useState(0);
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState(null);
  const [issues, setIssues] = useState([]);

  const dirty = useMemo(() => !deepEqual(draft, saved), [draft, saved]);
  const isDefault = useMemo(() => deepEqual(saved, defaults[module.key]), [saved, module.key]);
  const saving = saveMutation.isPending;

  useEffect(() => { setDirty(dirty); return () => setDirty(false); }, [dirty, setDirty]);

  useBeforeUnload(useCallback((e) => {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  }, [dirty]));

  const cleanDraft = useCallback(() => {
    const clean = { ...draft };
    for (const s of module.sections) clean[s.key] = sanitize(s.fields, draft[s.key]);
    return clean;
  }, [draft, module]);

  /** Replace the draft wholesale (after a save/reset) and remount the form. */
  const adopt = useCallback((value) => {
    setDraft(value);
    setFormVersion((v) => v + 1);
  }, []);

  const persist = useCallback(async (value, successText) => {
    try {
      const response = await saveMutation.mutateAsync(value);
      adopt(parseModule(module.key, response).value);
      setIssues([]);
      setToast({ severity: 'success', text: successText });
      return true;
    } catch (err) {
      setToast({ severity: 'error', text: err?.message || 'Saving failed.' });
      return false;
    }
  }, [saveMutation, adopt, module.key]);

  const save = useCallback(async () => {
    if (!dirty || saving) return;
    const clean = cleanDraft();
    const result = validateModule(module.key, clean);
    if (!result.ok) {
      setIssues(result.issues);
      // Jump to the section holding the first problem.
      const sectionIndex = module.sections.findIndex((s) => s.key === result.issues[0]?.path?.[0]);
      if (sectionIndex >= 0) setTab(sectionIndex);
      setToast({ severity: 'error', text: `Fix ${result.issues.length} issue${result.issues.length === 1 ? '' : 's'} before saving.` });
      return;
    }
    await persist(result.data, 'Saved. The live site now shows your changes.');
  }, [dirty, saving, cleanDraft, module, persist]);

  const discard = () => {
    adopt(saved);
    setIssues([]);
  };

  const resetToDefaults = async () => {
    const ok = await confirm({
      title: `Reset "${module.label}" to defaults?`,
      body: 'This replaces the live content of this module with the copy shipped with the site. Everyone will see the change immediately.',
      confirmLabel: 'Reset module',
      danger: true,
    });
    if (!ok) return;
    await persist(defaults[module.key], 'Module reset to defaults.');
  };

  // Ctrl/Cmd + S saves
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save]);

  const section = module.sections[Math.min(tab, module.sections.length - 1)];
  const ModuleIcon = module.icon;
  const sectionIssues = issues.filter((i) => i.path?.[0] === section.key);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: colors.isDark ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.border.subtle}`,
        }}
      >
        <Box sx={{ maxWidth: 980, mx: 'auto', px: { xs: 2.5, md: 5 }, pt: { xs: 2.5, md: 3.5 }, pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', minWidth: 0 }}>
              <Box
                sx={{
                  width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                  backgroundColor: colors.accentFaint, border: `1px solid ${colors.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ModuleIcon sx={{ fontSize: 20, color: colors.accent }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
                  <Typography variant="h1" sx={{ fontSize: { xs: '1.35rem', md: '1.6rem' }, fontWeight: 600, letterSpacing: '-0.025em', color: colors.text.primary }}>
                    {module.label}
                  </Typography>
                  {dirty ? (
                    <Chip label="Unsaved changes" size="small" sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.06em', height: 22, backgroundColor: 'rgba(232,184,74,0.15)', color: colors.isDark ? '#e8c84a' : '#9a6b00', border: '1px solid rgba(232,184,74,0.35)' }} />
                  ) : isDefault ? (
                    <Chip label="Default content" size="small" sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.06em', height: 22, backgroundColor: colors.inkSurface, color: colors.text.tertiary, border: `1px solid ${colors.border.subtle}` }} />
                  ) : (
                    <Chip label="Live" size="small" sx={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.06em', height: 22, backgroundColor: colors.accentFaint, color: colors.accent, border: `1px solid ${colors.accent}33` }} />
                  )}
                </Box>
                <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.85rem', color: colors.text.secondary, mt: 0.5, lineHeight: 1.5 }}>
                  {module.description}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, ml: 'auto' }}>
              <Button
                component="a"
                href={module.route}
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                size="small"
                endIcon={<OpenInNewIcon sx={{ fontSize: '13px !important' }} />}
                sx={{ fontSize: '13px', color: colors.text.secondary, display: { xs: 'none', sm: 'inline-flex' } }}
              >
                View page
              </Button>
              {dirty && (
                <Button onClick={discard} disabled={saving} variant="outlined" size="small" sx={{ fontSize: '13px' }}>
                  Discard
                </Button>
              )}
              <Button
                onClick={save}
                disabled={!dirty || saving}
                variant="contained"
                size="small"
                startIcon={saving ? <CircularProgress size={14} color="inherit" /> : <SaveIcon sx={{ fontSize: '15px !important' }} />}
                sx={{ fontSize: '13px', px: 2 }}
              >
                {saving ? 'Saving…' : 'Save'}
              </Button>
            </Box>
          </Box>

          {module.sections.length > 1 && (
            <Tabs
              value={Math.min(tab, module.sections.length - 1)}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: 40,
                '& .MuiTab-root': {
                  fontFamily: '"Space Grotesk",sans-serif', fontWeight: 500, fontSize: '13.5px', textTransform: 'none',
                  minHeight: 40, px: 1.75, color: colors.text.secondary, letterSpacing: '-0.005em',
                  '&.Mui-selected': { color: colors.accent },
                },
                '& .MuiTabs-indicator': { backgroundColor: colors.accent, height: 2 },
              }}
            >
              {module.sections.map((s) => {
                const count = issues.filter((i) => i.path?.[0] === s.key).length;
                return <Tab key={s.key} label={count ? `${s.label} (${count})` : s.label} sx={count ? { color: '#d04b4b !important' } : undefined} />;
              })}
            </Tabs>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ maxWidth: 980, width: '100%', mx: 'auto', px: { xs: 2.5, md: 5 }, py: { xs: 3, md: 4 }, flex: 1 }}>
        {serverIssues.length > 0 && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: '8px', fontFamily: '"Inter",sans-serif', fontSize: '0.85rem' }}>
            The content stored on the server for this module did not match the expected shape, so the defaults are shown.
            Saving will overwrite the server copy.
          </Alert>
        )}

        {sectionIssues.length > 0 && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '8px', fontFamily: '"Inter",sans-serif', fontSize: '0.85rem' }}>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {sectionIssues.slice(0, MAX_ISSUES_SHOWN).map((issue, i) => (
                <li key={i}>
                  <Box component="span" sx={{ fontFamily: MONO, fontSize: '0.75rem', mr: 0.75 }}>{describeIssuePath(issue.path.slice(1))}</Box>
                  {issue.message}
                </li>
              ))}
              {sectionIssues.length > MAX_ISSUES_SHOWN && <li>…and {sectionIssues.length - MAX_ISSUES_SHOWN} more.</li>}
            </Box>
          </Alert>
        )}

        {section.note && (
          <Alert
            severity="info"
            icon={false}
            sx={{
              mb: 3, borderRadius: '8px', backgroundColor: colors.accentFaint, color: colors.text.secondary,
              border: `1px solid ${colors.accent}22`, fontFamily: '"Inter",sans-serif', fontSize: '0.85rem',
            }}
          >
            {section.note}
          </Alert>
        )}

        <SchemaForm
          key={`${formVersion}-${section.key}`}
          fields={section.fields}
          value={draft[section.key]}
          onChange={(v) => setDraft((d) => ({ ...d, [section.key]: v }))}
        />

        {/* Footer actions */}
        <Box sx={{ mt: 6, pt: 3, borderTop: `1px solid ${colors.border.subtle}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.04em' }}>
            Tip: press Ctrl/Cmd + S to save.
          </Typography>
          <Button
            onClick={resetToDefaults}
            disabled={saving || (isDefault && !dirty)}
            variant="text"
            size="small"
            startIcon={<RestartAltIcon sx={{ fontSize: '15px !important' }} />}
            sx={{ fontSize: '12.5px', color: colors.text.tertiary, '&:hover': { color: '#d04b4b' } }}
          >
            Reset module to defaults
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3200}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast(null)}
          severity={toast?.severity || 'success'}
          variant="filled"
          sx={{ borderRadius: '6px', fontFamily: '"Inter",sans-serif', fontSize: '0.85rem' }}
        >
          {toast?.text}
        </Alert>
      </Snackbar>

      {confirmDialog}
    </Box>
  );
}
