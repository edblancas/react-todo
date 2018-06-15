import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'

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

const mapStateToPropsVisibleTodoList = (state) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
const mapDispatchToPropsVisibleTodoList = (dispatch) => ({
	onTodoClick: id => {
          dispatch({
            type: 'TOGGLE_TODO',
            id,
          })
        }
})
const VisibleTodoList = connect(mapStateToPropsVisibleTodoList, mapDispatchToPropsVisibleTodoList)(TodoList)

let nextTodoId = 0
let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input type="text" ref={node => (input = node)} />
      <button
        onClick={() => {
            dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text: input.value,
            })
            input.value = ''
          }}>
        Add
      </button>
    </div>
  )
}

// But it's wasteful.
// Why subscribe to the store if we aren't going to calculate props from the state?
// Because we don't need to subcribe to the store, we can call connect() without
// mapStateToProps as an argument, instead passing in null. What this does is tell
// connect that there is no need to subscribe to the store.
// It's a common pattern to inject just the dispatch function, so if connect() sees
// that the second argument is null (or any falsey value), you'll get dispatch
// injected as a prop.
AddTodo = connect()(AddTodo)

const Filters = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL" >ALL</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" >Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" >Active</FilterLink>
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

// It's common to use the container props when calculating the child props, so we
// pass them in as a second argument to mapStateToProps. In this case, we'll
// rename it to ownProps to make it more clear that we are talking about the
// container component's own props, and not the props that are passed to the
// child, which is the return value of mapStateToProps.
const mapStateTpPropsFilterLink = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToPropsFilterLink = (dispatch, ownProps) => {
  return {
        onLinkClick: () => {
          dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: ownProps.filter
          })
        }
  }
}
const FilterLink = connect(mapStateTpPropsFilterLink,
mapDispatchToPropsFilterLink)(Link)

const TodoApp = () => (
      <div>
        <AddTodo />
        <Filters />
        <VisibleTodoList />
      </div>
    )

const todoApp = combineReducers({ todos, visibilityFilter })
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
<Provider store={createStore(todoApp, reduxDevTools)}>
	<TodoApp />
</Provider>
, document.getElementById('root')
)

registerServiceWorker();
