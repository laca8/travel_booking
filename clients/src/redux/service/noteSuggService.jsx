import axios from 'axios'
const API_URL = 'http://localhost:5000/api/note/sugg'

const getNotesSugg = async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`)
    return await response.data
}

const ctreatNoteSugg = async(n)=>{
    const response = await axios.post(`${API_URL}`,n)
    return await response.data
}


const notesSuggService = {
       getNotesSugg,
       ctreatNoteSugg
}
export default notesSuggService