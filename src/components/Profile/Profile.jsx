import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { userSelector } from '../../features/auth';
import { useStyles } from './styles';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

export function Profile() {
  //  get user data from redux
  const { user } = useSelector(userSelector);
  const accountId = user?.id;
  // get classes from styles
  const classes = useStyles();

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite/movies',
    accountId,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

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
      {!favoriteMovies?.results.length && !watchlistMovies?.results.length
        ? <Typography variant="h5" gutterBottom>Add favorites or watchlist some movies to see them here</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
            <RatedCards title="Watchlist" data={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
}
