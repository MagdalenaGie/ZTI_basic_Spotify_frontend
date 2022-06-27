import React from 'react';
import axiosDB from './../../axiosDB';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Table } from 'react-bootstrap';

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
    width: "100%",
    fontSize: theme.typography.pxToRem(14),
  }
}));

const Playlist = (props) => {
  const classes = useStyles();

  const handleDeleteAlbum = (albumId) => {
    axiosDB.delete('/album/' + albumId).then( res => {
      props.getPlaylistContent(props.playlist.id)
    })
  }

  const handleDeletePlaylist = () => {
    axiosDB.delete('/playlist/' + props.playlist.id).then( res => {
      props.getUserPlaylists()
    })
  }

  let albumsList = props.albums.map((album, index) =>{
    return (
      <tr key={album.id}>
        <td>{index}</td>
          <td>{album.author}</td>
          <td>{album.title}</td>
          <td><Button variant="outline-danger" size="sm" onClick={() => {handleDeleteAlbum(album.id)}}>Usuń z playlisty</Button></td>
        </tr>
    )
  });

  return (
      <Accordion key={props.playlist.id} expanded={props.expanded === props.playlist.id} onChange={props.handleChange(props.playlist.id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={props.playlist.id + "-content"}
          id={props.playlist.id + "-header"}
        >
          <Typography className={classes.heading}>{props.playlist.name}</Typography>
        </AccordionSummary>
        <hr/>
        <AccordionDetails >
          <div className={classes.detailsContainer}>
            {albumsList.length === 0 ? <div> Ta playlista nie zawiera jeszcze żadnych utworów. </div> : null}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nazwa albumu</th>
                  <th>Autor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {albumsList}
              </tbody>
            </Table>
            <Button variant="outline-danger" size="sm" onClick={() => {handleDeletePlaylist()}}>Usuń tą playlistę</Button>
          </div>
        </AccordionDetails>
      </Accordion>
  );
}

export default Playlist;