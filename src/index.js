import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore, { sagaMiddleware } from './configureStore';
import Root from './components/Root';
import mySaga from './sagas';

const store = configureStore();
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
