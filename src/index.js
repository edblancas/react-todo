import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {createStore} from 'redux'
import todoApp from './reducers'
import {Provider} from 'react-redux'
import App from './components/App'
import {loadState, saveState} from './localStore'
import throttle from 'lodash/throttle'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(todoApp, loadState(), reduxDevTools)

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    })
  }, 1000),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
