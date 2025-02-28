import TodoItem from "./TodoItem";
import { useTodos } from "../App";

export default function TodoList() {
  const { todos, setTodos } = useTodos()
  return (
    <>
      {todos.length === 0 && "no todos"}
      <ol className="list-group">
        {
          todos.map((todo) => (
            <TodoItem key={todo.id} setTodos={setTodos} {...todo} />
          ))
        }
      </ol >
    </>
  )
}
