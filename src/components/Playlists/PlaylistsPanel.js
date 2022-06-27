import AddPlaylist from "./AddPlaylist"
import PlaylistsList from "./PlaylistsList"
import Grid from './../Grid/Grid';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosDB from './../../axiosDB';

const PlaylistsPanel = (props) => {

    const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const userData = useSelector(state => state.userData)

    useEffect(() => {
        getUserPlaylists()
      }, [])

    const getUserPlaylists = () => {
        setIsLoadingPlaylists(true)
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


    return(
        <Grid 
        left={<AddPlaylist getUserPlaylists={getUserPlaylists}/>} 
        right={<PlaylistsList  test="ddd" playlistsArr={playlists} isLoadingPlaylists={isLoadingPlaylists} getUserPlaylists={getUserPlaylists}/>} 
        sl={5} sr={7} />
    )
}

export default PlaylistsPanel;