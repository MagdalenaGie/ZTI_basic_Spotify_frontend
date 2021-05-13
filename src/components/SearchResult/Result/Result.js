import React from 'react';
import { useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spinner from './../../UI/Loader/Loader';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  detailsContainer:{
    display: "flex",
    justifyContent: "center",
    width: "100%",
    fontSize: theme.typography.pxToRem(13),
  },
  details: {
    flex: "50%",
    width: "50%"
  },
}));

const Result = (props) => {
  const classes = useStyles();

  const songs = useSelector(state => state.songs);
  const err = useSelector(state => state.songErr);

  let songsToShow = songs.map(song =>(
      <li key={song.trackId}>{song.trackName}</li>
    )
  );

  let res = {...props.result};

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let relDate = new Date(res.releaseDate);
  let dateToDisplay = relDate.getDate() + ' ' + monthNames[relDate.getMonth()] + ' ' + relDate.getFullYear() +'r.';

  let songsToDisplay = songsToShow.length === 0 ? <Spinner/> : <ol>{songsToShow}</ol>;
  if(err){
    songsToDisplay = err;
  }

  return (
      <Accordion key={res.collectionId+res.releaseDate} expanded={props.expanded === res.collectionId} onChange={props.handleChange(res.collectionId)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={res.collectionId + "-content"}
          id={res.collectionId+"-header"}
        >
          <Typography className={classes.heading}>{res.artistName}</Typography>
          <Typography className={classes.secondaryHeading}>{res.collectionName}</Typography>
        </AccordionSummary>
        <hr/>
        <AccordionDetails >
          <div className={classes.detailsContainer}>
              <div className={classes.details}>
                  <p>Number of tracks: {res.trackCount}</p>
                  <p>Country of origin: {res.country}</p>
                  <p>Price: {res.collectionPrice} {res.currency}</p>
                  <p>Release date: {dateToDisplay}</p>
              </div>
              <div className={classes.details}>
                {songsToDisplay}
              </div>
          </div>
        </AccordionDetails>
      </Accordion>
  );
}

export default Result;