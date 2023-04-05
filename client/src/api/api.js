import axios from 'axios'

export const addPositionRequest = async (staff) =>
    await axios.post("http://localhost:3000/add/staff", staff)

