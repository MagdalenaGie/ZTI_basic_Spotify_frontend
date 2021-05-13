import { render, screen } from "@testing-library/react";
import Grid from './Grid';
import {Provider} from 'react-redux';
import reducer from './../../store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    reducer, 
    compose(applyMiddleware(thunk)));


describe("grid", () => {

    beforeEach(() => {
        render(
        <Provider store={store}>
            <Grid left={<p>left col</p>} right={<p>right col</p>} sl={6} sr={6}/>
        </Provider>
        );
    })

    it("should have two cols", () => {
        let checks = screen.getAllByText(/col/i);
        expect(checks).toHaveLength(2);
    })
})