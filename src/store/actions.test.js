import moxios from 'moxios';
import axios from './../axios';
import * as actions from './actions';
import resp from './resp.json';
import songResp from './songresp.json';

test('getAlbumsResults', () => {
    expect(actions.getAlbumsResults(resp.results)).toMatchSnapshot();
})

test('getSongsFromAlbum', () => {
    expect(actions.getSongsFromAlbum([{type: 'album - to be shifted'}, {type: 'song - will be saved'}])).toMatchSnapshot();
})

test('resetSongs', () => {
    expect(actions.resetSongs()).toMatchSnapshot();
})

test('reportSongsFetchError', () => {
    expect(actions.reportSongsFetchError('error message')).toMatchSnapshot();
})

test('reportAlbumsFetchError', () => {
    expect(actions.reportAlbumsFetchError('error message')).toMatchSnapshot();
})

test('fetchAlbums', done => {
    moxios.install(axios);
    const dispatchMock = jest.fn();
    moxios.withMock(() => {
        actions.fetchAlbums("collectionName", "black")(dispatchMock);
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: resp
            })
            .then(() => {
                expect(request.url).toEqual('search?term=black&entity=album');
                expect(dispatchMock).toBeCalledWith(actions.getAlbumsResults(resp.results));
                done();
            })
        })
    })
})

test('fetchSongsFromAlbum', done => {
    moxios.install(axios);
    const dispatchMock = jest.fn();
    moxios.withMock(() => {
        actions.fetchSongsFromAlbum("1545341237")(dispatchMock);
        moxios.wait(() => {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: songResp
            })
            .then(() => {
                expect(request.url).toEqual('lookup?id=1545341237&entity=song');
                expect(dispatchMock).toBeCalledWith(actions.getSongsFromAlbum(songResp.results));
                done();
            })
        })
    })
})


