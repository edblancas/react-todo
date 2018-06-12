import deepFreeze from 'deep-freeze'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: action.completed,
        },
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
         return {
           ...todo,
           completed: !todo.completed
         }
        }

        return todo;
      })
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

  expect(
    todos(stateBefore, action),
  ).toEqual(stateAfter)
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

  expect(
    todos(stateBefore, action),
  ).toEqual(stateAfter)
})

