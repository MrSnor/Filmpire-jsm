import React from 'react';
import { CssBaseline, Typography, Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';
import { Actors, MovieInformation, Profile, Movies, Navbar } from './index';

import useStyles from './styles';

function ErrorPage() {
  return (
    <Grid container alignItems="center" direction="column" gap={5} padding="6rem" border="5px red dotted">
      <Typography variant="h1" align="center" color="error" fontFamily="Montserrat">
        Error 404
      </Typography>
      <Button variant="contained" color="error" href="/" startIcon={<ArrowBack />} size="small">
        Go back to home page
      </Button>
    </Grid>
  );
}

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />

          {/* for all other routes, show a 404 page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
