import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { localStorageTodoService } from './services/localStorageTodoService';
import { TodoServiceContext } from './context/TodoServiceContext';
import { apiTodoService } from './services/apiTodoService';

function App() {
  // In a functional approach, the service is just an object of functions.
  //const todoService = localStorageTodoService; // switch to apiTodoService as needed
  const todoService = apiTodoService; // switch to apiTodoService as needed

  return (
    <TodoServiceContext.Provider value={todoService}>
      <TodoForm />
      <TodoList />
    </TodoServiceContext.Provider>
  );
}

export default App;
