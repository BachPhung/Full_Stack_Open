import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog)
  return res.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, getBlog, setToken, create, update, remove }