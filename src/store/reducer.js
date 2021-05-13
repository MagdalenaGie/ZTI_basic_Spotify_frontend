import * as actionTypes from './actionTypes';

const initialState = {
    results: [],
    songs: [],
    resErr: "",
    songErr:""
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

        default:
            return state;
    }
}

export default reducer;

