import { Box } from '@mui/material';
import React from 'react';
import HeroBackground from './HeroBackground';
import HeroImage from './HeroImage';
import HeroText from './HeroText';

const HeroBanner: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <HeroBackground />

      <Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    position: 'relative',
    zIndex: 10,
    px: { xs: 3, sm: 6, md: 10 },
    py: { xs: 6, md: 12 },
    maxWidth: 1600,
    mx: 'auto',
  }}
>
  {/* Левая часть */}
  <Box
    sx={{
      width: { xs: '100%', lg: '50%' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: { xs: 'center', lg: 'flex-start' },
      textAlign: { xs: 'center', lg: 'left' },
    }}
  >
    <HeroText />
  </Box>

  {/* Правая часть */}
  <Box
    sx={{
      width: { xs: '100%', lg: '50%' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: { xs: 'center', lg: 'flex-end' },
      mt: { xs: 4, lg: 0 },
    }}
  >
    <HeroImage />
  </Box>
</Box>
    </Box>
  );
};

export default HeroBanner;