
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
    marginBottom: '20px',

    // breakpoint for tablet
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '100%',
      // height: '600px',
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
    flexWrap: 'wrap',
  },

  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },

  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    padding: '5px',
    borderRadius: '10px',
    transition: 'all 0.4s ease-in-out',
    // '&:hover': {
    //   background: theme.palette.mode === 'dark' ? 'red' : theme.palette.primary.main,
    //   color: theme.palette.mode === 'dark' ? 'black' : 'white',
    // },
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
    // nested class in JSS
    // '&:hover $genreImage': {
    //   filter: theme.palette.mode === 'dark' ? 'invert(0' : 'invert(1)',
    // },
  },

  actorImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    objectFit: 'cover',
    borderRadius: '10%',
  },

  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  video: {
    height: '50%',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      height: '90%',
      width: '90%',
    },
  },
}));
