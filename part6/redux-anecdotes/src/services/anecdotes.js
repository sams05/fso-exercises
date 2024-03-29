import axios from 'axios'
const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const add = async (content) => {
  const response = await axios.post(BASE_URL, { content, votes: 0 })
  return response.data
}

const update = async (updatedAnecdote) => {
  const response = await axios.put(`${BASE_URL}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, add, update }
