import { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, Form, Spinner} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axiosDB from './../../../axiosDB';

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

function AddToPlaylistModal(props) {

    const classes = useStyles();
    const [selectedPlaylist, setSelectedPlaylist] = useState(props.playlists.length > 0 ? props.playlists[0].id : -1)

    let options = [];
    props.playlists.forEach(el => options.push(<option key={el.id} value={el.id}>{el.name}</option>))

    const handleAddToPlaylist = (event) => {
      event.preventDefault()
      let route = '/album/';
      let body = {
        collectionId: props.album.collectionId,
        playlistId: Number(selectedPlaylist),
        title: props.album.collectionName,
        author: props.album.artistName
      }
      axiosDB.post(route, body)
      .then(res => {
        console.log(res, body)
          if(res.data.collectionId === props.album.collectionId){
            props.setAddSuccess(true)
          }else{
            props.setAddFail(true)
          }
      })
      .catch(err => {
          props.setAddFail(true)
          console.log(err.message);
      })
      props.onHide();
    }

    const handleSelectPlaylist = (event) => {
      setSelectedPlaylist(event.target.value)
    }

    let waitingScreen = (
      <Fragment>
        <Typography className={classes.waitingPanel}>Collecting your data...</Typography>
        <Spinner white={true}/>
      </Fragment>
    );

    let noPlaylistScreen = (
      <Fragment>
        <Typography className={classes.waitingPanel}>Musisz najpierw utworzyć jakąś playlistę - możesz to zrobić w zakładce "Playlisty"</Typography>
      </Fragment>
    );

    let formScreen = (
      <Fragment>
        <Modal.Body className="show-grid">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Wybierz playlistę, do której chcesz dodać album:</Form.Label>
            <Form.Select aria-label="Default select example" value={selectedPlaylist} onChange={handleSelectPlaylist}>
                {options}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={handleAddToPlaylist}>Zatwierdź</Button>
            <Button variant="danger" onClick={props.onHide}>Cofnij</Button>
        </Modal.Footer>
      </Fragment>
    )

    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Dodaj do playlisty
          </Modal.Title>
        </Modal.Header>
        {props.isLoading ? waitingScreen : (props.playlists.length > 0 ? formScreen : noPlaylistScreen)}
      </Modal>
    );
}

export default AddToPlaylistModal;