import { Box, Typography } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';

/**
 * FlowDiagram — a borderless top-to-bottom pipeline.
 * Used as the "how it works" visual for products without a live demo.
 * Stacking vertically keeps every label fully readable at any width.
 * `stages`: [{ label, sub }] — colors are derived automatically (dims in, accents at the end).
 */
export default function FlowDiagram({ stages }) {
  const colors = useColors();
  const palette = [colors.stone600, colors.stone500, colors.stone500, colors.accentDim, colors.accent, colors.stone600];

  return (
    <Box sx={{ width: '100%' }}>
      {stages.map((stage, i) => {
        const color = palette[i % palette.length];
        const isLast = i === stages.length - 1;
        return (
          <Box key={stage.label} sx={{ display: 'flex', gap: { xs: 2, md: 2.5 } }}>
            {/* Rail: dot + connecting line down to the next stage */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, pt: '7px' }}>
              <Box sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
              {!isLast && <Box sx={{ width: '1px', flex: 1, minHeight: { xs: 26, md: 30 }, backgroundColor: colors.border.default, my: 0.75 }} />}
            </Box>

            <Box sx={{ pb: isLast ? 0 : { xs: 3, md: 3.5 }, minWidth: 0 }}>
              <Typography
                sx={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 600, fontSize: { xs: '1rem', md: '1.05rem' }, letterSpacing: '-0.015em', color: colors.text.primary }}
              >
                {stage.label}
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono",monospace', fontSize: { xs: '12px', md: '12.5px' }, color: colors.text.tertiary, mt: 0.5, lineHeight: 1.6 }}>
                {stage.sub}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
