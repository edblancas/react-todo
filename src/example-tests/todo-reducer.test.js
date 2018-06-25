import deepFreeze from 'deep-freeze';
import { combineReducers } from 'redux';

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
  };
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.visibilityFilter;
    default:
      return state;
  }
};

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (action.id === state.id) return { ...state, completed: !state.completed };
      return state;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(state, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

test('test add todo action', () => {
  const stateBefore = [];
  const action = { type: 'ADD_TODO', id: 0, text: 'Learning Redux!' };
  const stateAfter = [
    {
      id: 0,
      text: 'Learning Redux!',
      completed: false,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
});

test('toggle todo action reducer', () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learning Redux!',
      completed: false,
    },
    {
      id: 1,
      text: 'Learning React!',
      completed: false,
    },
  ];
  const action = { type: 'TOGGLE_TODO', id: 0 };
  const stateAfter = [
    {
      id: 0,
      text: 'Learning Redux!',
      completed: true,
    },
    {
      id: 1,
      text: 'Learning React!',
      completed: false,
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
});

test('get initial state app', () => {
  expect(
    todoApp(undefined, { type: 'SET_VISIBILITY_FILTER', visibilityFilter: 'SHOW_ALL' }),
  ).toEqual({
    todos: [],
    visibilityFilter: 'SHOW_ALL',
  });
});

// By convention, the state keys should be named after the reducers that manage them.
// Because of this, we can use ES6 object literal shorthand notation to accomplish the same thing
// like this:
const todoAppCombineReducer = combineReducers({
  todos,
  visibilityFilter,
});

test('get initial state app, with combineReducers Redux', () => {
  expect(
    todoAppCombineReducer(undefined, {
      type: 'SET_VISIBILITY_FILTER',
      visibilityFilter: 'SHOW_ALL',
    }),
  ).toEqual({
    todos: [],
    visibilityFilter: 'SHOW_ALL',
  });
});

const combineReducerImp = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

const todoAppCombineReducerImp = combineReducerImp({ todos, visibilityFilter });

test('get initial state app with our implementation of combine reducers', () => {
  expect(
    todoAppCombineReducerImp(undefined, {
      type: 'SET_VISIBILITY_FILTER',
      visibilityFilter: 'SHOW_ALL',
    }),
  ).toEqual({
    todos: [],
    visibilityFilter: 'SHOW_ALL',
  });
});
