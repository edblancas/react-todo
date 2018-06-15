import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
    default:
      return todos
  }
}

const mapStateToPropsVisibleTodoList = (state, {match}) => ({
  todos: getVisibleTodos(state.todos, match.params.filter),
})

// When the arguments for the callback prop match the arguments to the action
// creator exactly, there is a shorter way to specify mapDispatchToProps.
// Rather than pass a function, we can pass an object mapping of the names of
// the callback props that we want to inject and the action creator functions
// that create the corresponding actions.
const mapDispatchToPropsVisibleTodoList = ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = withRouter(
  connect(
    mapStateToPropsVisibleTodoList,
    mapDispatchToPropsVisibleTodoList,
  )(TodoList),
)

export default VisibleTodoList
