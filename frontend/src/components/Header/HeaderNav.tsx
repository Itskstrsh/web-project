import { Box, Button } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { toggleCart } from '../../store/slices/cartSlice';

export interface MenuItem {
  label: string;
  href: string;
  onClick?: string;
}

interface Props {
  items: MenuItem[];
}

export const HeaderNav: React.FC<Props> = ({ items }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.onClick === 'cart') {
      e.preventDefault();
      dispatch(toggleCart());
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {items.map((item) => {
        const active = location.pathname === item.href;
        return (
          <Button
            key={item.href}
            component={item.onClick === 'cart' ? 'button' : Link}
            to={item.onClick === 'cart' ? undefined : item.href}
            onClick={(e) => handleClick(item, e)}
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
