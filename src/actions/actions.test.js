import { addTodoSaga } from '.';
import { call, put } from 'redux-saga/effects';
import * as api from '../api';
import v4 from 'node-uuid';
import * as TYPES from './types';
import {normalize} from 'normalizr';
import * as schema from './schema';

describe('addTodoSaga', () => {
  const action = {
    type: TYPES.ADD_TODO_REQUEST,
    text: 'Todo',
  };
  const addTodoSagaGen = addTodoSaga(action);

  test('should addTodo', () => {
    // In the first next we obtain the object effect for call
    // from the first yield, and pause the generator
    expect(addTodoSagaGen.next().value)
      .toEqual(call(api.addTodo, 'Todo'));
  });

  test('should dispatch succes action', () => {
    const response = {
      id: v4(),
      text: 'Todo',
      completed: false,
    };

    // in the second next we pass the response to const response, and receive
    // the put effect object and pause
    expect(addTodoSagaGen.next(response).value)
      .toEqual(put({
        type: TYPES.ADD_TODO_SUCCESS,
        response: normalize(response, schema.todo)}));
  });
});
