import axios from 'axios'
const API_URL = 'http://localhost:5000/api/sugg'
const getSuggs = async(keywords)=>{
    if(keywords&& keywords.connName && keywords.side == '' && keywords.phone == '' && keywords.numSugg == ''){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}`)
        return response.data
    }
    else if(keywords&& keywords.side && keywords.connName == ''&& keywords.phone==''&& keywords.numSugg=='' ){
        const response = await axios.get(`${API_URL}?side=${keywords?.side }`)
        return response.data
    }
    else if(keywords&& keywords.phone && keywords.side == ''&& keywords.connName==''&& keywords.numSugg=='' ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.numSugg && keywords.side == ''&& keywords.phone==''&& keywords.connName=='' ){
        const response = await axios.get(`${API_URL}?numSugg=${keywords?.numSugg }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.side &&  keywords.phone==''&& keywords.numSugg==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&side=${keywords?.side }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.phone && keywords.side == ''&& keywords.numSugg==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.numSugg && keywords.side == ''&& keywords.phone==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&numSugg=${keywords?.numSugg }`)
        return response.data
    }
    else if(keywords&& keywords.phone&&keywords.side && keywords.connName==''&& keywords.numSugg==''  ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords.phone}&side=${keywords?.side }`)
        return response.data
    }
    else if(keywords&& keywords.phone&&keywords.numSugg && keywords.connName==''&& keywords.side==''  ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords.phone}&numSugg=${keywords?.numSugg }`)
        return response.data
    }
    else if(keywords&& keywords.numSugg&&keywords.side &&  keywords.phone==''&& keywords.connName==''  ){
        const response = await axios.get(`${API_URL}?numSugg=${keywords.numSugg}&side=${keywords?.side }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.side &&keywords.phone &&  keywords.numSugg==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&name=${keywords?.side }&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.side &&keywords.numSugg && keywords.phone==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&side=${keywords?.side }&numSugg=${keywords?.numSugg }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.numSugg &&keywords.phone && keywords.side == '' ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&numSugg=${keywords?.numSugg }&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connReport&&keywords.side &&keywords.phone &&  keywords.connName == '' ){
        const response = await axios.get(`${API_URL}?connReport=${keywords.connReport}&side=${keywords?.side }&connPhone=${keywords?.phone }`)
        return response.data
    }


   
}
const updateSugg = async(r)=>{
    const response = await axios.put(`${API_URL}/${r._id}`,r)
    return await response.data
}
const createSugg = async(r)=>{
    const response = await axios.post(`${API_URL}`,r)
    return await response.data
}
const getSuggById = async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`)
    console.log(response);
    
    return await response.data
}
const reportService = {
    getSuggs,
    updateSugg,
    getSuggById,    
    createSugg
}
export default reportService