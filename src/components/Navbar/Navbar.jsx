import React, { useState } from 'react';

import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

// import { Sidebar } from '..';
import { Sidebar } from '../Sidebar/Sidebar';

import { Search } from '../Search/Search';

import useStyles from './styles';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>

      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>

          {/* mobile menu button */}
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
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
          {!isMobile && <Search />}

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
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className={classes.drawer}>
          {isMobile ? (

            // Sidebar drawer for mobile devices
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (

            // Sidebar drawer for desktop devices
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
}
