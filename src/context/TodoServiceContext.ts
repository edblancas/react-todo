import { createContext, useContext } from 'react';
import { TodoService } from '../../lib/types';

export const TodoServiceContext = createContext<TodoService | null>(null);

export const useTodoService = () => {
  const context = useContext(TodoServiceContext);
  if (!context) {
    throw new Error('useTodoService must be used within a TodoServiceProvider');
  }
  return context;
};

