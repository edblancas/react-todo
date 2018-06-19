import {createStore, applyMiddleware, compose} from 'redux'
import todoApp from './reducers'
import promise from 'redux-promise'
import {createLogger} from 'redux-logger'

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [promise]

  if (process.env.NODE_ENV !== 'production')
    middlewares.push(createLogger())
  // Note: you can supply options to `createLogger()`

  return createStore(todoApp, composeEnhancers(applyMiddleware(...middlewares)))
}

export default configureStore
