import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { localStorageTodoService } from './services/localStorageTodoService';
import { TodoServiceContext } from './context/TodoServiceContext';
import { apiTodoService } from './services/apiTodoService';
import { Todo } from '../lib/types';
import { useEffect, useState } from 'react';

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
      {/* You can use two separate .rows, but it's not necessary for a simple vertical stacking layout */}
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-3">
            <TodoForm setTodos={setTodos} />
          </div>
          <div className="col-md-12">
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </TodoServiceContext.Provider>
  );
}

export default App;
