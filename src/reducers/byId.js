const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextState = {...state}
      action.response.forEach(todo => {
        nextState[todo.id] = todo
      })
      return nextState
    default:
      return state
  }
}

export default byId

// always the state corresponds to the state of the reducer we are in,
// in this case is the lookup table
export const getTodo = (state, id) => state[id]
