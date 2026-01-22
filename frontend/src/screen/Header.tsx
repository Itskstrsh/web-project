import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { HeaderLogo } from '../components/Header/HeaderLogo';
import { HeaderNav } from '../components/Header/HeaderNav';
import { HeaderPhone } from '../components/Header/HeaderPhone';

const menuItems = [
  { label: 'О нас', href: '/#about' },
  { label: 'Ассортимент', href: '/assortment' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Корзина', href: '#', onClick: 'cart' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #c8e6c9',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <HeaderLogo />

            {!isMobile && <HeaderNav items={menuItems} />}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HeaderPhone />

              {isMobile && (
                <IconButton
                  color="success"
                  size="large"
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map(item => (
              <ListItemButton
                key={item.label}
                component="a"
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};


export default Header;
