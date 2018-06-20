import v4 from 'node-uuid'
import * as api from '../api'

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text: text,
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
})

const receiveTodos = (response, filter) => ({
  type: 'RECEIVE_TODOS',
  response,
  filter
})

export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(todos => receiveTodos(todos, filter))

export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
})

