import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

/**
 * A React component that renders a search field using Material-UI components and styles.
 */
export function Search() {
  // Declare a state variable 'query' and a function 'setQuery' to update it
  const [query, setQuery] = useState('');
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  /**
   * A function that handles key presses in the search field.
   * If the key pressed is 'Enter', dispatch a searchMovie action with the current query.
   * @param {object} event - The key press event.
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

  // Get the classes object from the useStyles function
  const classes = useStyles();

  // hide the search field if it is not the home page
  const location = useLocation();
  if (location.pathname !== '/') {
    return null;
  }

  // Render the search field with Material-UI components and styles
  return (
    <div className={classes.searchContainer}>
      <TextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
