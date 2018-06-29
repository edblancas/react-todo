import deepFreeze from 'deep-freeze';

const toggleTodoMutated = (todo) => {
  // eslint-disable-next-line no-param-reassign
  todo.completed = !todo.completed;
  return todo;
};

test('test mutated object', () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux!',
    completed: true,
  };

  const todoAfter = {
    id: 0,
    text: 'Learn Redux!',
    completed: false,
  };

  deepFreeze(todoBefore);

  expect(toggleTodoMutated(todoBefore)).toEqual(todoAfter);
});

const toggleTodo = todo => ({
  ...todo,
  completed: !todo.completed,
});

test('test new todo object return', () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux!',
    completed: true,
  };

  const todoAfter = {
    id: 0,
    text: 'Learn Redux!',
    completed: false,
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
});
