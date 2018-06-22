const byId = (state = {}, action) => {
  // si se trata de una accion desconocida no trae response
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    }
  }

  return state
}

export default byId

// always the state corresponds to the state of the reducer we are in,
// in this case is the lookup table
export const getTodo = (state, id) => state[id]
