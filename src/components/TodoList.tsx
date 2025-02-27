import TodoItem from "./TodoItem";
import { Todo } from "../../lib/types";

export default function TodoList(
  { todos, setTodos }: { todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }
) {
  return (
    <>
      {todos.length === 0 && "no todos"}
      <ol>
        {
          todos.map((todo) => (
            <TodoItem key={todo.id} setTodos={setTodos} {...todo} />
          ))
        }
      </ol >
    </>
  )
}
