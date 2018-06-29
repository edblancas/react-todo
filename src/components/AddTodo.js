import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      {/* eslint-disable-next-line no-return-assign */}
      <input type="text" ref={node => (input = node)} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};

export default connect()(AddTodo);
