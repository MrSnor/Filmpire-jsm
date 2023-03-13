import React from 'react';

import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

export function Navbar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>

        {/* mobile menu button */}
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        )}

        {/* theme toggle button */}
        <IconButton color="inherit" sx={{ ml: 1 }}>
          {theme.palette.mode === ' dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* search bar */}
        {!isMobile && 'Search...'}

        {/* profile icon */}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => {}}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/profile/243"
              className={classes.linkButton}
              onClick={() => {}}
            >
              {!isMobile && <>My Movies &nbsp; </>}
              <Avatar
                style={{ width: 30, height: 30 }}
              />
            </Button>
          )}
        </div>

        {/* search bar */}
        {isMobile && 'Search...'}
      </Toolbar>
    </AppBar>
  );
}
