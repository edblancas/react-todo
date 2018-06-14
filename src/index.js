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

const Filters = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">ALL</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
  </p>
)

// There is a small problem with this implementation of FilterLink. Inside the render() method it
// reads the current state of the Redux store, however it does not subscribe to the store.
// So if the parent component doesn't update when the store is updated, the correct value won't be rendered.
//
// But we currently re-render the entire application when the state changes, which isn't very
// efficient. In the future, we will move subscription to the store to the lifecycle methods of
// the container components.
class FilterLink extends React.Component {
  render() {
    const {visibilityFilter} = store.getState()
    const {filter, children} = this.props
    return (
      <Link
        onLinkClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter,
          })
        }}
        active={filter === visibilityFilter}
      >
        {children}
      </Link>
    )
  }
}

const Link = ({active, onLinkClick, children}) =>
  !active ? (
    <a href="#" onClick={onLinkClick}>
      {children}
    </a>
  ) : (
    <span>{children}</span>
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
