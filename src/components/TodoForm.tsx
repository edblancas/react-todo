import React, { useState } from 'react';
import { useTodoService } from "../context/TodoServiceContext";
import { Todo } from '../../lib/types';

export default function TodoForm({ setTodos }: { setTodos: React.Dispatch<React.SetStateAction<Todo[]>> }) {
  const todoService = useTodoService();
  const [newItem, setNewItem] = useState('');

  const handleAddTodo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Create the new todo object.
    const newTodo: Todo = { title: newItem, completed: false, id: crypto.randomUUID() };

    try {
      // Call the service to add the todo. This works with either localStorage or API based on your implementation.
      await todoService.addTodo(newTodo);
      setTodos((currTodos) => {
        return [...currTodos, newTodo]
      })
    } catch (error) {
      console.error('Failed to add todo:', error);
      // Optionally add UI error handling here.
    }

    // Clear the input field.
    setNewItem('');
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor="newItem">Add todo</label>
        <input
          className='form-control'
          type="text"
          id="newItem"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <button onClick={handleAddTodo} className='btn btn-primary'>Add</button>
    </form>
  );
}
