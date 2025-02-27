import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../../lib/types";
import { useTodoService } from "../context/TodoServiceContext";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoService = useTodoService();

  useEffect(() => {
    // todoService.getAllTodos().then(setTodos);
    // Define an async function inside the effect
    const fetchTodos = async () => {
      try {
        const todosData = await todoService.getAllTodos();
        setTodos(todosData);
      } catch (error) {
        // handle errors here if needed
        console.error('Failed to fetch todos:', error);
      }
    };

    // Call the async function
    fetchTodos();

  }, [todoService]);

  return (
    <>
      {todos.length === 0 && "no todos"}
      <ol>
        {
          todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))
        }
      </ol >
    </>
  )
}
