import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as actions from './../../store/actions';
import Spinner from './../UI/Loader/Loader';
import Result from './Result/Result';
import axiosDB from './../../axiosDB';
import { Alert } from 'react-bootstrap';

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
  const [expanded, setExpanded] = useState(false);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)
  const [addFail, setAddFail] = useState(false)
  const [playlists, setPlaylists] = useState([])
  const userData = useSelector(state => state.userData)

  useEffect(() => {
    setIsLoadingPlaylists(true)
    getUserPlaylists()
  }, [])

  const getUserPlaylists = () => {
    let route = '/playlist/owner/' + userData.id;
    axiosDB.get(route)
    .then(res => {
        setIsLoadingPlaylists(false)
        setPlaylists(res.data)
        console.log(res.data)
    })
    .catch(err => {
        setIsLoadingPlaylists(false)
        console.log(err.message);
    })
  }

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
    return <Result 
              setAddSuccess={setAddSuccess} 
              setAddFail={setAddFail}
              key ={res.collectionId} 
              result={res} expanded={expanded} 
              handleChange={handleChange} 
              playlists={playlists} 
              isLoading={isLoadingPlaylists} 
            />
  })

  if(err !== ''){
    resultsToShow = <Typography className={classes.waitingPanel}>{err}</Typography>
  }

  const succAdd = (
    <Alert variant="success" onClose={() => setAddSuccess(false)} dismissible>
        <Alert.Heading>Sukces!</Alert.Heading>
        <p>Pomyślnie dodano album do playlisty!</p>
    </Alert>
  )

  const failAdd = (
      <Alert variant="danger" onClose={() => setAddFail(false)} dismissible>
          <Alert.Heading>Nie udało się dodać albumu do playlisty!</Alert.Heading>
          <p>
          Spróbuj ponownie później
          </p>
    </Alert>
  )



  let waitingScreen = (
    <Fragment>
      <Typography className={classes.waitingPanel}>Wypełnij formularz po lewej i wciśnij "szukaj", <br/>Rezultat twojego wyszukiwania wyświetlimy tutaj</Typography>
      <Spinner white={true}/>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      { addSuccess ? succAdd : null}
      { failAdd ? addFail : null}
      {resultsToShow.length === 0 ? waitingScreen : resultsToShow}
    </div>
  );
}