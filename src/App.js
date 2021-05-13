import { Fragment } from 'react';
import'./App.css';
import Grid from './components/Grid/Grid';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResult from './components/SearchResult/SearchResult';

function App() {
  return (
    <Fragment>
      <header className="AppMainHeader">
        <MusicNoteIcon className="Icon"/>
        <h1>MyTunes app</h1>
      </header>
      <main>
        <Grid left={<SearchPanel/>} right={<SearchResult/>} sl={5} sr={7} />
      </main>
    </Fragment>
  );
}

export default App;
