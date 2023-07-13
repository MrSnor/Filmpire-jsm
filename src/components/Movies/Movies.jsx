import { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
// import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

/**
 * Renders a list of movies based on the user's search query and the selected genre or category.
 * It uses the `useState` hook to manage the current page number, and the `useSelector` hook
 * to retrieve the current genre or category and search query from the Redux store. It also uses
 * the `useGetMoviesQuery` hook to fetch movie data from a remote API.
 *
 * If the `isFetching` property of the `useGetMoviesQuery` hook is `true`, a loading spinner is
 * displayed until the data is fetched. If there are no movies that match the search query,
 * a message is displayed indicating this. If an error occurs while fetching data, an error
 * message is displayed.
 *
 * @example
 * // Example usage:
 * <Movies />
 *
 * @returns {JSX.Element} A `MovieList` component that renders a list of movies based on the fetched data.
 *
 * @throws {string} If an error occurs while fetching data, an error message is thrown.
 */
export function Movies() {
  // Using useState hook to set the initial page value to 1
  const [page, setPage] = useState(1);
  // Using useSelector hook to get the current genreIdOrCategoryName from the state
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  // Using useGetMoviesQuery hook to get data, error and isFetching values
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  // function to handle pagination (for Pagination of material UI component  )
  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };

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
      {/* TODO add pagination from material UI */}
      {/* functional pagination using mui pagination component */}
      {/* <Pagination
        count={data.total_pages}
        page={page}
        onChange={handlePageChange}
      /> */}

      <Pagination currentPage={page} totalPages={data.total_pages} setCurrentPage={setPage} />
    </div>
  );
}
