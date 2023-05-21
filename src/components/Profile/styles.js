// import mui styles
import { makeStyles } from '@mui/styles';

// enable typescript autocomplete for mui styles
export const useStyles = makeStyles((theme) => ({
  profileData: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textTransform: 'capitalize',
  },
}));
