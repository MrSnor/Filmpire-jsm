import { Grid } from '@mui/material';
import React from 'react';
import { Movie } from '../Movie/Movie';

import useStyles from './styles';

export default function MovieList({ movies }) {
  const classes = useStyles();

  return (
  // Grid container that holds a list of movies
    <Grid container className={classes.moviesContainer}>
      {/* The movies are mapped over and displayed using the Movie component */}
      {/* Optional chaining (the "?" operator) is used here to safely access the results property */}
      {/* If the movies object is undefined or null, the expression will short-circuit and return undefined */}
      {movies?.results.map((movie, i) => (
        // Each movie is given a unique key based on its index
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}
