export type Todo = {
  title: string;
  completed: boolean;
  id: string;
}

export type TodoService = {
  getAllTodos: () => Promise<Todo[]>;
  addTodo: (todo: Todo) => Promise<Todo>;
  updateTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
};
