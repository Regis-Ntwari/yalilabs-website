import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * AnimatedReveal — wraps children with a subtle opacity + translateY reveal on scroll.
 */
export default function AnimatedReveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 20,
  sx = {},
  as = 'div',
}) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={sx}
    >
      {children}
    </Box>
  );
}
