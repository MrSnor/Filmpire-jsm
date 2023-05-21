import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';
import { useStyles } from './styles';

export function Profile() {
  //  get user data from redux
  const { user } = useSelector(userSelector);
  // get classes from styles
  const classes = useStyles();

  const { username, id } = user;
  return (
    <div>
      {/* Show user data */}
      <h1>Profile</h1>

      <div className={classes.profileData}>
        <h2>{`name: ${username}`}</h2>
        <h2>{`id: ${id}`}</h2>
      </div>
      <div />

    </div>
  );
}
