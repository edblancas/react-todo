import React from 'react'
import FilterLink from './FilterLink'

const Filters = () => (
  <p>
    Show: <FilterLink filter="all">ALL</FilterLink>{' '}
    <FilterLink filter="completed">Completed</FilterLink>{' '}
    <FilterLink filter="active">Active</FilterLink>
  </p>
)

export default Filters
