import { Box } from '@mui/material';
import { useColors } from '../../theme/ThemeContext';

/**
 * GridBackground — subtle technical grid overlay used in hero and key sections.
 * Uses CSS to draw a fine dot-grid pattern.
 */
export default function GridBackground({ children, sx = {} }) {
  const colors = useColors();
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Dot grid */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${colors.dotColor} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.35,
          zIndex: 0,
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Top fade */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `linear-gradient(to bottom, ${colors.ink}, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: `linear-gradient(to top, ${colors.ink}, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>{children}</Box>
    </Box>
  );
}
