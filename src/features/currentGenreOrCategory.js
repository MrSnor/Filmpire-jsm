import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice to manage the state for a genre or category
export const genreOrCategory = createSlice({
  // Set the name of the slice
  name: 'genreOrCategory',
  initialState: {
    // The selected genre ID or category name
    genreIdOrCategoryName: '',
    // The current page number
    page: 1,
    // The current search query
    searchQuery: '',
  },
  // Define the reducer functions for the slice
  reducers: {
    // Reducer to select a genre or category
    selectGenreOrCategory: (state, action) => {
      // Update the value of the genreIdOrCategoryName property in the state
      state.genreIdOrCategoryName = action.payload;
      // Reset the searchQuery property to an empty string
      state.searchQuery = '';
    },
    // Reducer to search for a movie
    searchMovie: (state, action) => {
      // Update the value of the searchQuery property in the state
      state.searchQuery = action.payload;
    },
  },
});

// Export the actions from the slice
export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

// Export the reducer from the slice
export default genreOrCategory.reducer;
