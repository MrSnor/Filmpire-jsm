
import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
    backgroundColor: 'green',
  },
  content: {
    flexGrow: 1,
    padding: '2em',
    border: 'solid coral 2px',
  },
}));
