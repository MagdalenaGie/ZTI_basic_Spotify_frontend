import { render, screen, fireEvent } from "@testing-library/react";
import SearchPanel from './SearchPanel';
import {Provider} from 'react-redux';
import reducer from './../../store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    reducer, 
    compose(applyMiddleware(thunk)));


describe("searching panel", () => {

    beforeEach(() => {
        render(
        <Provider store={store}>
            <SearchPanel/>
        </Provider>
        );
    })

    it("should have three checkbox", () => {
        let checks = screen.getAllByRole("checkbox");
        expect(checks).toHaveLength(3);
    })

    it("should have heading", () => {
        let heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    })

    it("should have button", () => {
        let heading = screen.getByRole("button");
        expect(heading).toBeInTheDocument();
    })

    describe("input test on searchPanel", () => {

        it("should have input", () => {
            let input = screen.getByRole("textbox");
            expect(input).toBeInTheDocument();
        })
    
        it("should fire input change event", () => {
            let input = screen.getByRole("textbox");
            fireEvent.change(input, { target: { value: 'album title' } })
            expect(input.value).toBe('album title');
        })
    })
})