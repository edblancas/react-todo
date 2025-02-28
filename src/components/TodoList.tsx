import TodoItem from "./TodoItem";
import { useTodos } from "../App";

export default function TodoList() {
  const { todos, setTodos } = useTodos()
  // The <ol> element is a separate JSX element that is rendered regardless of the outcome of the short-circuited expression. This means that even if "no todos" is displayed when there are no todos, the <ol> element is still rendered – it just happens to be empty because todos.map(...) produces no items.
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
