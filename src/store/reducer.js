import * as actionTypes from './actionTypes';

const initialState = {
    results: [],
    songs: [],
    playlists: [],
    resErr: "",
    songErr:"",
    playErr: "",
    isLogged: false,
    loginProcessing: false,
    loginErr: false,
    userData: {}
}

const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject, 
        ...updatedProperties
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SEARCH_FOR_ALBUMS:
            return updateObject(state, {
                results: [...action.results],
                resErr: ''
            })
        case actionTypes.ALBUMS_ERR:
            return updateObject(state, {
                results: [],
                resErr: action.err
            })
        case actionTypes.GET_SONGS_FROM_ALBUM:
            return updateObject(state, {
                songs: [...action.songs],
                songErr: ''
            })
        case actionTypes.SONG_ERR:
            return updateObject(state, {
                songs: [],
                songErr: action.err
            })
        case actionTypes.RESET_SONGS:
            return updateObject(state, {
                songs: []
            })
        case actionTypes.LOGIN_USER_START:
            return updateObject(state, {
                loginProcessing: true
            })
        case actionTypes.LOGIN_USER_SUCCESS:
            return updateObject(state, {
                loginProcessing: false,
                isLogged: true,
                loginErr:false,
                userData : action.user
            })
        case actionTypes.LOGIN_USER_FAILED:
            return updateObject(state, {
                loginProcessing: false,
                isLogged: false,
                loginErr: true
            })
        case actionTypes.LOGOUT_USER:
            return updateObject(state, {
                isLogged: false,
                loginErr: false,
                userData: {}
            })

        default:
            return state;
    }
}

export default reducer;

