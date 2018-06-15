import React from 'react';
import AddTodo from './AddTodo'
import Filters from './Filters'
import VisibleTodoList from './VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <Filters />
    <VisibleTodoList />
  </div>
)

export default App;
