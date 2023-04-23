import axios from 'axios';

/**
 * This function creates an instance of the axios HTTP client with a pre-configured base URL and API key.
 * The base URL is set to the themoviedb.org API and the API key is retrieved from an environment variable.
 */
export const moviesApi = axios.create({
  // Set the base URL for all requests made with this instance
  baseURL: 'https://api.themoviedb.org/3/',

  // Set default parameters for all requests made with this instance
  params: {
    // Retrieve the API key from an environment variable
    api_key: import.meta.env.VITE_TMDB_KEY,
  },
});

/**
 * This function fetches a new token from the moviesApi and stores it in local storage.
 * If the token is successfully fetched, the user is redirected to the authentication page.
 */
export const fetchToken = async () => {
  try {
    // Fetch a new token from the moviesApi
    const { data } = await moviesApi.get('/authentication/token/new');

    // Destructure the token from the data object
    const { request_token: token } = data;

    // Check if the token was successfully fetched
    if (data.success) {
      // Store the token in local storage
      localStorage.setItem('request_token', token);

      // Redirect the user to the authentication page
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    // Check if the error is due to a network issue
    if (error.message === 'Network Error') {
      console.error('There was a problem connecting to the server');
    } else {
      console.error("Sorry your token couldn't be created");
    }
    console.log(error);
  }
};

/**
 * This function creates a new session ID using the token stored in local storage.
 * If a token is found and a session ID is successfully created, it is stored in local storage.
 * @returns {string} The created session ID or an empty string if no session ID was created.
 */
export const createSessionId = async () => {
  // Initialize the session ID as an empty string
  let sessionId = '';

  // Get the token from local storage
  const token = localStorage.getItem('request_token');

  // Check if a token was found
  if (token) {
    try {
      // Create a new session using the token
      const response = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });

      // Destructure the session ID from the response object
      ({ data: { session_id: sessionId } } = response);

      // Store the session ID in local storage
      localStorage.setItem('session_id', sessionId);
    } catch (error) {
      // Log any errors that occur
      console.log(error);
    }
  } else {
    // Log an error message if no token was found
    console.error('No token was found in local storage');
  }

  // Return the created session ID or an empty string if no session ID was created
  return sessionId;
};
