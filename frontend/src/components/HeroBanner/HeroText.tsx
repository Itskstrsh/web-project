import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import HeroFeatureItem from './HeroFeatureItem';

const MotionBox = motion(Box);

const features = [
  { color: '#16A34A', text: 'ПОЛУФАБРИКАТЫ' },
  { color: '#059669', text: 'ВЫПЕЧКА' },
  { color: '#EAB308', text: 'ГОТОВАЯ ЕДА' },
];

const HeroText: React.FC = () => (
  <MotionBox
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontWeight: 900,
        fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
        lineHeight: 1.1,
        color: '#4e0606ff',
        mb: 3,
      }}
    >
      ВКУС МЕНЯЕТ <br />
      <Box
        component="span"
        sx={{
          background: 'linear-gradient(to right, #16a34a, #059669)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        НАСТРОЕНИЕ
      </Box>
    </Typography>

    <Typography
      variant="h5"
      sx={{
        color: '#15803d',
        fontWeight: 500,
        mb: 5,
        maxWidth: 600,
      }}
    >
      Откройте для себя мир изысканных вкусов и кулинарных шедевров
    </Typography>

    <Button
      href="#order"
      variant="contained"
      sx={{
        background: 'linear-gradient(to right, #16a34a, #059669)',
        borderRadius: 3,
        px: 5,
        py: 1.5,
        fontSize: '1.2rem',
        fontWeight: 700,
        boxShadow: 4,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(to right, #15803d, #047857)',
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      АССОРТИМЕНТ
    </Button>

    <Box 
  sx={{ 
    display: 'grid',
    gridTemplateColumns: { 
      xs: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)'
    },
    gap: 2,
    mt: 6,
    position: 'relative',
    zIndex: 1,
    // На маленьких экранах третий элемент занимает всю ширину
    '& > *:nth-of-type(3)': {
      gridColumn: { xs: '1 / -1', md: 'auto' },
      justifySelf: { xs: 'center', md: 'auto' },
      maxWidth: { xs: 200, md: '100%' },
    }
  }}
>
  {features.map((f) => (
    <HeroFeatureItem key={f.text} color={f.color} text={f.text} />
  ))}
</Box>
  </MotionBox>
);

export default HeroText;
