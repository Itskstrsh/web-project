import { Box } from '@mui/material';
import React from 'react';

const HeroBackground: React.FC = () => (
  <>
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 40%, #ecfdf5 100%)',
      }}
    />
    <Box sx={{ position: 'absolute', top: 40, left: 40, width: 80, height: 80, bgcolor: '#dcfce7', borderRadius: '50%', opacity: 0.6 }} />
    <Box sx={{ position: 'absolute', bottom: 80, right: 80, width: 64, height: 64, bgcolor: '#d1fae5', borderRadius: '50%', opacity: 0.4 }} />
    <Box sx={{ position: 'absolute', top: '30%', right: '25%', width: 48, height: 48, bgcolor: '#fef9c3', borderRadius: '50%', opacity: 0.5 }} />
  </>
);

export default HeroBackground;
