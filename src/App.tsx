import { createContext, Dispatch, SetStateAction, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { type Todo } from '../lib/types';

type TodosContextProps = {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  todos: Todo[];
};

// Initialize the context with undefined and provide a default type.
// as all the components recive the value cuz are iniside the Provider tag
export const TodosContext = createContext<TodosContextProps | undefined>(undefined);

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const contextValue = { todos, setTodos };

  return (
    <TodosContext.Provider value={contextValue}>
      <TodoForm />
      {todos.length === 0 && "no todos"}
      <ol>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ol>
    </TodosContext.Provider>
  );
}

export default App;
