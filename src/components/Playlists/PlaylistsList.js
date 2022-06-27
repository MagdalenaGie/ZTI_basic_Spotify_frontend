import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Spinner from './../UI/Loader/Loader';
import axiosDB from './../../axiosDB';
import Playlist from './Playlist';

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

const PlaylistsList = (props) => {
  const classes = useStyles();
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(false)
  const [albums, setAlbums] = useState([])
  const [expanded, setExpanded] = React.useState(false);

  const getPlaylistContent = (playlistId) => {
    setIsLoadingAlbums(true)
    let route = '/album/playlist/' + playlistId;
    axiosDB.get(route)
    .then(res => {
        setIsLoadingAlbums(false)
        setAlbums(res.data)
        console.log(res.data)
    })
    .catch(err => {
      setIsLoadingAlbums(false)
        console.log(err.message);
    })
  }

  const handleChange = (playlistId) => (event, isExpanded) => {
    setAlbums([])
    let isClosing = (expanded === playlistId);
    if(!isClosing){
      getPlaylistContent(playlistId)
    }
    setExpanded(isExpanded ? playlistId : false);
  };

  let resultsToShow = []
  if(props.playlistsArr){
      resultsToShow = props.playlistsArr.map(p => {
      return <Playlist key ={p.id} playlist={p} expanded={expanded} handleChange={handleChange}  getPlaylistContent={getPlaylistContent} getUserPlaylists={props.getUserPlaylists} albums={albums} isLoadingAlbums={isLoadingAlbums}/>
    })
  }

  let waitingScreen = (
    <Fragment>
      <Typography className={classes.waitingPanel}>Collecting your data...</Typography>
      <Spinner white={true}/>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      {props.isLoadingPlaylists ? waitingScreen : resultsToShow}
    </div>
  );
}

export default PlaylistsList;