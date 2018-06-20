// We can start by replacing named imports with a namespace import.
// This means that any function exported from the actions file will be in the
// object called actions, which we will pass as a second argument to connect.
import * as actions from '../actions'
// import {toggleTodo, receiveTodos} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getVisibleTodos, getIsFetching} from '../reducers'
import React from 'react'

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getIsFetching(state, filter)
  }
}

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.filter !== this.props.filter)
      this.fetchData()
  }

  fetchData() {
    // We use the ES6 destructuring syntax to get the filter from props.
    // It's important that I destructure the filter right away,
    // because by the time the callback fires, this.props.filter might have
    // changed because the user might have navigated away.
    const {filter, fetchTodos, requestTodos} = this.props
    requestTodos(filter)
    fetchTodos(filter)
  }

  render() {
    const {toggleTodo, isFetching, todos} = this.props
    if (isFetching && !todos.length)
      return <p>Loading...</p>
    return <TodoList todos={todos} onTodoClick={toggleTodo}/>
  }
}

// When the arguments for the callback prop match the arguments to the action
// creator exactly, there is a shorter way to specify mapDispatchToProps.
// Rather than pass a function, we can pass an object mapping of the names of
// the callback props that we want to inject and the action creator functions
// that create the corresponding actions.
VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    // {onTodoClick: toggleTodo, receiveTodos},
    actions
  )(VisibleTodoList),
)

export default VisibleTodoList
