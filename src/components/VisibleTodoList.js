import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getVisibleTodos} from '../reducers'

const mapStateToPropsVisibleTodoList = (state, {match}) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all'),
})

// When the arguments for the callback prop match the arguments to the action
// creator exactly, there is a shorter way to specify mapDispatchToProps.
// Rather than pass a function, we can pass an object mapping of the names of
// the callback props that we want to inject and the action creator functions
// that create the corresponding actions.
const VisibleTodoList = withRouter(
  connect(
    mapStateToPropsVisibleTodoList,
    {onTodoClick: toggleTodo},
  )(TodoList),
)

export default VisibleTodoList
