import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import { type Todo } from '../lib/types';
import TodoList from './components/TodoList';

type TodosContextProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
};

// Initialize the context with undefined and provide a default type.
// as all the components recive the value cuz are iniside the Provider tag
export const TodosContext = createContext<TodosContextProps | undefined>(undefined);

function App() {
  //  add a function to set the default value
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todos = localStorage.getItem('TODOS')
    if (!todos) {
      return []
    }
    return JSON.parse(todos)
  });
  const contextValue = { todos, setTodos };

  // will run the code when the component first render (mount)
  // and whenever todos chages
  useEffect(() => {
    localStorage.setItem('TODOS', JSON.stringify(todos))
  }, [todos])

  return (
    <TodosContext.Provider value={contextValue}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
}

export default App;
