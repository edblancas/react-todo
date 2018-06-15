import React from 'react'

const Link = ({active, onLinkClick, children}) =>
  !active ? (
    <a href="#" onClick={onLinkClick}>
      {children}
    </a>
  ) : (
    <span>{children}</span>
  )

export default Link
