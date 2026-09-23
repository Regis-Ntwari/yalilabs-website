import { useState } from 'react';
import { Box, TextField, MenuItem, Switch, Typography, IconButton, Button, Collapse, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useColors } from '../../theme/ThemeContext';
import { useConfirm } from './ConfirmDialog';
import { newItemFor, newUid } from './schema';

const MONO = '"IBM Plex Mono",monospace';

/* ─── Shared styles ─────────────────────────────────────────────────────── */
function useFieldSx() {
  const colors = useColors();
  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: colors.ink,
      fontFamily: '"Inter",sans-serif',
      fontSize: '0.9rem',
      '& fieldset': { borderColor: colors.border.default },
      '&:hover fieldset': { borderColor: colors.border.strong },
      '&.Mui-focused fieldset': { borderColor: colors.accent, borderWidth: 1 },
    },
    '& .MuiInputLabel-root': { fontFamily: '"Inter",sans-serif', fontSize: '0.9rem' },
    '& .MuiFormHelperText-root': { fontFamily: '"Inter",sans-serif', fontSize: '0.75rem', mx: 0.25, color: colors.text.tertiary },
  };
}

function Label({ children, help }) {
  const colors = useColors();
  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: '0.85rem', color: colors.text.primary, letterSpacing: '-0.005em' }}>
        {children}
      </Typography>
      {help && (
        <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.75rem', color: colors.text.tertiary, mt: 0.25 }}>
          {help}
        </Typography>
      )}
    </Box>
  );
}

/* ─── Primitive fields ──────────────────────────────────────────────────── */
function TextInput({ field, value, onChange }) {
  const sx = useFieldSx();
  const isArea = field.type === 'textarea';
  return (
    <TextField
      label={field.label}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      helperText={field.help}
      fullWidth
      size="small"
      multiline={isArea}
      minRows={isArea ? field.rows || 3 : undefined}
      sx={sx}
    />
  );
}

function NumberInput({ field, value, onChange }) {
  const sx = useFieldSx();
  return (
    <TextField
      label={field.label}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      helperText={field.help}
      fullWidth
      size="small"
      type="number"
      inputMode="decimal"
      sx={sx}
    />
  );
}

function SelectInput({ field, value, onChange }) {
  const sx = useFieldSx();
  const options = field.options || [];
  const current = options.some((o) => o.value === value) ? value : (options[0]?.value ?? '');
  return (
    <TextField
      select
      label={field.label}
      value={current}
      onChange={(e) => onChange(e.target.value)}
      helperText={field.help}
      fullWidth
      size="small"
      sx={sx}
    >
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value} sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.875rem' }}>
          {o.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

function BooleanInput({ field, value, onChange }) {
  const colors = useColors();
  return (
    <Box
      component="label"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 1.75,
        py: 1.1,
        border: `1px solid ${colors.border.default}`,
        borderRadius: '4px',
        backgroundColor: colors.ink,
        cursor: 'pointer',
        minHeight: 40,
        '&:hover': { borderColor: colors.border.strong },
      }}
    >
      <Box>
        <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.875rem', color: colors.text.primary }}>{field.label}</Typography>
        {field.help && <Typography sx={{ fontFamily: '"Inter",sans-serif', fontSize: '0.75rem', color: colors.text.tertiary }}>{field.help}</Typography>}
      </Box>
      <Switch size="small" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
    </Box>
  );
}

/**
 * Arrays edited as delimited text. Local text state is seeded once from the
 * value; the parent remounts the form (via key) whenever it replaces the draft
 * wholesale, so no sync effect is needed.
 */
function DelimitedInput({ field, value, onChange }) {
  const sx = useFieldSx();
  const delimiter = field.type === 'lines' ? '\n' : field.type === 'pipe' ? '|' : ',';
  const [text, setText] = useState(() => (Array.isArray(value) ? value.join(delimiter) : ''));

  const handle = (e) => {
    const next = e.target.value;
    setText(next);
    onChange(next === '' ? [] : next.split(delimiter));
  };

  return (
    <TextField
      label={field.label}
      value={text}
      onChange={handle}
      helperText={field.help}
      fullWidth
      size="small"
      multiline={field.type === 'lines'}
      minRows={field.type === 'lines' ? field.rows || 4 : undefined}
      sx={{ ...sx, '& .MuiOutlinedInput-root': { ...sx['& .MuiOutlinedInput-root'], fontFamily: field.type === 'lines' ? '"Inter",sans-serif' : MONO } }}
    />
  );
}

/* ─── Composite fields ──────────────────────────────────────────────────── */
function ObjectInput({ field, value, onChange }) {
  const colors = useColors();
  return (
    <Box sx={{ border: `1px solid ${colors.border.subtle}`, borderRadius: '8px', p: { xs: 2, md: 2.5 }, backgroundColor: colors.inkLight }}>
      <Label help={field.help}>{field.label}</Label>
      <SchemaForm fields={field.fields} value={value || {}} onChange={onChange} />
    </Box>
  );
}

function ListInput({ field, value, onChange }) {
  const colors = useColors();
  const items = Array.isArray(value) ? value : [];
  const [uids, setUids] = useState(() => items.map(() => newUid()));
  const [open, setOpen] = useState({});
  const [confirm, confirmDialog] = useConfirm();

  // Defensive: if the array changed length outside of this component, re-key.
  const ids = uids.length === items.length ? uids : items.map((_, i) => uids[i] ?? newUid());

  const commit = (nextItems, nextIds) => {
    setUids(nextIds);
    onChange(nextItems);
  };

  const update = (i, item) => onChange(items.map((it, idx) => (idx === i ? item : it)));

  const add = () => {
    const id = newUid();
    commit([...items, newItemFor(field)], [...ids, id]);
    setOpen((o) => ({ ...o, [id]: true }));
  };

  const remove = async (i) => {
    const label = field.itemLabel?.(items[i], i) || `item ${i + 1}`;
    const ok = await confirm({
      title: `Remove "${label}"?`,
      body: 'It will disappear from the list. Nothing is written to the site until you press Save.',
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!ok) return;
    commit(items.filter((_, idx) => idx !== i), ids.filter((_, idx) => idx !== i));
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const nextItems = [...items];
    const nextIds = [...ids];
    [nextItems[i], nextItems[j]] = [nextItems[j], nextItems[i]];
    [nextIds[i], nextIds[j]] = [nextIds[j], nextIds[i]];
    commit(nextItems, nextIds);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 1.5 }}>
        <Label help={field.help}>{field.label}</Label>
        <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.text.tertiary, letterSpacing: '0.06em', mb: 1.25, flexShrink: 0 }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {items.map((item, i) => {
          const id = ids[i];
          const isOpen = Boolean(open[id]);
          const label = field.itemLabel?.(item, i) || `Item ${i + 1}`;
          return (
            <Box
              key={id}
              sx={{
                border: `1px solid ${isOpen ? colors.border.default : colors.border.subtle}`,
                borderRadius: '8px',
                backgroundColor: colors.inkLight,
                transition: 'border-color 0.15s ease',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setOpen((o) => ({ ...o, [id]: !isOpen }))}
              >
                <Typography sx={{ fontFamily: MONO, fontSize: '11px', color: colors.accent, letterSpacing: '0.08em', width: 24, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontFamily: '"Space Grotesk",sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: label ? colors.text.primary : colors.text.tertiary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label || <em>Untitled</em>}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }} onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Move up">
                    <span>
                      <IconButton size="small" onClick={() => move(i, -1)} disabled={i === 0} sx={{ color: colors.text.tertiary }}>
                        <KeyboardArrowUpIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Move down">
                    <span>
                      <IconButton size="small" onClick={() => move(i, 1)} disabled={i === items.length - 1} sx={{ color: colors.text.tertiary }}>
                        <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Remove">
                    <IconButton size="small" onClick={() => remove(i)} sx={{ color: colors.text.tertiary, '&:hover': { color: '#d04b4b' } }}>
                      <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    onClick={() => setOpen((o) => ({ ...o, [id]: !isOpen }))}
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                    sx={{ color: colors.text.secondary, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={isOpen} unmountOnExit>
                <Box sx={{ px: { xs: 1.5, md: 2.5 }, pb: 2.5, pt: 1.5, borderTop: `1px solid ${colors.border.subtle}` }}>
                  <SchemaForm fields={field.itemFields} value={item} onChange={(v) => update(i, v)} />
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={add}
        variant="outlined"
        size="small"
        startIcon={<AddIcon sx={{ fontSize: '16px !important' }} />}
        sx={{ mt: 1.5, fontSize: '13px', borderStyle: 'dashed', width: '100%', py: 1 }}
      >
        Add {field.itemName || 'item'}
      </Button>

      {confirmDialog}
    </Box>
  );
}

/* ─── Field dispatcher ──────────────────────────────────────────────────── */
function Field({ field, value, onChange }) {
  switch (field.type) {
    case 'text':
    case 'textarea':
      return <TextInput field={field} value={value} onChange={onChange} />;
    case 'number':
      return <NumberInput field={field} value={value} onChange={onChange} />;
    case 'select':
      return <SelectInput field={field} value={value} onChange={onChange} />;
    case 'boolean':
      return <BooleanInput field={field} value={value} onChange={onChange} />;
    case 'lines':
    case 'pipe':
    case 'numbers':
      return <DelimitedInput field={field} value={value} onChange={onChange} />;
    case 'object':
      return <ObjectInput field={field} value={value} onChange={onChange} />;
    case 'list':
      return <ListInput field={field} value={value} onChange={onChange} />;
    default:
      return null;
  }
}

/**
 * SchemaForm - renders an object `value` according to `fields`.
 * Half-width fields share a row on desktop; everything else spans the row.
 */
export default function SchemaForm({ fields, value, onChange }) {
  const set = (name, v) => onChange({ ...(value || {}), [name]: v });
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 2, rowGap: 2.25 }}>
      {fields.map((field) => (
        <Box key={field.name} sx={{ gridColumn: field.half ? { xs: '1 / -1', md: 'auto' } : '1 / -1', minWidth: 0 }}>
          <Field field={field} value={value?.[field.name]} onChange={(v) => set(field.name, v)} />
        </Box>
      ))}
    </Box>
  );
}
