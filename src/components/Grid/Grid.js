import React from 'react';
import {Grid, Paper, makeStyles}from '@material-ui/core';
import './Grid.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight:"85vh",
  },
  outterGrid: {
    padding: "0 10px",
    margin: "10px 0",
    width: "100%",
    maxHeight: "85vh",
  },
  paper: {
    padding: "15px",
    margin: "10px",
    maxHeight: "80vh",
    minHeight: "240px",
    overflowY: "auto",
  },
  rightGrid: {
    backgroundColor: "#551281"
  }
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={1} className={classes.outterGrid}>
            <Grid item xs={12} md={5}>
              <Paper className={classes.paper}>
                {props.left}
              </Paper>
            </Grid>
            <Grid item xs={12} md={7} >
              <Paper className={classes.paper+ ' ' + classes.rightGrid + ' HideScroll '}>
                {props.right}
              </Paper>
            </Grid>
      </Grid>
    </div>
  );
}