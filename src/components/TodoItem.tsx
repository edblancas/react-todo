import { useContext } from "react"
import { TodosContext } from "../App"
import { type Todo } from "../../lib/types"

export default function TodoItem({ todo }: { todo: Todo }) {
  const todosContext = useContext(TodosContext)

  if (!todosContext) {
    throw new Error(
      'TodosContext is undefined. Make sure you are wrapping your component tree with TodosContext.Provider.'
    );
  }

  const handleCheckTodo = (id: string, completed: boolean) => {
    todosContext.setTodos((currTodos) => {
      return currTodos.map((v) => {
        if (v.id == id) {
          v.completed = completed
          return v
        }
        return v
      })
    })
  }

  const handleDeleteTodo = (id: string) => {
    todosContext.setTodos((currTodos) => {
      return currTodos.filter((todo) => todo.id !== id)
    })
  }
  return (
    <li key={todo.id}>
      <input type='checkbox' defaultChecked={todo.completed} onChange={(e) => handleCheckTodo(todo.id, e.target.checked)} />
      {todo.title}
      <input type='button' value='Delete' onClick={() => handleDeleteTodo(todo.id)} />
    </li>
  )
}
