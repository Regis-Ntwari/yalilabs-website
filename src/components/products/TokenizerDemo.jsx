import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';

const DEMO_SENTENCES = [
  { text: 'Nagiye gusura abanyeshuri.', tokens: ['Na', 'gi', 'ye', ' gu', 'su', 'ra', ' aba', 'nye', 'shu', 'ri', '.'], ids: [78, 1760, 203, 5256, 892, 451, 1845, 634, 907, 46, 12], chars: 26 },
  { text: 'Umugabo arakorana neza.', tokens: ['Uma', 'ga', 'bo', ' ara', 'ko', 'ra', 'na', ' ne', 'za', '.'], ids: [234, 523, 87, 1023, 412, 451, 289, 876, 102, 12], chars: 22 },
  { text: 'Amakuru yanyu meza.', tokens: ['Ama', 'ku', 'ru', ' yan', 'yu', ' me', 'za', '.'], ids: [445, 234, 67, 891, 203, 567, 102, 12], chars: 19 },
];

const labelSx = (colors) => ({
  fontFamily: '"IBM Plex Mono",monospace',
  fontSize: '11px',
  color: colors.text.tertiary,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  mb: 1.75,
});

/** TokenizerDemo — interactive Alta Tokenizer playground used as its "how it works" visual. */
export default function TokenizerDemo() {
  const colors = useColors();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showTokens, setShowTokens] = useState(true);
  const demo = DEMO_SENTENCES[selectedIdx];
  const ratio = (demo.chars / demo.tokens.length).toFixed(2);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Example picker */}
      <Typography sx={labelSx(colors)}>Select example</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5, mb: { xs: 4, md: 5 } }}>
        {DEMO_SENTENCES.map((s, i) => {
          const isActive = i === selectedIdx;
          return (
            <Box
              key={i}
              component="button"
              type="button"
              onClick={() => setSelectedIdx(i)}
              sx={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                borderLeft: `2px solid ${isActive ? colors.accent : 'transparent'}`,
                pl: 1.75,
                py: 0.9,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, color 0.15s ease',
                '&:hover p': { color: isActive ? colors.accent : colors.text.primary },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono",monospace',
                  fontSize: { xs: '14px', md: '15px' },
                  lineHeight: 1.6,
                  color: isActive ? colors.accent : colors.text.secondary,
                  transition: 'color 0.15s ease',
                }}
              >
                {s.text}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Output */}
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Typography sx={{ ...labelSx(colors), mb: 0 }}>Output — {showTokens ? 'tokens' : 'token IDs'}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['Tokens', 'IDs'].map(label => {
            const isActive = showTokens ? label === 'Tokens' : label === 'IDs';
            return (
              <Button
                key={label}
                onClick={() => setShowTokens(label === 'Tokens')}
                variant="text"
                sx={{
                  p: 0,
                  minWidth: 'auto',
                  fontFamily: '"IBM Plex Mono",monospace',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? colors.accent : colors.text.tertiary,
                  '&:hover': { backgroundColor: 'transparent', color: isActive ? colors.accent : colors.text.primary },
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ mt: 2.5, mb: { xs: 4, md: 5 } }}>
        {showTokens ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {demo.tokens.map((token, i) => (
              <motion.div key={`${selectedIdx}-${i}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2, delay: i * 0.03 }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '4px',
                    backgroundColor: i % 2 === 0 ? colors.accentFaint : colors.inkSurface,
                    fontFamily: '"IBM Plex Mono",monospace',
                    fontSize: { xs: '14px', md: '15px' },
                    whiteSpace: 'pre',
                    color: i % 2 === 0 ? colors.accent : colors.text.secondary,
                  }}
                >
                  {token}
                </Box>
              </motion.div>
            ))}
          </Box>
        ) : (
          <Typography
            sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: { xs: '14px', md: '15px' }, color: colors.accent, wordBreak: 'break-word', lineHeight: 1.9 }}
          >
            [{demo.ids.join(', ')}]
          </Typography>
        )}
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 4, md: 6 } }}>
        {[{ label: 'Characters', value: demo.chars }, { label: 'Tokens', value: demo.tokens.length }, { label: 'Compression', value: `${ratio}×` }].map(({ label, value }) => (
          <Box key={label}>
            <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: '10.5px', color: colors.text.tertiary, letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.75 }}>
              {label}
            </Typography>
            <Typography
              sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: { xs: '1.5rem', md: '1.7rem' }, letterSpacing: '-0.025em', color: label === 'Compression' ? colors.accent : colors.text.primary }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
