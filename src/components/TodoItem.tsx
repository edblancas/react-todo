import { type Todo } from "../../lib/types";
import { useTodoService } from "../context/TodoServiceContext";

export default function TodoItem(
  { id, completed, title, setTodos }:
    { id: string, completed: boolean, title: string, setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }
) {
  const todoService = useTodoService();

  // Notice that the event handlers are declared as async functions so you can use await with the service calls:
  const handleCheckTodo = async (id: string, completed: boolean) => {
    // Create an updated todo object
    const updatedTodo = { id, completed, title };
    try {
      // Update the todo via the service
      await todoService.updateTodo(updatedTodo);
      setTodos((currTodos) => {
        return currTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed
            return todo
          }
          return todo
        })
      })
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      // Delete the todo via the service
      await todoService.deleteTodo(id);
      setTodos((currTodos) =>
        currTodos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <li key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => handleCheckTodo(id, e.target.checked)}
      />
      {title}
      <input
        type="button"
        value="Delete"
        onClick={() => handleDeleteTodo(id)}
      />
    </li>
  );
}
