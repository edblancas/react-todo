import {createStore} from 'redux'
import todoApp from './reducers'

const configureStore = () => {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(todoApp, reduxDevTools)
  const middlewares = [promise]

  if (process.env.NODE_ENV !== 'production')
    middlewares.push(logger)

  applyMiddlewareToDispatch(store, middlewares)

  return store
}

export default configureStore

/*
Since store.dispatch was reassigned earlier (inside of configureStore),
it's not completely fair to refer to it as rawDispatch inside of
addPromiseSupportToDispatch.
We'll rename rawDispatch to next, because this is the next dispatch
function in the chain.
 */

/*
To make it a part of the middleware contract, we can make next an outside
argument, just like the store before it and the action after it.
 */

const logger = store => next => action => {
  if (!console.group) return next

  console.group(action.type)
  console.log('%c prev state', 'color: gray', store.getState())
  console.log('%c action', 'color: blue', action)
  const returnValue = next(action)
  console.log('%c next state', 'color: green', store.getState())
  console.groupEnd(action.type)

  return returnValue
}

const promise = store => next => action => {
  if (typeof action.then === 'function') return action.then(next)
  return next(action)
}

const applyMiddlewareToDispatch = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch)
  })
}
