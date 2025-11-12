import PhoneIcon from '@mui/icons-material/Phone';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export const HeaderPhone: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) return null;

  return (
    <Button
      href="tel:+79881304576"
      variant="contained"
      color="success"
      startIcon={<PhoneIcon />}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: 3,
        '&:hover': { boxShadow: 6 },
      }}
    >
      +7 (988) 130-45-76
    </Button>
  );
};
