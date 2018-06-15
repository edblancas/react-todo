import React from 'react';
import AddTodo from './AddTodo'
import Filters from './Filters'
import VisibleTodoList from './VisibleTodoList'

const App = ({match}) => (
  <div>
    <AddTodo />
    <Filters />
    <VisibleTodoList filter={match.params.filter || 'all'}/>
  </div>
)

export default App;
