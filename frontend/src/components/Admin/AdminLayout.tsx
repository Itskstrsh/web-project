import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f0' }}>
      <AppBar position="static" sx={{ bgcolor: '#826C5C', boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#F0E1D6' }}>
            Панель администратора
          </Typography>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              textTransform: 'none',
            }}
          >
            На главную
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default AdminLayout;