import { useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { type Todo } from '../lib/types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  return (
    <>
      <TodoForm />
      {todos.length === 0 && "no todos"}
      <ol>
        {todos.map((todo) => {
          return (
            <TodoItem todo={todo} />
          )
        })}
      </ol>
    </>
  )
}

export default App
