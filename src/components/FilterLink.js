import Link from './Link'
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../actions'

const mapStateTpPropsFilterLink = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToPropsFilterLink = (dispatch, ownProps) => ({
  onLinkClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  },
})

const FilterLink = connect(
  mapStateTpPropsFilterLink,
  mapDispatchToPropsFilterLink,
)(Link)

export default FilterLink
