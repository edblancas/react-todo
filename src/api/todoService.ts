import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const getAllTodos = async () => {
  const { data } = await axios.get(`${BASE_URL}/todos`)
  console.log('GET /todos', data)
  return data
}
