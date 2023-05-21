import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';
import { useStyles } from './styles';

export function Profile() {
  //  get user data from redux
  const { user } = useSelector(userSelector);
  // get classes from styles
  const classes = useStyles();

  // list of favorite movies
  const favoriteMovies = [

  ];

  // logout function
  const logout = () => {
    localStorage.clear();

    // reload page
    // window.location.reload();
    // or
    window.location.href = '/';
  };

  const { username, id } = user;
  return (
    <Box>
      {/* Show user data */}

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {/* Show favorite movies */}
      {!favoriteMovies.length
        ? <Typography variant="h5" gutterBottom>No favorite movies</Typography>
        : (
          <Box>
            <Typography variant="h5" gutterBottom>My favorite movies</Typography>
          </Box>
        )}
    </Box>
  );
}
