import { Provider } from 'react-redux';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/:filter?" component={App} />
    </BrowserRouter>
  </Provider>
);

export default Root;
