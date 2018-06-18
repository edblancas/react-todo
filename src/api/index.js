import v4 from 'node-uuid'

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: false
  },{
    id: v4(),
    text: 'ho',
    completed: false
  },{
    id: v4(),
    text: 'lets go!',
    completed: true
  }]
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
      default:
        return fakeDatabase.todos
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed)
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed)
    }
  })
