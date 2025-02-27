import { useContext } from "react"
import { TodosContext } from "../App"
import { type Todo } from "../../lib/types"

export default function TodoItem({ id, completed, title }: Todo) {
  const todosContext = useContext(TodosContext)

  // check so TS dont throw an error that the todosContext could be undefined
  if (!todosContext) {
    throw new Error(
      'TodosContext is undefined. Make sure you are wrapping your component tree with TodosContext.Provider.'
    );
  }

  const handleCheckTodo = (id: string, completed: boolean) => {
    todosContext.setTodos((currTodos) => {
      return currTodos.map((todo) => {
        if (todo.id == id) {
          todo.completed = completed
          return todo
        }
        return todo
      })
    })
  }

  const handleDeleteTodo = (id: string) => {
    todosContext.setTodos((currTodos) => {
      return currTodos.filter((todo) => todo.id !== id)
    })
  }
  return (
    <li key={id}>
      <input type='checkbox' defaultChecked={completed} onChange={(e) => handleCheckTodo(id, e.target.checked)} />
      {title}
      <input type='button' value='Delete' onClick={() => handleDeleteTodo(id)} />
    </li>
  )
}
