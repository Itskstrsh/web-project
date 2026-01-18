import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f0' }}>
      <AppBar position="static" sx={{ bgcolor: '#826C5C', boxShadow: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#F0E1D6' }}>
            Панель администратора
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                textTransform: 'none',
              }}
            >
              Выход
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default AdminLayout;