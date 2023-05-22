
// import mui styles
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },

  poster: {
    borderRadius: '20px',
    boxShadow: '0px 0px 15px -5px rgba(0, 0, 0, 0.75)',
    width: '80%',

    // breakpoint for tablet
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '100%',
      height: '600px',
    },

    // breakpoint for mobile
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '10px',
    },

  },

  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexwrap: 'wrap',
  },

  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },

  links: {
    diplay: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',

    },
  },
}));
