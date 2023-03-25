import { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';

export function Movies() {
  const { data } = useGetMoviesQuery();
  console.log('🚀 ~ Movies ~ data:', data);

  return <h1>Movies</h1>;
}
