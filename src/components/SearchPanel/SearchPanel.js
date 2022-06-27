import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './../../store/actions';
import { TextField, Typography, Button, withStyles, makeStyles, FormControlLabel, Checkbox} from '@material-ui/core';

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

const PurpleCheckbox = withStyles({
    root: {
      color: purple,
      '&$checked': {
        color: purple,
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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


const SearchPanel = (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [checks, setChecks] = useState({
        artist: true,
        album: false,
        any: false,
        label: "artist"
    });

    const [searchValue, setSearchValue] = useState("");

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    }
    
    const handleArtistCheck = (event) => {
        setChecks({
            artist: true,
            album: false,
            any: false,
            label: "wykonawcy"
        });
    };

    const handleAlbumCheck = (event) => {
        setChecks({
            artist: false,
            album: true,
            any: false,
            label: "nazwie albumu"
        });
    };

    const handleAnyCheck = (event) => {
        setChecks({
            artist: false,
            album: false,
            any: true,
            label: "jakimkolwiek parametrze"
        });
    };

    const handleSearch = (event) => {
        let filterType = checks.artist ? "artistName" : (checks.album ? "collectionName" : "any");
        dispatch(actions.fetchAlbums(filterType, searchValue));
    }

    return(
        <Fragment>
            <div className={classes.title}>
                <Typography variant="h5">Szukaj albumów muzycznych:</Typography>
                <Typography >Dopasuj po:</Typography>
            </div>
            <div className={classes.center}>
                <FormControlLabel
                    control={<PurpleCheckbox checked={checks.artist} onChange={handleArtistCheck} name="artist check" />}
                    label="Autor"
                />
                <FormControlLabel
                    control={<PurpleCheckbox checked={checks.album} onChange={handleAlbumCheck} name="album check" />}
                    label="Tytuł"
                />
                <FormControlLabel
                    control={<PurpleCheckbox checked={checks.any} onChange={handleAnyCheck} name="any check" />}
                    label="Jakiekolwiek dopasowanie"
                />
            </div>
            
            <TextField
                className={classes.inputLine}
                id="outlined-name"
                label={`Dopasuj po ${checks.label}`}
                value={searchValue}
                onChange={handleSearchValueChange}
                variant="outlined"
            />
            <div className={classes.center}>
                <PurpleButton variant="contained" color="primary" onClick={handleSearch}>
                    Szukaj
                </PurpleButton>
            </div>


        </Fragment> 
    );
}

export default SearchPanel;