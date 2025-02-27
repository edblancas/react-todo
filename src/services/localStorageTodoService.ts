import { Todo, TodoService } from '../../lib/types';

export const localStorageTodoService: TodoService = {
  getAllTodos: async () => {
    const todos = localStorage.getItem('TODOS');
    return todos ? JSON.parse(todos) : [];
  },

  addTodo: async (todo: Todo) => {
    const todos = await localStorageTodoService.getAllTodos();
    const newTodos = [...todos, todo];
    localStorage.setItem('TODOS', JSON.stringify(newTodos));
    return todo;
  },

  updateTodo: async (updatedTodo: Todo) => {
    const todos = await localStorageTodoService.getAllTodos();
    const newTodos = todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
    localStorage.setItem('TODOS', JSON.stringify(newTodos));
    return updatedTodo;
  },

  deleteTodo: async (id: string) => {
    const todos = await localStorageTodoService.getAllTodos();
    const newTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('TODOS', JSON.stringify(newTodos));
  },
};
