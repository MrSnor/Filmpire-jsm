import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

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

    // Get movies
    getMovies: builder.query({
      // Set the query to fetch popular movies by page with the TMDB API
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?api_key=${tmdbApiKey}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
        }
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&api_key=${tmdbApiKey}&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`;
        }

        // Get popular movies from the API by page
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // get user specific list
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    // get user specific movie list (for reccommendations)
    getRecommendedMovies: builder.query({
      query: ({ movieId, list }) => `movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),

    // TODO change getMovie to getMovieDetails
    // Get movie details
    getMovie: builder.query({
      // TODO use the images to display additional images
      query: (id) => `movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits,images`,
    }),

    // get actor details
    getPerson: builder.query({
      query: (actorId) => `person/${actorId}?api_key=${tmdbApiKey}`,
    }),

    // get movies acted by the actor
    getActorMovies: builder.query({
      query: (actorId) => `person/${actorId}/movie_credits?api_key=${tmdbApiKey}`,
    }),
  }),
});

// Destructure the `useGetMoviesQuery` function from the `tmdbApi` object
export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendedMoviesQuery,
  useGetPersonQuery,
  useGetActorMoviesQuery,
} = tmdbApi;

