import { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

export function Movies() {
  const { data, error, isFetching } = useGetMoviesQuery();
  console.log('🚀 ~ Movies ~ data:', data);

  // checks if data is being fetched
  if (isFetching) {
  // If data is being fetched, a loading spinner is displayed
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // checks if there are no results in the data
  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }

  // checks if there was an error while fetching data
  if (error) return 'An error has occured.';

  // If data was successfully fetched and there are results, the MovieList component is rendered
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}
