import React from 'react'
import FilterLink from './FilterLink'

const Filters = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">ALL</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
  </p>
)

export default Filters
