import { useState } from 'react'

function App() {
  type Todo = {
    title: string;
    completed: boolean;
    id: string;
  }

  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setTodos((curr) => [...curr, { title: newItem, completed: false, id: crypto.randomUUID() }])
  }

  const handleCheckTodo = (id: string, completed: boolean) => {
    setTodos((currTodos) => {
      return currTodos.map((v) => {
        if (v.id == id) {
          v.completed = completed
          return v
        }
        return v
      })
    })
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((currTodos) => {
      return currTodos.filter((todo) => todo.id !== id)
    })
  }

  return (
    <>
      <form>
        <label htmlFor='newItem'>Add todo</label>
        <br />
        <input type='text' id='newItem' value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        <br />
        <button onClick={handleAddTodo}>
          Add
        </button>
      </form>
      {todos.length === 0 && "no todos"}
      <ol>
        {todos.map((v) => {
          return (
            <li key={v.id}>
              <input type='checkbox' defaultChecked={v.completed} onChange={(e) => handleCheckTodo(v.id, e.target.checked)} />
              {v.title}
              <input type='button' value='Delete' onClick={() => handleDeleteTodo(v.id)} />
            </li>
          )
        })}
      </ol>
    </>
  )
}

export default App
