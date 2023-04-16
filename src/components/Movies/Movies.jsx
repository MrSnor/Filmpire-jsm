import { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

export function Movies() {
  // Using useState hook to set the initial page value to 1
  const [page, setPage] = useState(1);
  // Using useSelector hook to get the current genreIdOrCategoryName from the state
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  // Using useGetMoviesQuery hook to get data, error and isFetching values
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

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
