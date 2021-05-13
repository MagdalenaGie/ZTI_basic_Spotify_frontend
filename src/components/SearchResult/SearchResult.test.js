import { render, screen, fireEvent } from "@testing-library/react";
import SearchResult from './SearchResult';
import {Provider} from 'react-redux';
import reducer from './../../store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const mockState = {
    results: [
      {
        wrapperType: 'collection',
        collectionType: 'Album',
        artistId: 990251418,
        collectionId: 1440654210,
        amgArtistId: 3084392,
        artistName: 'The Monks of Norcia',
        collectionName: 'BENEDICTA: Marian Chant from Norcia',
        collectionCensoredName: 'BENEDICTA: Marian Chant from Norcia',
        artistViewUrl: 'https://music.apple.com/us/artist/the-monks-of-norcia/990251418?uo=4',
        collectionViewUrl: 'https://music.apple.com/us/album/benedicta-marian-chant-from-norcia/1440654210?uo=4',
        artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/90/ea/cf/90eacf27-018f-8a95-8099-1b87a85367fc/source/60x60bb.jpg',
        artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music128/v4/90/ea/cf/90eacf27-018f-8a95-8099-1b87a85367fc/source/100x100bb.jpg',
        collectionPrice: 11.99,
        collectionExplicitness: 'notExplicit',
        trackCount: 34,
        copyright: '℗ 2015 De Montfort Music, De Montfort Music',
        country: 'USA',
        currency: 'USD',
        releaseDate: '2015-06-02T07:00:00Z',
        primaryGenreName: 'Classical'
      },
      {
        wrapperType: 'collection',
        collectionType: 'Album',
        artistId: 201246132,
        collectionId: 668699145,
        amgArtistId: 19398,
        artistName: 'The Monks',
        collectionName: 'Black Monk Time',
        collectionCensoredName: 'Black Monk Time',
        artistViewUrl: 'https://music.apple.com/us/artist/the-monks/201246132?uo=4',
        collectionViewUrl: 'https://music.apple.com/us/album/black-monk-time/668699145?uo=4',
        artworkUrl60: 'https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/9a/39/5e/9a395e3e-ef06-23c8-3e26-6aca7bf7562d/source/60x60bb.jpg',
        artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music6/v4/9a/39/5e/9a395e3e-ef06-23c8-3e26-6aca7bf7562d/source/100x100bb.jpg',
        collectionPrice: 9.99,
        collectionExplicitness: 'notExplicit',
        trackCount: 18,
        copyright: '℗ 2009 Light In The Attic Records',
        country: 'USA',
        currency: 'USD',
        releaseDate: '2009-04-14T07:00:00Z',
        primaryGenreName: 'Rock'
      }
    ],
    songs: [],
    resErr: '',
    songErr: ''
  }

const mockResultState = {
    results: [
      {
        wrapperType: 'collection',
        collectionType: 'Album',
        artistId: 183313439,
        collectionId: 1323176986,
        amgArtistId: 2342870,
        artistName: 'Ed Sheeran & Andrea Bocelli',
        collectionName: 'Perfect Symphony - Single',
        collectionCensoredName: 'Perfect Symphony - Single',
        artistViewUrl: 'https://music.apple.com/us/artist/ed-sheeran/183313439?uo=4',
        collectionViewUrl: 'https://music.apple.com/us/album/perfect-symphony-single/1323176986?uo=4',
        artworkUrl60: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5d/97/c8/5d97c8dd-a19c-672c-34cc-a5e12646d2e8/source/60x60bb.jpg',
        artworkUrl100: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5d/97/c8/5d97c8dd-a19c-672c-34cc-a5e12646d2e8/source/100x100bb.jpg',
        collectionPrice: 1.29,
        collectionExplicitness: 'notExplicit',
        trackCount: 1,
        copyright: '℗ 2017 Asylum Records UK, a division of Atlantic Records UK, a Warner Music Group company.',
        country: 'USA',
        currency: 'USD',
        releaseDate: '2017-12-15T08:00:00Z',
        primaryGenreName: 'Classical Crossover'
      }
    ],
    songs: [
      {
        wrapperType: 'track',
        kind: 'song',
        artistId: 183313439,
        collectionId: 1323176986,
        trackId: 1323177389,
        artistName: 'Ed Sheeran & Andrea Bocelli',
        collectionName: 'Perfect Symphony - Single',
        trackName: 'Perfect Symphony',
        collectionCensoredName: 'Perfect Symphony - Single',
        trackCensoredName: 'Perfect Symphony',
        artistViewUrl: 'https://music.apple.com/us/artist/ed-sheeran/183313439?uo=4',
        collectionViewUrl: 'https://music.apple.com/us/album/perfect-symphony/1323176986?i=1323177389&uo=4',
        trackViewUrl: 'https://music.apple.com/us/album/perfect-symphony/1323176986?i=1323177389&uo=4',
        previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/13/cf/87/13cf87ff-274b-b526-33df-0040172a0bc8/mzaf_2644453004385379544.plus.aac.p.m4a',
        artworkUrl30: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5d/97/c8/5d97c8dd-a19c-672c-34cc-a5e12646d2e8/source/30x30bb.jpg',
        artworkUrl60: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5d/97/c8/5d97c8dd-a19c-672c-34cc-a5e12646d2e8/source/60x60bb.jpg',
        artworkUrl100: 'https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/5d/97/c8/5d97c8dd-a19c-672c-34cc-a5e12646d2e8/source/100x100bb.jpg',
        collectionPrice: 1.29,
        trackPrice: 1.29,
        releaseDate: '2017-12-15T12:00:00Z',
        collectionExplicitness: 'notExplicit',
        trackExplicitness: 'notExplicit',
        discCount: 1,
        discNumber: 1,
        trackCount: 1,
        trackNumber: 1,
        trackTimeMillis: 265363,
        country: 'USA',
        currency: 'USD',
        primaryGenreName: 'Classical Crossover',
        isStreamable: true
      }
    ],
    resErr: '',
    songErr: ''
  }


describe("searching results panel at the beginning", () => {

    beforeEach(() => {
        const store = createStore(
            reducer,
            {
                results: [],
                songs: [],
                resErr: "",
                songErr:""
            }    
        );
        render(
        <Provider store={store}>
            <SearchResult/>
        </Provider>
        );
    })

    it("should have waiting screen at the beginning", () => {
        let waiting = screen.getByText(/waiting for/i);
        expect(waiting).toBeInTheDocument();
    })

    it("should have spinner at the beginning", () => {
        let spinner = screen.getByTestId("spinner");
        expect(spinner).toBeInTheDocument();
    }) 
})

describe("searching results panel with results", () => {

    beforeEach(() => {
        const store = createStore(
            reducer,
            mockState
        );
        render(
        <Provider store={store}>
            <SearchResult/>
        </Provider>
        );
    })

    it("should render two results from mocked state", () => {
        let monks = screen.getAllByText(/monks/i)
        for(let monk of monks){
            expect(monk).toBeInTheDocument();
        }
        expect(monks).toHaveLength(2);
    })

    it("should render two buttons for rendered results", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(2);
    })
})

describe("result component testing", () => {

    beforeEach(() => {
        const store = createStore(
            reducer,
            mockResultState,
            applyMiddleware(thunk)
        );
        render(
        <Provider store={store}>
            <SearchResult/>
        </Provider>
        );
    })

    it("should render one button for rendered result", () => {
        let buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(1);
    })

    it("should render details after click", () => {
        let button = screen.getByRole("button");
        fireEvent.click(button);
        let numberOfTracks = screen.getByText(/number of tracks/i);
        expect(numberOfTracks).toBeInTheDocument();
        let originCountry = screen.getByText(/origin/i);
        expect(originCountry).toBeInTheDocument();
        let price = screen.getByText(/price/i);
        expect(price).toBeInTheDocument();
        let releaseDate = screen.getByText(/release date/i);
        expect(releaseDate).toBeInTheDocument();
    })
})