import React from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

import useStyles from './styles';

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const classes = useStyles();

  // function to handle previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // function to handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Button size="small" startIcon={<ArrowBack />} className={classes.button} color="primary" variant="contained" onClick={handlePrev}>
          <Typography variant="button">Prev</Typography>
        </Button>
        <Typography variant="button" marginY="auto">
          {`Page ${currentPage} of ${totalPages}`}
        </Typography>
        <Button size="small" startIcon={<ArrowForward />} className={classes.button} color="primary" variant="contained" onClick={handleNext}>
          <Typography variant="button">Next</Typography>
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
