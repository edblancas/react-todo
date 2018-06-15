import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'

// Action Creators

let nextTodoId = 0
const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text: text,
})

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
})

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter,
})

// Reducers

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
      if (action.id === state.id) return {...state, completed: !state.completed}
      return state
    default:
      return state
  }
}

// Filter helper
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
  }
}

// Components

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
const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : ''}}>
    {text}
  </li>
)
const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo => (
      // The key if because react need it for update the ui
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)
const mapStateToPropsVisibleTodoList = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
})
const mapDispatchToPropsVisibleTodoList = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  },
})
const VisibleTodoList = connect(
  mapStateToPropsVisibleTodoList,
  mapDispatchToPropsVisibleTodoList,
)(TodoList)

let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input type="text" ref={node => (input = node)} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        Add
      </button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

const Filters = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">ALL</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
  </p>
)
const Link = ({active, onLinkClick, children}) =>
  !active ? (
    <a href="#" onClick={onLinkClick}>
      {children}
    </a>
  ) : (
    <span>{children}</span>
  )
const mapStateTpPropsFilterLink = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
})
const mapDispatchToPropsFilterLink = (dispatch, ownProps) => ({
    onLinkClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
})
const FilterLink = connect(
  mapStateTpPropsFilterLink,
  mapDispatchToPropsFilterLink,
)(Link)

const TodoApp = () => (
  <div>
    <AddTodo />
    <Filters />
    <VisibleTodoList />
  </div>
)

const todoApp = combineReducers({todos, visibilityFilter})
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <Provider store={createStore(todoApp, reduxDevTools)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
