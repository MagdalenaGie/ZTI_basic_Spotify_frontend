import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Spinner from './../../UI/Loader/Loader';
import { Button, withStyles } from '@material-ui/core';
import AddToPlaylistModal from './AddToPlaylistModal';

const purple = "#551281";

const   PurpleButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple),
    backgroundColor: purple,
    '&:hover': {
      backgroundColor: purple,
    },
    marginTop: "10px"
  },
}))(Button);

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

  const [modalShow, setModalShow] = useState(false);

  const classes = useStyles();

  const songs = useSelector(state => state.songs);
  const err = useSelector(state => state.songErr);

  let songsToShow = songs.map(song =>(
      <li key={song.trackId}>{song.trackName}</li>
    )
  );

  let res = {...props.result};

  const monthNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
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
                  <p>Ilość utworów: {res.trackCount}</p>
                  <p>Kraj pochodzenia: {res.country}</p>
                  <p>Cena: {res.collectionPrice} {res.currency}</p>
                  <p>Data publikacji: {dateToDisplay}</p>
                  <PurpleButton variant="contained" color="primary" onClick={() => setModalShow(true)}>
                    Dodaj do playlisty
                  </PurpleButton>
              </div>
              <div className={classes.details}>
                {songsToDisplay}
              </div>
          </div>
        </AccordionDetails>
        <AddToPlaylistModal show={modalShow} onHide={() => setModalShow(false)} album={res} playlists={props.playlists} setAddSuccess={props.setAddSuccess} setAddFail={props.setAddFail} isLoadingPlaylists={props.isLoadingPlaylists}/>
      </Accordion>
  );
}

export default Result;