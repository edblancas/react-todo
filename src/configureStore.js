import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import todoApp from './reducers';

export const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [sagaMiddleware, thunk];

  if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger());
  // Note: you can supply options to `createLogger()`

  return createStore(todoApp, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;
