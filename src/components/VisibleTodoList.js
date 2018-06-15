import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'

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

export default VisibleTodoList
