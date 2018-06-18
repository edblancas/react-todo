import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import Root from './components/Root'
import {fetchTodos} from './api'

fetchTodos('all').then(resp => console.log(resp))

const store = configureStore()
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
)
registerServiceWorker()
