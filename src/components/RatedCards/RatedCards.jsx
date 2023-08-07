import { Typography, Box } from '@mui/material';
// import { Movies } from '../Movies/Movies';
import { Movie } from '../Movie/Movie';
import { useStyles } from './styles';

function RatedCards({ title, data }) {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box className={classes.container} display="flex" flexWrap="wrap">
        {/* "i" is required for the custom grow animation */}
        {data?.results.map((movie, i) => (
          <Movie key={i} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
