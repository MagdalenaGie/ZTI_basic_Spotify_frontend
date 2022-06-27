import * as actionTypes from './actionTypes';
import axios from '../axios';
import axiosDB from '../axiosDB';

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
                let message = `Nie znaleziono albumów powiązanych z "${searchValue}". Spróbuj ponownie z innym parametrem.`
                dispatch(reportAlbumsFetchError(message));
            }else{
                dispatch(getAlbumsResults(albumsToDisplay));
            }
        })
        .catch(err => {
            console.log(err.message);
            let message = `Wystąpił problem z połączeniem do API iTunes - spróbuj ponownie za moment`;
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
            let message = `Wystąpił problem z połączeniem do API iTunes - spróbuj ponownie za moment`;
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

export const fetchUserPlaylists = (userId) => {
    return dispatch => {
        let route = '/playlist/owner/' + userId;
        axiosDB.get(route)
        .then(res => {
            console.log(res)
            dispatch(getPlaylists(res.data));
        })
        .catch(err => {
            console.log(err.message);
            // let message = `A probblem has occured while connecting to the database, please try again later`;
            // dispatch(reportPlaylistsFetchError(message))
        })
    }
}

export const reportPlaylistsFetchError = (err) => {
    return{
        type: actionTypes.PLAYLISTS_ERR,
        err: err
    }
}

export const getPlaylists = (playlists) => {
    console.log(playlists)
    return{
        type: actionTypes.GET_USER_PLAYLISTS,
        playlists: playlists
    }
}

export const fetchUserLogin = (login, password) => {
    return dispatch => {
        let route = '/user/' + login + '/' + password;
        axiosDB.get(route)
        .then(res => {
            if(res.data !== ""){
                dispatch(getUserLogin(res.data));
            }else{
                dispatch({
                    type: actionTypes.LOGIN_USER_FAILED
                })
            }
            
        })
        .catch(err => {
            console.log(err.message);
        })
    }
}

export const logout_user = () => {
    return{
        type: actionTypes.LOGOUT_USER
    }
}

export const getUserLogin = (user) => {
    return{
        type: actionTypes.LOGIN_USER_SUCCESS,
        user: user
    }
}