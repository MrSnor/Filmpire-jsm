import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Modal, Typography, Grid, Box, CircularProgress, useMediaQuery, Rating, Alert } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Bookmark, BookmarkOutlined, BookmarkRemove, BookmarkAdd } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMovieQuery, useGetListQuery, useGetRecommendedMoviesQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';

import MovieList from '../MovieList/MovieList';

import { useStyles } from './styles';
import genreIcons from '../../assets/genres';

export function MovieInformation() {
  // get user
  const userData = useSelector(userSelector);
  // get account id
  const accountId = userData.user.id;
  // get movie id from the URL
  const { id } = useParams();
  const classes = useStyles();
  // get movie details
  const { data: movie, isFetching, error } = useGetMovieQuery(id);

  const { data: favoriteMovies, isFetching: isFetchingFavorite } = useGetListQuery({
    listName: 'favorite/movies',
    accountId,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const { data: watchlistMovies, isFetching: isFetchingWatchlist } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  // get recommended movies
  const { data: recommendedMovies, isFetching: isFetchingRecommended } = useGetRecommendedMoviesQuery({
    movieId: id,
    list: 'recommendations',
  });

  const [isOpen, setisOpen] = useState(false);

  const dispatch = useDispatch();
  // const isMovieFavorited = true;
  // const isMovieWatchlisted = true;

  // states for favorites and watchlist
  const [isMovieFavorited, setIsFavorited] = useState(false);
  const [isMovieWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    setIsFavorited(!!favoriteMovies?.results?.find((currentMovie) => currentMovie?.id === movie?.id));
  }, [favoriteMovies, movie]);

  useEffect(() => {
    setIsWatchlisted(!!watchlistMovies?.results?.find((currentMovie) => currentMovie?.id === movie?.id));
  }, [watchlistMovies, movie]);

  // async function to add to favorites
  const addToFavorites = async () => {
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`;
    const dataToBeSent = {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    };

    await axios.post(url, dataToBeSent);

    setIsFavorited((prev) => !prev);
  };

  // async function to add to watchlist
  const addToWatchlist = async () => {
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`;
    const dataToBeSent = {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    };

    await axios.post(url, dataToBeSent);

    setIsWatchlisted((prev) => !prev);
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
            {movie?.runtime}min {movie?.spoken_languages.length > 0 ? `| Language: ${movie?.spoken_languages[0].name}` : ''}
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
                <Button onClick={() => setisOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup variant="outlined" size="small">
                {/* Add to favourite button */}
                {/* TODO check logic of favourite buton (maybe watchlist too) */}
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                {/* Add to watchlist button  */}
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <BookmarkRemove /> : <BookmarkAdd />}>
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
      {/* Modal for movie trailer */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={isOpen}
        onClose={() => setisOpen(false)}
      >
        {/* Modal content */}
        {
          movie?.videos?.results?.length > 0
            ? (
              <iframe
                title="Trailer"
                src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}`}
                frameBorder="0"
                autoPlay
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className={classes.video}
              />
            ) : (
              // <Box border="2px solid red">
              //   <Typography color="white" fontSize="2rem">Sorry, nothing was found.</Typography>
              // </Box>
              <Alert severity="error" onClose={() => setisOpen(false)}>Sorry, no trailer was found.</Alert>
            )
        }
      </Modal>
    </Grid>
  );
}
