import React,{useState,useEffect} from 'react'
import ListsReports from '../components/lists/ListsReports'
import Search from '../components/Search'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
const Reports = () => {
  const [connName,setConnName] = useState('')
  const [phone,setPhone] = useState('')
  const [numReport,setNumReport] = useState('')
  const [name,setName] = useState('')
  const dispatch = useDispatch()
  const reports = useSelector((state)=> state.reports)
  const navigator = useNavigate()
  return (
   <div className='container'>
   <Search numReport={numReport} setNumReport={setNumReport} name={name} setName={setName} connName={connName} setConnName={setConnName} phone={phone} setPhone={setPhone}/>
   <ListsReports numReport={numReport} setNumReport={setNumReport} name={name} setName={setName} connName={connName} setConnName={setConnName} phone={phone} setPhone={setPhone}/>
   </div>
  )
}

export default Reports