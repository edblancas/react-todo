import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux'

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
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

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    default:
      return todos
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(state, action)]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    case 'SET_VISIBILITY_FILTER':
      return getVisibleTodos(state, action.filter)
    default:
      return state
  }
}

const store = createStore(
  combineReducers({ todos, visibilityFilter }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const FilterLink = ({filter, children}) => {
  return (
    <a href='#' onClick={() => {
      store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: filter
        })
    }}> {children} </a>
  )
}

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
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL'>ALL</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        </p>
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
