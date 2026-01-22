import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { HeaderLogo } from '../components/Header/HeaderLogo';
import { HeaderNav } from '../components/Header/HeaderNav';
import { HeaderPhone } from '../components/Header/HeaderPhone';
import { MenuItem } from '../components/Header/HeaderNav';
import { Link } from 'react-router-dom';

const menuItems: MenuItem[] = [
  { label: 'О нас', href: '/#about' },
  { label: 'Ассортимент', href: '/assortment' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Корзина', href: '#', onClick: 'cart' },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getPath = (href: string) =>
    `${process.env.PUBLIC_URL || ''}${href.startsWith('/') ? href : '/' + href}`;

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
                <IconButton color="success" size="large" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component={Link} to={getPath(item.href)}>
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
