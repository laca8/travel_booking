import React,{useState,useEffect} from 'react'
import SearchSugg from '../components/suggList/SearchSugg'
import List from '../components/suggList/List'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
const SuggestionList = () => {
  const [connName,setConnName] = useState('')
  const [phone,setPhone] = useState('')
  const [numSugg,setNumSugg] = useState('')
  const [side,setSide] = useState('')


  
  return (
    <div className='container'>
        <SearchSugg numSugg={numSugg} setNumSugg={setNumSugg} side={side} setSide={setSide} connName={connName} setConnName={setConnName} phone={phone} setPhone={setPhone}/>
        <List  numSugg={numSugg} setNumSugg={setNumSugg} side={side} setSide={setSide} connName={connName} setConnName={setConnName} phone={phone} setPhone={setPhone}/>
    </div>
  )
}

export default SuggestionList