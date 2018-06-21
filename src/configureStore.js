import {createStore, applyMiddleware, compose} from 'redux'
import todoApp from './reducers'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

// Note: remove the brackets so it returns the pomise, if not it returns undefined
const thunk = store => next => action =>
  typeof action === 'function'?
    // it must be the store.dispatch, cause the next dispatch middleware
    // in chain
    action(store.dispatch, store.getState) :
    next(action)

export const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [sagaMiddleware, thunk]

  if (process.env.NODE_ENV !== 'production')
    middlewares.push(createLogger())
  // Note: you can supply options to `createLogger()`

  return createStore(todoApp, composeEnhancers(applyMiddleware(...middlewares)))
}

export default configureStore
