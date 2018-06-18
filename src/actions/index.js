import v4 from 'node-uuid'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text: text,
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
})

export const receiveTodos = (response, filter) => ({
  type: 'RECEIVE_TODOS',
  response,
  filter
})
