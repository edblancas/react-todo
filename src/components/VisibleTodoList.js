import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getVisibleTodos} from '../reducers'

const mapStateToPropsVisibleTodoList = (state, {match}) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all'),
})

const VisibleTodoList = withRouter(
  connect(
    mapStateToPropsVisibleTodoList,
    {onTodoClick: toggleTodo},
  )(TodoList),
)

export default VisibleTodoList
