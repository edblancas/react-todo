import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(t => !t.completed)
    case 'completed':
      return todos.filter(t => t.completed)
  }
}

const mapStateToPropsVisibleTodoList = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter),
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

export default VisibleTodoList
