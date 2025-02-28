import React, { useState } from 'react';
import { useTodoService } from "../context/TodoServiceContext";
import { Todo } from '../../lib/types';
import { useTodos } from '../App';

export default function TodoForm() {
  const todoService = useTodoService();
  const [newItem, setNewItem] = useState('');
  const { setTodos } = useTodos()

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem.trim()) return; // Prevent empty submissions

    const newTodo: Todo = { title: newItem, completed: false, id: crypto.randomUUID() };

    try {
      await todoService.addTodo(newTodo);
      setTodos((currTodos) => [...currTodos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
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
