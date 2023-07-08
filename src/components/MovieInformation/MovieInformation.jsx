import React from 'react';
import { Button, ButtonGroup, Modal, Typography, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Bookmark, BookmarkOutlined, BookmarkRemove, BookmarkAdd } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMovieQuery, useGetRecommendedMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

import { useStyles } from './styles';
import genreIcons from '../../assets/genres';

export function MovieInformation() {
  // get movie id from the URL
  const p = useParams();
  // console.log('🚀 ~ MovieInformation ~ p:', p);
  const { id } = useParams();
  const classes = useStyles();
  // get movie details
  const { data: movie, isFetching, error } = useGetMovieQuery(id);

  // get recommended movies
  const { data: recommendedMovies, isFetching: isFetchingRecommended } = useGetRecommendedMoviesQuery({
    movieId: id,
    list: 'recommendations',
  });
  // console.log('🚀 ~ MovieInformation ~ recommendedMovies:', recommendedMovies);

  const dispatch = useDispatch();
  const isMovieFavorited = true;
  const isMovieWatchlisted = true;

  const addToFavorites = () => {
  };

  const addToWatchlist = () => {

  };

  // show loading spinner if fetching data
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  // show error if there is an error fetching data
  if (error) {
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
                <Typography variant="subtitle1">{name}</Typography>
              </Link>
            );
          })
}
        </Grid>

        {/* Show description of the movie */}
        <Typography variant="h6" align="center" gutterBottom>
          Overview
        </Typography>
        <Typography variant="body1" align="left" style={{ marginBottom: '10px' }} gutterBottom>
          {movie?.overview}
        </Typography>

        {/* Show top cast of the movie */}
        <Typography variant="h6" align="center" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {/* use 'slice' function to show only the first 10 actors (Warning!! there's a slice down there AGAIN, and thats what producing 6 actors instead of 10 🤣) */}
          {/* uncomment the line below to hide the cast with no poster */}
          {movie && movie?.credits?.cast.slice(0, 10).map((actor, i) => /* actor.profile_path && */(
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.actorImage}
                alt={actor.name}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : 'https://via.placeholder.com/200x300/ccc.png'
                }
              />
              <Typography color="textPrimary">
                {actor.name}
              </Typography>
              <Typography color="textSecondary">
                {/* use 'split' function to split the character and show the first part */}
                {actor.character.split('/', 1)}
              </Typography>
            </Grid>
            // slicing AGAIN for fun😂 and to show only 6 cast members
          )).slice(0, 6)}
        </Grid>
        {/* Show other movie related links in button */}
        <Grid item container style={{ marginTop: '10px' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="small">
                {/* homepage button */}
                <Button target="_blank" rel="noopener noreferrer" href={movie?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                {/* imdb button */}
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${movie?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                {/* trailer button */}
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="small">
                {/* Add to favourite button */}
                {/* TODO check logic of favourite buton (maybe watchlist too) */}
                <Button href="#" onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                {/* Add to watchlist button  */}
                <Button href="#" onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <BookmarkRemove /> : <BookmarkAdd />}>
                  Watchlist
                </Button>
                {/* go home back burron */}
                <Button component={Link} to="/" endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main', textDecoration: 'none' }}>
                  <Typography color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* "You may like" section */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" textTransform="capitalize" gutterBottom>
          You may like
        </Typography>
        {/* loop through the recommended movies */}
        {
        recommendedMovies?.total_results > 0
          ? <MovieList movies={recommendedMovies} numberOfMovies={12} />
          : <Box textAlign="center">Sorry, nothing was found.</Box>
          }
      </Box>
    </Grid>
  );
}
