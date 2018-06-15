import {loadState, saveState} from './localStore'
import throttle from 'lodash/throttle'
import {createStore} from 'redux'
import todoApp from './reducers'

const configureStore = () => {
  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(todoApp, loadState(), reduxDevTools)

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos,
      })
    }, 1000),
  )

  return store
}

export default configureStore
