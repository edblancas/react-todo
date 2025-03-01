import React, { useState } from 'react';
import { useTodoService } from "../context/TodoServiceContext";
import { Todo } from '../../lib/types';
import { useTodos } from '../App';

export default function TodoForm() {
  const todoService = useTodoService();
  const [newItem, setNewItem] = useState('');
  const { todos, setTodos } = useTodos()

  // Add todo with optimistic update
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem.trim()) return; // Prevent empty submissions

    const newTodo: Todo = {
      title: newItem,
      completed: false,
      id: crypto.randomUUID() // Client-generated ID for optimistic update
    };

    // 1. Optimistically update UI
    setTodos((currTodos) => {
      console.log('updated optimistic todos', [...currTodos, newTodo])
      return [...currTodos, newTodo]
    });
    try {
      // 2. Actually add to backend
      // simulate backend error to rollback
      throw Error('simulate error in the backend')
      await todoService.addTodo(newTodo);
    } catch (error) {
      // 3. Rollback on error
      // easy rollback, as todos is the value of the last render
      console.error('Failed to add todo', newTodo);
      console.log('prev todos', todos)
      // setTodos(todos)
    }

    setNewItem('');
  };

  return (
    <form onSubmit={handleAddTodo}>
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
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>
  );
}
