import React from 'react';

const Todo = ({ onClick, completed, text }) => (
  // jsx-a11y/no-noninteractive-element-interactions
  // jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line
  <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : '' }}>
    {text}
  </li>
);

export default Todo;
