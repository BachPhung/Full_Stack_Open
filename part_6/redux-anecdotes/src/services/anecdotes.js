import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () =>{
    const res = await axios.get(baseUrl)
    return res.data
}
const create = async (newAnecdotes) =>{
    const res = await axios.post(baseUrl,newAnecdotes)
    return res.data
}
const update = async (id, updatedAnecdotes) =>{
    const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdotes)
    return res.data
}
export default {getAll, create, update}