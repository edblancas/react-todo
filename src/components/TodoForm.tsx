import { useState } from 'react'

export default function TodoForm() {
  const [newItem, setNewItem] = useState('')

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    // setTodos((curr) => [...curr, { title: newItem, completed: false, id: crypto.randomUUID() }])
  }

  return (
    <form>
      <label htmlFor='newItem'>Add todo</label>
      <br />
      <input type='text' id='newItem' value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      <br />
      <button onClick={handleAddTodo}>
        Add
      </button>
    </form>
  )
}
