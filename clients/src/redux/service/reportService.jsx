import axios from 'axios'
const API_URL = 'http://localhost:5000/api/report'
const getReports = async(keywords)=>{
    if(keywords.connName == "" && keywords.name == '' && keywords.phone == '' && keywords.numReport == ''){
        const response = await axios.get(`${API_URL}`)
        return response.data
    }
    if(keywords&& keywords.connName && keywords.name == '' && keywords.phone == '' && keywords.numReport == ''){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}`)
        return response.data
    }
    else if(keywords&& keywords.name && keywords.connName == ''&& keywords.phone==''&& keywords.numReport=='' ){
        const response = await axios.get(`${API_URL}?name=${keywords?.name }`)
        return response.data
    }
    else if(keywords&& keywords.phone && keywords.name == ''&& keywords.connName==''&& keywords.numReport=='' ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.numReport && keywords.name == ''&& keywords.phone==''&& keywords.connName=='' ){
        const response = await axios.get(`${API_URL}?numReport=${keywords?.numReport }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.name &&  keywords.phone==''&& keywords.numReport==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&name=${keywords?.name }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.phone && keywords.name == ''&& keywords.numReport==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.numReport && keywords.name == ''&& keywords.phone==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&numReport=${keywords?.numReport }`)
        return response.data
    }
    else if(keywords&& keywords.phone&&keywords.name && keywords.connName==''&& keywords.numReport==''  ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords.phone}&name=${keywords?.name }`)
        return response.data
    }
    else if(keywords&& keywords.phone&&keywords.numReport && keywords.connName==''&& keywords.name==''  ){
        const response = await axios.get(`${API_URL}?connPhone=${keywords.phone}&numReport=${keywords?.numReport }`)
        return response.data
    }
    else if(keywords&& keywords.numReport&&keywords.name &&  keywords.phone==''&& keywords.connName==''  ){
        const response = await axios.get(`${API_URL}?numReport=${keywords.numReport}&name=${keywords?.name }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.name &&keywords.phone &&  keywords.numReport==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&name=${keywords?.name }&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.name &&keywords.numReport && keywords.phone==''  ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&name=${keywords?.name }&numReport=${keywords?.numReport }`)
        return response.data
    }
    else if(keywords&& keywords.connName&&keywords.numReport &&keywords.phone && keywords.name == '' ){
        const response = await axios.get(`${API_URL}?connName=${keywords.connName}&numReport=${keywords?.numReport }&connPhone=${keywords?.phone }`)
        return response.data
    }
    else if(keywords&& keywords.connReport&&keywords.name &&keywords.phone &&  keywords.connName == '' ){
        const response = await axios.get(`${API_URL}?connReport=${keywords.connReport}&name=${keywords?.name }&connPhone=${keywords?.phone }`)
        return response.data
    }


   
}
const updateReport = async(r)=>{
    const response = await axios.put(`${API_URL}/${r._id}`,r)
    return await response.data
}
const createReport = async(r)=>{
    const response = await axios.post(`${API_URL}`,r)
    return await response.data
}
const getReportById = async(id)=>{
    const response = await axios.get(`${API_URL}/${id}`)
    console.log(response);
    
    return await response.data
}
const reportService = {
    getReports,
    updateReport,
    getReportById,    
    createReport
}
export default reportService