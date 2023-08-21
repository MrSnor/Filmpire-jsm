import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import userReducer from '../features/auth';

// FIXME : fix middleware issue(warning) and up versions of redux packages

/**
 * @description This function creates a new Redux store with the specified configuration options. It includes a reducer for the TMDB API.
 *
 * @returns A Redux store object.
 */
export default configureStore({
  // Define a reducer object with a key name that is dynamically computed using tmdbApi.reducerPath,
  // and the corresponding reducer function from the TMDB API slice of the store's state.
  // The computed property name allows us to use the unique reducerPath string value as the object key,
  // and ensures that our store can handle multiple API slices with their own reducer functions.
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
