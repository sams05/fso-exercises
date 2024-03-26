import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export { getAll }
