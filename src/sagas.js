import { takeLatest } from 'redux-saga/effects';
import { addTodoSaga } from './actions';

function* mySaga() {
  yield takeLatest('ADD_TODO_REQUEST', addTodoSaga);
}

export default mySaga;
