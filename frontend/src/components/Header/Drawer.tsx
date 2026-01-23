import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderMobileMenu: React.FC<{ menuItems: { label: string; href: string }[] }> = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton color="success" size="large" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          {menuItems.map(item => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton component={Link} to={item.href} onClick={toggleDrawer}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default HeaderMobileMenu;
