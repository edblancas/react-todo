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


const Filters = ({store}) => (
  <p>
    Show: <FilterLink filter="SHOW_ALL" store={store}>ALL</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" store={store}>Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" store={store}>Active</FilterLink>
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
  componentDidMount() {
    const {store} = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  // Since the subscription happens in `componentDidMount`,
  // it's important to unsubscribe in `componentWillUnmount`.
  componentWillUnmount() {
    this.unsubscribe(); // return value of `store.subscribe()`
  }

  render() {
    const {store} = this.context
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
FilterLink.contextTypes = {
  store: PropTypes.object
}

const Link = ({active, onLinkClick, children}) =>
  !active ? (
    <a href="#" onClick={onLinkClick}>
      {children}
    </a>
  ) : (
    <span>{children}</span>
  )

const TodoApp = ({store}) => (
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
