import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux'

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.visibilityFilter
    default:
      return state
  }
}

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE_TODO':
      if (action.id === state.id) return { ...state, completed: !state.completed }
      return state
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(state, action)]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const store = createStore(combineReducers({ todos, visibilityFilter }))

let nextTodoId = 0
class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <input type="text" ref={node => this.input = node}/>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: this.input.value
          })
        }}>Add</button>
        <ul>
          {this.props.todos.map(todo =>
            // The key if because react need it for update the ui
            <li key={todo.id} onClick={() => {
              store.dispatch({
                type: 'TOGGLE_TODO',
                id: todo.id
              })
            }}
            style={{ textDecoration: todo.completed ? 'line-through' : '' }}>{todo.text}</li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('root'));
}
store.subscribe(render)
render()

registerServiceWorker();
