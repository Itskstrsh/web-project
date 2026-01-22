import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { HeaderLogo } from '../components/Header/HeaderLogo';
import { HeaderNav } from '../components/Header/HeaderNav';
import { HeaderPhone } from '../components/Header/HeaderPhone';

const menuItems = [
  { label: 'О нас', href: '/#about' },
  { label: 'Ассортимент', href: '/assortment' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Корзина', href: '/cart' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

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
                <IconButton color="success" size="large" onClick={handleOpenDrawer}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseDrawer}
          onKeyDown={handleCloseDrawer}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} to={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
