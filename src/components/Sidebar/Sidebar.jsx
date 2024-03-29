import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, ListItemButton, Box, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import useStyles from './styles';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

export function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  // Using useSelector hook to get the current genreIdOrCategoryName from the state
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  return (
    <div>
      {/* Link component with logo image */}
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      {/* List component with categories */}
      <List>
        <ListSubheader>
          Categories
        </ListSubheader>
        {categories.map(({ value, label }) => (
          <Link key={value} className={classes.links} to="/">
            {/* Adding an onClick event to the ListItem component that dispatches the selectGenreOrCategory action with the value as an argument */}
            <ListItemButton style={{ padding: '5px 15px' }} className={classes.sidebarItem} onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon style={{ minWidth: '25px', marginRight: '10px' }}>
                <img src={genreIcons[label.toLowerCase()]} alt="" className={classes.genreImage} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">{label}</Typography>
              </ListItemText>
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      {/* List component with genres */}
      <List>
        <ListSubheader>
          Genres
        </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              {/* Adding an onClick event to the ListItem component that dispatches the selectGenreOrCategory action with the id as an argument */}
              <ListItemButton style={{ padding: '5px 15px' }} onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon style={{ minWidth: '25px', marginRight: '10px' }}>
                  <img src={genreIcons[name.toLowerCase()]} alt="" className={classes.genreImage} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">{name}</Typography>
                </ListItemText>
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </div>
  );
}

