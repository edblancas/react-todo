import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { localStorageTodoService } from './services/localStorageTodoService';
import { TodoServiceContext } from './context/TodoServiceContext';
import { apiTodoService } from './services/apiTodoService';
import { type Todo } from '../lib/types';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

// Create a context for todos
// not inside the component, so we can export the custom hook below
const TodosContext = createContext<{
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}>(
  {
    todos: [],
    setTodos: () => { }
  }
);
// Custom hook for easier consumption
export const useTodos = () => useContext(TodosContext);

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  // In a functional approach, the service is just an object of functions.
  //const todoService = localStorageTodoService; // switch to apiTodoService as needed
  const todoService = apiTodoService; // switch to apiTodoService as needed

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

  }, []);

  return (
    <TodoServiceContext.Provider value={todoService}>
      <TodosContext.Provider value={{ todos, setTodos }}>
        {/* You can use two separate .rows, but it's not necessary for a simple vertical stacking layout */}
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <TodoForm />
            </div>
            <div className="col-md-12">
              <TodoList />
            </div>
          </div>
        </div>
      </TodosContext.Provider>
    </TodoServiceContext.Provider>
  );
}

export default App;
