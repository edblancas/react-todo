import * as api from '../api';
import {getIsFetching} from '../reducers';
import {normalize} from 'normalizr';
import * as schema from './schema';
import {call, put} from 'redux-saga/effects';
import * as TYPES from './types';

// Sagas
export const addTodo = text => ({
  type: TYPES.ADD_TODO_REQUEST,
  text,
});

export function* addTodoSaga(action) {
  try {
    const response = yield call(api.addTodo, action.text);

    yield put({
      type: TYPES.ADD_TODO_SUCCESS,
      response: normalize(response, schema.todo),
    });
  } catch (e) {
    console.log('Error in the saga');
  }
}

// Thunks

// Thunk with asynx, await
// When an async function returns, it returns as a resolved promise.
// When it trows an Error, it returns as a rejected promise.
// We put the async in the dispatch currying function cause it what uses the
// redux-thunk middleware, a function that returns a function (with the firm of
// the store.dispatch), and this former function return a promise that resolves
// to a dispatched action. Thats how it works the redux-thunk middleware
export const toggleTodo = id => async dispatch => {
  const response = await api.toggleTodo(id);
  return dispatch({
    type: TYPES.TOGGLE_TODO_SUCCESS,
    response: normalize(response, schema.todo),
  });
};

// Thunk without async, await
export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) return Promise.resolve();

  dispatch({
    type: TYPES.FETCH_TODOS_REQUEST,
    filter,
  });

  return api.fetchTodos(filter).then(
    response =>
      dispatch({
        type: TYPES.FETCH_TODOS_SUCCESS,
        response: normalize(response, schema.arrayOfTodos),
        filter,
      }),
    error =>
      dispatch({
        type: TYPES.FETCH_TODOS_FAILURE,
        filter,
        message: error.message || 'Something went wrong.',
      }),
  );
};
