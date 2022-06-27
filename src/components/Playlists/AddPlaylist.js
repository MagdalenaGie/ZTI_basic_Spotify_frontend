import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosDB from './../../axiosDB';
import { TextField, Typography, Button, withStyles, makeStyles, FormControlLabel, Checkbox} from '@material-ui/core';
import { Alert } from 'react-bootstrap';

const purple = "#551281";

const useStyles = makeStyles((theme) => ({
    inputLine: {
        width: "100%",
        margin: "15px 0"
    },
    center: {
        display: "flex",
        justifyContent: "space-around"
    },
    title: {
        textAlign: 'center'
    }
}));

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


const AddPlaylist = (props) => {

    const classes = useStyles();
    const userData = useSelector(state => state.userData)
    const [playlistName, setPlaylistName] = useState("");
    const [addSuccess, setAddSuccess] = useState(false)
    const [addFail, setAddFail] = useState(false)

    const handleSearchValueChange = (event) => {
        setPlaylistName(event.target.value);
    }

    const handleCreatePlaylist = (event) => {
        let playlist = {
            name: playlistName,
            owner: userData.id
        }
        console.log(playlist)
        axiosDB.post('/playlist/', playlist)
        .then(res => {
            if(res.data["name"] === playlistName){
                setAddSuccess(true)
                props.getUserPlaylists()
            }else{
                setAddFail(true)
            }
            console.log(res)
        })
        .catch(err => {
            setAddFail(true)
            console.log(err.message);
        })
    }

    const succAdd = (
        <Alert variant="success" onClose={() => setAddSuccess(false)} dismissible>
            <Alert.Heading>Utworzono nową playlistę!</Alert.Heading>
            <p>
            Teraz możesz dodać do niej albumy
            </p>
      </Alert>
    )

    const failAdd = (
        <Alert variant="danger" onClose={() => setAddFail(false)} dismissible>
            <Alert.Heading>Nie udało się utworzyć nowej playlisty!</Alert.Heading>
            <p>
            Spróbuj ponownie później
            </p>
      </Alert>
    )


    return(
        <Fragment>
            { addSuccess ? succAdd : null}
            { failAdd ? addFail : null}
            <div className={classes.title}>
                <Typography variant="h5">Utwórz nową playlistę:</Typography>
            </div>
            
            <TextField
                className={classes.inputLine}
                id="outlined-name"
                placeholder='nazwa playlisty'
                onChange={handleSearchValueChange}
                value={playlistName}
                variant="outlined"
            />
            <div className={classes.center}>
                <PurpleButton variant="contained" color="primary" onClick={handleCreatePlaylist}>
                    Utwórz playlistę
                </PurpleButton>
            </div>


        </Fragment> 
    );
}

export default AddPlaylist;