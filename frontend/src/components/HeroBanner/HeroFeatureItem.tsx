import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface FeatureItemProps {
  color: string;
  text: string;
}

const HeroFeatureItem: React.FC<FeatureItemProps> = ({ color, text }) => (
  <Paper
    elevation={2}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 1, sm: 1.5 },
      p: { xs: 1.5, sm: 2 },
      borderRadius: 3,
      border: '1px solid #dcfce7',
      bgcolor: 'white',
      width: '100%', // Занимает всю ячейку grid
      position: 'relative',
      zIndex: 1,
    }}
  >
    <Box
      sx={{
        width: { xs: 28, sm: 36 },
        height: { xs: 28, sm: 36 },
        borderRadius: '50%',
        bgcolor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: { xs: 14, sm: 16 },
        flexShrink: 0,
      }}
    >
      ✓
    </Box>
    <Typography 
      fontWeight={700} 
      color="#064e3b"
      sx={{
        fontSize: { xs: '0.8rem', sm: '0.9rem' },
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </Typography>
  </Paper>
);

export default HeroFeatureItem;