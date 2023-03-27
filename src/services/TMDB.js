import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

// Set the current page to 1
const page = 1;

/**
 * @description This function initializes the TMDB API by creating a new instance of the `createApi` function with the specified configuration options.
 *
 * @returns An object with a set of functions to interact with the TMDB API.
 */
export const tmdbApi = createApi({
  // Set the reducer path for the API
  reducerPath: 'tmdbApi',
  // Set the base query to fetch data from the TMDB API
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  // Set the endpoints to interact with the TMDB API
  endpoints: (builder) => ({
    // Get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    // Get popular movies from the API by page
    getMovies: builder.query({
      // Set the query to fetch popular movies by page with the TMDB API
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

// Destructure the `useGetMoviesQuery` function from the `tmdbApi` object
export const {
  useGetGenresQuery,
  useGetMoviesQuery,
} = tmdbApi;

