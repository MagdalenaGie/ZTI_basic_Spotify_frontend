import * as actionTypes from './actionTypes';
import axios from '../axios';

const filterAlbumsBy = (filterType, filterValue, albums) => {
    const regex = new RegExp(filterValue, "i");
    let albumsToDisplay = albums.filter( el => el[filterType].match(regex));

    return albumsToDisplay;
}

export const fetchAlbums = (filterType, searchValue) => {
    return dispatch => {
        let route = 'search?term=' + searchValue + '&entity=album';
        axios.get(route)
        .then(res => {
            let albumsToDisplay;
            if(filterType !== "any"){
                albumsToDisplay = filterAlbumsBy(filterType, searchValue, res.data.results);
            }else{
                albumsToDisplay = res.data.results;
            }

            if(albumsToDisplay.length === 0){
                let message = `No albums connected to the term ${searchValue} were found. Please try again with different parameter.`
                dispatch(reportAlbumsFetchError(message));
            }else{
                dispatch(getAlbumsResults(albumsToDisplay));
            }
        })
        .catch(err => {
            console.log(err.message);
            let message = `A probblem has occured while connecting to the database, please try again later`;
            dispatch(reportAlbumsFetchError(message));
        })
    }
}

export const reportAlbumsFetchError = (err) => {
    return{
        type: actionTypes.ALBUMS_ERR,
        err: err
    }
}

export const getAlbumsResults = (results) => {
    return{
        type: actionTypes.SEARCH_FOR_ALBUMS,
        results: results
    }
}

export const fetchSongsFromAlbum = (albumId) => {
    return dispatch => {
        let route = 'lookup?id=' + albumId + '&entity=song';
        axios.get(route)
        .then(res => {
            dispatch(getSongsFromAlbum(res.data.results));
        })
        .catch(err => {
            console.log(err.message);
            let message = `A probblem has occured while connecting to the database, please try again later`;
            dispatch(reportSongsFetchError(message))
        })
    }
}

export const reportSongsFetchError = (err) => {
    return{
        type: actionTypes.SONG_ERR,
        err: err
    }
}

export const getSongsFromAlbum = (songs) => {
    songs.shift();
    return{
        type: actionTypes.GET_SONGS_FROM_ALBUM,
        songs: songs
    }
}

export const resetSongs = () => {
    return{
        type: actionTypes.RESET_SONGS
    }
}