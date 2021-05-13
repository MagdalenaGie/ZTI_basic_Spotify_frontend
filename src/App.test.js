import { render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';

const store = createStore(
  reducer, 
  compose(applyMiddleware(thunk)));

test('renders header', () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>
  );
  const appLogo = screen.getByText(/MyTunes/i);
  expect(appLogo).toBeInTheDocument();
});
