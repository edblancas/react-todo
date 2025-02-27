export default function TodoItem({ todo }) {
  const handleCheckTodo = (id: string, completed: boolean) => {
    // setTodos((currTodos) => {
    //   return currTodos.map((v) => {
    //     if (v.id == id) {
    //       v.completed = completed
    //       return v
    //     }
    //     return v
    //   })
    // })
  }

  const handleDeleteTodo = (id: string) => {
    // setTodos((currTodos) => {
    //   return currTodos.filter((todo) => todo.id !== id)
    // })
  }
  return (
    <li key={todo.id}>
      <input type='checkbox' defaultChecked={todo.completed} onChange={(e) => handleCheckTodo(todo.id, e.target.checked)} />
      {todo.title}
      <input type='button' value='Delete' onClick={() => handleDeleteTodo(todo.id)} />
    </li>
  )
}
