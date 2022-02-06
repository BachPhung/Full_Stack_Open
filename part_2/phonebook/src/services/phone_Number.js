import axios from "axios"

const base_URL = '/api/persons'

const getAll = async () => {
    const request = await axios.get(base_URL)
    return request.data
}

const create = async (newNumber) => {
    const request = await axios.post(base_URL, newNumber)
    return request.data
}

const update = async (id, person) => {
    const request = await axios.put(`${base_URL}/${id}`, person)
    return request.data
}

const deletePerson = async (id) => {
    await axios.delete(`${base_URL}/${id}`)
}

const phoneService = {
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}
export default phoneService