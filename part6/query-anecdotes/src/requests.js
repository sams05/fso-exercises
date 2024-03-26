import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(BASE_URL, { content, votes: 0 })
  return response.data
}

export { getAll, create }
