import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const createComment = async (id, comment) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, getOne, create, createComment, update, remove }
