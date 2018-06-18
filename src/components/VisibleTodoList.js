import {toggleTodo} from '../actions'
import TodoList from './TodoList'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getVisibleTodos} from '../reducers'
import {fetchTodos} from '../api'
import React from 'react'

const mapStateToProps = (state, {match}) => ({
  todos: getVisibleTodos(state, match.params.filter || 'all'),
  filter: match.params.filter
})

class VisibleTodoList extends React.Component {
  componentDidMount() {
    fetchTodos().then(response => console.log(response))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.filter !== this.props.filter)
      fetchTodos(this.props.filter).then(response => console.log(response))
  }

  render() {
    return <TodoList {...this.props}/>
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
    {onTodoClick: toggleTodo},
  )(VisibleTodoList),
)

export default VisibleTodoList
