import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetPersonQuery, useGetActorMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

import useStyles from './styles';

export function Actors() {
  const classes = useStyles();

  // a state for number of movies by the actor
  const [numberOfMovies, setNumberOfMovies] = useState(12);

  const { id: actorId } = useParams();

  const { data: actorData, isFetching: isFetchingActor, error: errorActor } = useGetPersonQuery(actorId);

  const { data: actorMovies, isFetching: isFetchingActorMovies, error: errorActorMovies } = useGetActorMoviesQuery(actorId);

  // a empty js object with a nested object named as results to store actors' movies
  const actorMoviesData = {
    results: [],
  };

  if (actorMovies) {
    actorMoviesData.results = actorMovies?.cast;
    // actorMoviesData.results = Array.from(actorMoviesData.results).reverse();
  }

  const navigate = useNavigate();
  if (errorActor) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button onClick={() => navigate(-1)}>
          Something went wrong, Go back <ArrowBack />
        </Button>
      </Box>
    );
  }

  if (isFetchingActor) {
  // If data is being fetched, a loading spinner is displayed
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  // style according to the tutorial
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          {/* place the actor image here */}
          <img
            className={classes.image}
            src={
              actorData?.profile_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${actorData?.profile_path}`
                : 'https://via.placeholder.com/200x300/ccc.png'
          }
            alt={actorData?.name}
          />
        </Grid>

        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          {/* place the actor name here */}
          <Typography variant="h2" gutterBottom>
            {actorData?.name}
          </Typography>

          {/* Birthdate of the actor */}
          <Typography variant="h5" gutterBottom>
            Born: {new Date(actorData?.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>

          {/* Biography of the actor */}
          <Typography variant="body1" paragraph align="justify">
            {actorData?.biography || 'No biography available.'}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${actorData?.imdb_id}`}>
              IMDB
            </Button>
            {/* Back button */}
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* List of movies by the actor */}
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies by {actorData?.name}
        </Typography>
        <MovieList movies={actorMoviesData} numberOfMovies={numberOfMovies} />
        {/* Button to show more movies on click */}
        <Button onClick={() => setNumberOfMovies((prevState) => prevState + 4)} variant="contained" sx={{ display: 'block', marginX: 'auto' }}>
          Show more
        </Button>
      </Box>
    </>
  );
}
