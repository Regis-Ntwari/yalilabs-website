import { useCallback, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';

/**
 * useConfirm — promise-based confirmation.
 *   const [confirm, dialog] = useConfirm();
 *   if (await confirm({ title, body, confirmLabel, danger })) { ... }
 *   return <>{dialog}...</>
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useConfirm() {
  const [state, setState] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback((opts) => new Promise((resolve) => {
    resolver.current = resolve;
    setState(opts);
  }), []);

  const close = (result) => {
    resolver.current?.(result);
    resolver.current = null;
    setState(null);
  };

  const dialog = (
    <ConfirmDialog
      open={Boolean(state)}
      title={state?.title}
      body={state?.body}
      confirmLabel={state?.confirmLabel}
      danger={state?.danger}
      onCancel={() => close(false)}
      onConfirm={() => close(true)}
    />
  );

  return [confirm, dialog];
}

export default function ConfirmDialog({ open, title, body, confirmLabel = 'Confirm', danger = false, onCancel, onConfirm }) {
  const colors = useColors();
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: colors.inkLight,
            backgroundImage: 'none',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '10px',
            minWidth: { xs: 'auto', sm: 400 },
            mx: 2,
          },
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '1.05rem', color: colors.text.primary, pb: 1 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: colors.text.secondary, fontSize: '0.9rem', lineHeight: 1.65, fontFamily: '"Inter",sans-serif' }}>
          {body}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={onCancel} variant="text" sx={{ color: colors.text.secondary }}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          autoFocus
          sx={danger ? { backgroundColor: '#d04b4b', color: '#fff', '&:hover': { backgroundColor: '#b53f3f', boxShadow: 'none', transform: 'none' } } : {}}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
