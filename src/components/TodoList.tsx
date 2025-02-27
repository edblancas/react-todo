import { useContext } from "react";
import { TodosContext } from "../App";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todosContext = useContext(TodosContext)

  // check so TS dont throw an error that the todosContext could be undefined
  if (!todosContext) {
    throw new Error(
      'TodosContext is undefined. Make sure you are wrapping your component tree with TodosContext.Provider.'
    );
  }

  return (
    <>
      {todosContext.todos.length === 0 && "no todos"}
      <ol>
        {
          todosContext.todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))
        }
      </ol >
    </>
  )
}
