// Import the `makeStyles` function from the `@mui/styles` module
import { makeStyles } from '@mui/styles';

// Export the `makeStyles` custom hook
export default makeStyles((theme) => ({
  // Define styles for the search container
  searchContainer: {
    // Use responsive styles for small screens using the `theme.breakpoints` API
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
  // Define styles for the input field
  input: {
    // Use conditional styles based on the light/dark mode of the theme
    color: theme.palette.mode === 'light' && 'black',
    // Invert the color of the input field in light mode using the `filter` property
    filter: theme.palette.mode === 'light' && 'invert(1)',
    // Use responsive styles for small screens using the `theme.breakpoints` API
    [theme.breakpoints.down('sm')]: {
      marginTop: '-10px',
      marginBottom: '10px',
    },
  },
}));
