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

const mapDispatchToPropsVisibleTodoList = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  },
})

const VisibleTodoList = withRouter(
  connect(
    mapStateToPropsVisibleTodoList,
    mapDispatchToPropsVisibleTodoList,
  )(TodoList),
)

export default VisibleTodoList
