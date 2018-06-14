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
    default:
      return state
  }
}

const store = createStore(
  combineReducers({ todos, visibilityFilter }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// We can remove the key property, since it's only needed when we enumerate an array
// (we'll use it later when we have to enumerate many todos).
const Todo = ({onClick, completed, text}) =>
    <li
      onClick={onClick}
      style={{ textDecoration: completed ? 'line-through' : '' }}
    >
      {text}
    </li>

const TodoList = ({todos, onTodoClick}) =>
  <ul>
    {todos.map(todo =>
      // The key if because react need it for update the ui
      <Todo key={todo.id} {...todo}
      onClick={() => onTodoClick(todo.id)}/>,
    )}
  </ul>

const AddTodo = ({onAddClick}) => {
  let input
  return (
    <div>
      <input type="text" ref={node => (input = node)} />
      <button
        onClick={() => {
          onAddClick(input.value)
          input.value = ''
        }}
      >
        Add
      </button>
    </div>
  )
}

const FilterLink = ({filter, currentFilter, children, onClick}) =>
  filter !== currentFilter ? (
    <a
      href="#"
      onClick={() => {
        onClick(filter)
      }}
    >
      {children}
    </a>
  ) : (
    <span>{children}</span>
  )

const Filters = ({visibilityFilter, onFilterLinkClick}) => (
  <p>
    Show:{' '}
    <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter} onClick={onFilterLinkClick}>
      ALL
    </FilterLink>{' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterLinkClick}
    >
      Completed
    </FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter} onClick={onFilterLinkClick}>
      Active
    </FilterLink>
  </p>
)

let nextTodoId = 0
const TodoApp = ({todos, visibilityFilter}) => {
  return (
      <div>
        <AddTodo
          onAddClick={text => {
            store.dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text: text,
            })
          }}
        />
        <Filters
          visibilityFilter={visibilityFilter}
          onFilterLinkClick={filter => {
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter,
            })
          }}
        />
        <TodoList
          todos={getVisibleTodos(todos, visibilityFilter)}
          onTodoClick={id => {
            store.dispatch({
              type: 'TOGGLE_TODO',
              id,
            })
          }}
        />
      </div>
    )
}

const render = () => ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'))
store.subscribe(render)
render()

registerServiceWorker();
