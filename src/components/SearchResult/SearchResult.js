import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as actions from './../../store/actions';
import Spinner from './../UI/Loader/Loader';
import Result from './Result/Result';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  waitingPanel: {
    color: 'white',
    textAlign: 'center',
    marginTop: '10px'
  }
}));

export default function SearchResult() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const dispatch = useDispatch();
  const results = useSelector(state => state.results);
  const err = useSelector(state => state.resErr);

  const handleChange = (panel) => (event, isExpanded) => {
    dispatch(actions.resetSongs());
    let isClosing = (expanded === panel);
    setExpanded(isExpanded ? panel : false);
    if(!isClosing){
      dispatch(actions.fetchSongsFromAlbum(panel));
    }
  };

  let resultsToShow = results.map(res => {
    return <Result key ={res.collectionId} result={res} expanded={expanded} handleChange={handleChange} />

  })

  if(err !== ''){
    resultsToShow = <Typography className={classes.waitingPanel}>{err}</Typography>
  }

  let waitingScreen = (
    <Fragment>
      <Typography className={classes.waitingPanel}>We're waiting for you to enter the parameters in the form, <br/>then the search results will be displayed here</Typography>
      <Spinner white={true}/>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      {resultsToShow.length === 0 ? waitingScreen : resultsToShow}
    </div>
  );
}