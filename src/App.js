import { Fragment } from 'react';
import'./App.css';
import Grid from './components/Grid/Grid';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResult from './components/SearchResult/SearchResult';
import {Navbar, Nav} from 'react-bootstrap';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Logout } from './components/UI/Auth/Logout';
import LoginPage from './components/UI/Auth/LoginPage.js';
import { useSelector } from 'react-redux';
import PlaylistsPanel from './components/Playlists/PlaylistsPanel';

function App() {

  const isLogged = useSelector(state => state.isLogged);

  const isLoggedRoutes = (
    <Routes>
      <Route path="/login" element={<Navigate to="/search" replace />}/>
      <Route path="/logout" element={<Logout/>} />
      <Route path="/search" element={<Grid left={<SearchPanel/>} right={<SearchResult/>} sl={5} sr={7} />}/>
      <Route path="/playlists" element={<PlaylistsPanel/>}/>
      <Route element={<Grid left={<SearchPanel/>} right={<SearchResult/>} sl={5} sr={7} />}/>
    </Routes>
  )

  const isNotLoggedRoutes = (
    <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/logout" element={<Navigate to="/login" replace/>}/>
      </Routes>
  ) 

  const loggedLinks = (
      <Nav className="me-auto">
          <Nav.Link style={{color: "#ffffff"}} as={Link} to="/search">Szukaj</Nav.Link>
          <Nav.Link style={{color: "#ffffff"}} as={Link} to="/playlists">Playlisty</Nav.Link>
          <Nav.Link style={{color: "#ffffff"}} as={Link} to="/logout">Wyloguj</Nav.Link>
      </Nav>
  )

  const notLoggedLinks = (
      <Nav className="me-auto">
          <Nav.Link style={{color: "#ffffff"}} as={Link} to="/login">Zaloguj się</Nav.Link>
      </Nav>
  )

  return (
    <Fragment>
      <Navbar style={{backgroundColor: "#551281"}}>
        <Navbar.Brand style={{color: "#ffffff"}}><MusicNoteIcon className="Icon"/>MyTunes app</Navbar.Brand>
          {isLogged ? loggedLinks : notLoggedLinks}
      </Navbar>
      {isLogged ? isLoggedRoutes : isNotLoggedRoutes}
      <main>
      </main>
    </Fragment>
  );
}

export default App;
