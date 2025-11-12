import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderLogo: React.FC = () => (
  <Box component={Link} to="/" sx={{
    display: 'flex', alignItems: 'center', textDecoration: 'none'
  }}>
    <Box sx={{
      width: 48,
      height: 48,
      borderRadius: 2,
      background: (theme) => `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 3,
      mr: 2,
    }}>
      <Typography variant="h6" color="white" fontWeight="bold">V</Typography>
    </Box>
    <Box sx={{ lineHeight: 1 }}>
      <Typography variant="h6" fontWeight="bold" color="success.dark">
        ВИНЕГРЕТ
      </Typography>
      <Typography variant="caption" color="success.main">
        МАГАЗИН – КУЛИНАРИЯ
      </Typography>
    </Box>
  </Box>
);
