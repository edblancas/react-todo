import React, { useState } from 'react';
import { useTodoService } from "../context/TodoServiceContext";
import { Todo } from '../../lib/types';

export default function TodoForm() {
  const todoService = useTodoService();
  const [newItem, setNewItem] = useState('');

  const handleAddTodo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Create the new todo object.
    const newTodo: Todo = { title: newItem, completed: false, id: crypto.randomUUID() };

    try {
      // Call the service to add the todo. This works with either localStorage or API based on your implementation.
      await todoService.addTodo(newTodo);
    } catch (error) {
      console.error('Failed to add todo:', error);
      // Optionally add UI error handling here.
    }

    // Clear the input field.
    setNewItem('');
  };

  return (
    <form>
      <label htmlFor="newItem">Add todo</label>
      <br />
      <input
        type="text"
        id="newItem"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <br />
      <button onClick={handleAddTodo}>Add</button>
    </form>
  );
}
