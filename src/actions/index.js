import * as api from '../api'
import {getIsFetching} from '../reducers'
import {normalize} from 'normalizr'
import * as schema from './schema'
import { call, put } from 'redux-saga/effects'

// Sagas
export const addTodo = text => ({
  type: 'ADD_TODO_REQUEST',
  text
})

export function* addTodoSaga(action) {
  try {
    const response = yield call(api.addTodo, action.text)

    yield put({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)})
  } catch (e) {
    console.log('Error in the saga')
  }
}

// Thunks
export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then(response =>
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    }),
  )

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return Promise.resolve()

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  })

  return api.fetchTodos(filter).then(
    response =>
      dispatch({
          type: 'FETCH_TODOS_SUCCESS',
          response: normalize(response, schema.arrayOfTodos),
          filter,
        }),
    error =>
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.',
      }),
  )
}
