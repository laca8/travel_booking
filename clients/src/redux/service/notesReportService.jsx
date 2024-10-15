import axios from 'axios'
const API_URL = 'http://localhost:5000/api/note'

const getNotes = async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`)
    return await response.data
}

const ctreatNote = async(n)=>{
    const response = await axios.post(`${API_URL}`,n)
    return await response.data
}


const notesReportService = {
       getNotes,
       ctreatNote
}
export default notesReportService