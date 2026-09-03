import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useColors } from '../../theme/ThemeContext';

export default function SectionHeader({
  overline,
  heading,
  description,
  align = 'left',
  accentWord,
  maxWidth = 640,
  sx = {},
}) {
  const colors = useColors();

  const renderHeading = () => {
    if (!accentWord || !heading.includes(accentWord)) return heading;
    const parts = heading.split(accentWord);
    return (
      <>
        {parts[0]}
        <Box component="span" sx={{ color: colors.accent }}>{accentWord}</Box>
        {parts[1]}
      </>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      sx={{ textAlign: align, maxWidth: align === 'center' ? maxWidth : 'none', mx: align === 'center' ? 'auto' : 0, ...sx }}
    >
      {overline && (
        <Typography variant="overline" sx={{ color: colors.accent, display: 'block', mb: 1.5, letterSpacing: '0.12em', fontSize: '0.68rem' }}>
          {overline}
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 600,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: colors.text.primary,
          mb: description ? 2.5 : 0,
        }}
      >
        {renderHeading()}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: colors.text.secondary,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: 1.75,
            fontFamily: '"Inter",sans-serif',
            maxWidth,
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
