import {NavLink} from 'react-router-dom'
import React from 'react'

const FilterLink = ({filter, children}) => (
  <NavLink
    exact
    to={'/' + (filter === 'all' ? '' : filter)}
    activeStyle={{textDecoration: 'none', color: 'black'}}
  >
    {children}
  </NavLink>
)

export default FilterLink
