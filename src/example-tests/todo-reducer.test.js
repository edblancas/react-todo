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
