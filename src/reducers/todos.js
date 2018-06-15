const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
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

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state
    case 'active':
      return state.filter(t => !t.completed)
    case 'completed':
      return state.filter(t => t.completed)
    default:
      throw new Error(`Unknown filter: ${filter}.`)
  }
}

export default todos
