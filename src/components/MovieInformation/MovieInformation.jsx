import React from 'react';
import { Button, ButtonGroup, Modal, Typography, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMovieQuery } from '../../services/TMDB';

import { useStyles } from './styles';
import genreIcons from '../../assets/genres';

export function MovieInformation() {
  // get movie id from the URL
  const { id } = useParams();
  const classes = useStyles();

  // get movie details
  const { data: movie, isFetching, error } = useGetMovieQuery(id);

  const dispatch = useDispatch();

  // show loading spinner if fetching data
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  // show error if there is an error fetching data
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">
          <Button>
            Something went wrong, Go back <ArrowBack />
          </Button>
        </Link>
      </Box>
    );
  }

  // TODO add a button to go back to the home page
  return (
    <Grid container className={classes.containerSpaceAround}>
      {/* show image poster of the movie and show a placeholder if there is no poster */}
      <Grid item sm={12} lg={4} align="center">

        <img
          alt={movie.title}
          className={classes.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : 'https://via.placeholder.com/200x300/ccc.png'
}
        />
      </Grid>

      {/* show movie info */}
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {movie?.title}
          &nbsp;
          {/* using 'split' to split the release date and show the year(the first item of from the split array) */}
          {movie?.release_date && `(${movie?.release_date.split('-', 1)})`}
        </Typography>

        {/* show the tagline if it exists */}
        {movie?.tagline && (
          <Typography variant="h6" align="center" gutterBottom>
            {movie?.tagline}
          </Typography>
        )}
        <Grid item className={classes.containerSpaceAround}>
          {/* Show rating  */}
          <Box display="flex" align="center">
            {movie?.vote_average && (
              <>
                {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                <Rating name="read-only" value={movie?.vote_average / 2} readOnly />
                <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '5px' }}>
                  {movie?.vote_average.toFixed(1)} / 10
                </Typography>
              </>
            )}
          </Box>
          {/* Show runtime and language */}
          <Typography variant="h6" align="center" gutterBottom>
            {movie?.runtime}min {movie?.spoken_languages.length > 0 ? `/ (${movie?.spoken_languages[0].name})` : ''}
          </Typography>
        </Grid>

        {/* Show Genres of the movie */}
        <Grid item className={classes.genresContainer}>
          {
          movie?.genres?.map((genre) => {
            const { id: genreId, name } = genre;
            return (
              // TODO change url to the genre id or to show the genre name
              <Link className={classes.link} to="/" onClick={() => dispatch(selectGenreOrCategory(genreId))} key={genreId}>

                <img src={genreIcons[name.toLowerCase()]} alt="" className={classes.genreImage} height={30} />
                <Typography variant="subtitle1" color="textPrimary">{name}</Typography>
              </Link>
            );
          })
}
        </Grid>
      </Grid>
    </Grid>
  );
}
