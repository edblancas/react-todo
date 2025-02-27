import axios from 'axios';
import { Todo, TodoService } from '../../lib/types';

const BASE_URL = 'http://localhost:8080/api';

// todo: refactor todos url to the base url
export const apiTodoService: TodoService = {
  getAllTodos: async () => {
    const { data } = await axios.get(`${BASE_URL}/todos`);
    return data;
  },

  addTodo: async (todo: Todo) => {
    const { data } = await axios.post(`${BASE_URL}/todos`, todo);
    return data;
  },

  updateTodo: async (todo: Todo) => {
    const { data } = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo);
    return data;
  },

  deleteTodo: async (id: string) => {
    await axios.delete(`${BASE_URL}/todos/${id}`);
  },
};

