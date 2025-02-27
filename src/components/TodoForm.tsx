import { useContext, useState } from 'react'
import { TodosContext } from '../App'

export default function TodoForm() {
  const [newItem, setNewItem] = useState('')
  const todosContext = useContext(TodosContext)

  // check so TS dont throw an error that the todosContext could be undefined
  if (!todosContext) {
    throw new Error(
      'TodosContext is undefined. Make sure you are wrapping your component tree with TodosContext.Provider.'
    );
  }

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    todosContext.setTodos((curr) => [...curr, { title: newItem, completed: false, id: crypto.randomUUID() }])
    setNewItem('')
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
