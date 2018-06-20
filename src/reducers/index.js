import {combineReducers} from 'redux'
import byId, * as fromById from './byId'
import createList, * as fromCreateList from './createList'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({byId, idsByFilter: listByFilter})

export default todos

// Selector

export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateList.getIds(state.idsByFilter[filter])
  // and always in another selector, we only pass the state that corresponds
  // to the selector we are calling
  return ids.map(id => fromById.getTodo(state.byId, id))
}

// note: faltaba
export const getIsFetching = (state, filter) =>
  fromCreateList.getIsFetching(state.idsByFilter[filter])

export const getErrorMessage = (state, filter) =>
  fromCreateList.getErrorMessage(state.idsByFilter[filter])
