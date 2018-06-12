import deepFreeze from 'deep-freeze'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: action.completed,
      }
    case 'TOGGLE_TODO':
      if (action.id === state.id) return {...state, completed: !state.completed}
      return state
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(state, action)]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

test('test add todo action', () => {
  const stateBefore = []
  const action = {type: 'ADD_TODO', id: 0, text: 'Learning Redux!', completed: false}
  const stateAfter = [
    {
      id: 0,
      text: 'Learning Redux!',
      completed: false,
    },
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(todos(stateBefore, action)).toEqual(stateAfter)
})

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
  ]
  const action = {type: 'TOGGLE_TODO', id: 0}
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
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(todos(stateBefore, action)).toEqual(stateAfter)
})
