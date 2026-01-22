import { Box, Button } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface MenuItem {
  label: string;
  href: string;
}

interface Props {
  items: MenuItem[];
}

export const HeaderNav: React.FC<Props> = ({ items }) => {
  const location = useLocation();

  const getPath = (href: string) =>
    `${process.env.PUBLIC_URL || ''}${href.startsWith('/') ? href : '/' + href}`;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {items.map((item) => {
        const active = location.pathname === getPath(item.href);
        return (
          <Button
            key={item.href}
            component={Link}
            to={getPath(item.href)}
            color="inherit"
            sx={{
              px: 2.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              position: 'relative',
              ...(active
                ? { color: 'success.main' }
                : {
                    '&:hover': {
                      color: 'success.main',
                      backgroundColor: 'rgba(76, 175, 80, 0.08)',
                    },
                  }),
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
};
