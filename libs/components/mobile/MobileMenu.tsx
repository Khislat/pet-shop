import React from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client'; // bu sizda userni olish uchun kerak bo‘ladi
import { userVar } from '../../../apollo/store';

const MobileMenu: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const user = useReactiveVar(userVar); // user ni olish

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <Box>
      {/* Hamburger Icon */}
      <IconButton onClick={toggleDrawer(true)} edge="start" aria-label="menu">
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          width={250}
          role="presentation"
          onClick={toggleDrawer(false)}
          sx={{ px: 2, py: 2 }}
        >
          <nav>
            <List>
              <ListItem>
                <Link href="/">Home</Link>
              </ListItem>
              <ListItem>
                <Link href="/shop">Shop</Link>
              </ListItem>
              <ListItem>
                <Link href="/vendors">Vendors</Link>
              </ListItem>
              {user?._id && (
                <ListItem>
                  <Link href="/mypage">My Page</Link>
                </ListItem>
              )}
              <ListItem>
                <Link href="/">Blog</Link>
              </ListItem>
              <ListItem>
                <Link href="/">Contact</Link>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileMenu;
