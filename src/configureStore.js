import {createStore} from 'redux'
import todoApp from './reducers'

const configureStore = () => {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(todoApp, reduxDevTools)
  if (process.env.NODE_ENV !== 'production')
    store.dispatch = addLoggingToDispatch(store)

  return store
}

export default configureStore

const addLoggingToDispatch = (store) => {
  // If we dont obtain the raw dispatch, when we change the store.dispatch we
  // are going to have a recursive ref, cause the store.dispatch inside the
  // returning function is going to ref the dispatch changed ref
  const rawDispatch = store.dispatch
  return (action) => {
    if (!console.group) return rawDispatch

    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)

    return returnValue
  }
}
