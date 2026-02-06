import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import cat from '/images/cat.png';

const MotionBox = motion(Box);

const HeroImage: React.FC = () => (
  <MotionBox
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
    sx={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: 6,
        transform: 'rotate(3deg) scale(1.05)',
        background: 'linear-gradient(to bottom right, #bbf7d0, #a7f3d0)',
      }}
    />

    <Box
      component="img"
      src={cat}
      alt="Котик с едой"
      sx={{
        position: 'relative',
        zIndex: 10,
        borderRadius: 5,
        height: { xs: 400, sm: 500, lg: 650 },
        width: 'auto',
        objectFit: 'contain',
      }}
    />

    <Box sx={{ position: 'absolute', bottom: -24, left: -24, width: 96, height: 96, bgcolor: '#facc15', borderRadius: 4, opacity: 0.2 }} />
    <Box sx={{ position: 'absolute', top: -24, right: -24, width: 80, height: 80, bgcolor: '#86efac', borderRadius: 4, opacity: 0.3 }} />
  </MotionBox>
);

export default HeroImage;
