import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the authSlice
const initialState = {
  // Initialize the user object as an empty object
  user: {},
  // Initialize isAuthenticated as false
  isAuthenticated: false,
  // Initialize the sessionId as an empty string
  sessionId: '',
};

// Create the authSlice using createSlice from Redux Toolkit
const authSlice = createSlice({
  // Set the name of the slice
  name: 'user',
  // Set the initial state of the slice
  initialState,
  // Define the reducers for the slice
  reducers: {
    // Define the setUser reducer
    setUser: (state, action) => {
      // Update the user object with the payload from the action
      state.user = action.payload;
      // Set isAuthenticated to true
      state.isAuthenticated = true;
      // Get the session ID from local storage and update the state
      state.sessionId = localStorage.getItem('session_id');

      // Store the account ID in local storage
      localStorage.setItem('accountId', action.payload.id);
    },
  },
});

// Export the setUser action creator from the authSlice
export const { setUser } = authSlice.actions;

// Export the authSlice reducer as the default export
export default authSlice.reducer;

// Define and export a selector function for retrieving the user object from the state
export const userSelector = (state) => state.user;
