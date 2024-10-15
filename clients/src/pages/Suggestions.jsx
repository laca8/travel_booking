import React,{useState,useEffect} from 'react'
import SuggForm from '../components/forms/SuggForm'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const Suggestions = () => {
  const [notify,setNotify] = useState('')
  const suggDetails = useSelector((state)=>state.suggestion)
const {error,loading,sugg,success} = suggDetails

  return (
    <div className='container'>
             {
        error && <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
      }
        <div className='flex flex-row items-center justify-center text-center mt-10'>
            <h1 className='text-center text-5xl font-bold mb-4'>استعلامات ومقترحات</h1>
        </div>
        <SuggForm/>
    </div>
  )
}

export default Suggestions