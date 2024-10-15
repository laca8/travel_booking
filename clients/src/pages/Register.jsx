import React,{useEffect, useState} from 'react'
import {registerUser} from '../redux//slicers/authSlice'
import {useSelector,useDispatch}   from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner';
const Register = () => {
  const navigator = useNavigate()
  const  dispatch = useDispatch()
const [notify,setNotify] = useState('')
  const userDetails = useSelector((state)=>state.users)
  const {error,user,loading,success} =userDetails

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit=()=>{
      if(username == '' || password == ''){
        toast.error('يجب ادخال جميع البيانات')
      }
      if(username.length < 3){
        toast.error('يجب ادخال  اسم  يحتوي علي 3 احراف علي الاقل')
      }
      if(password.length < 6){
        toast.error('يجب ادخال  كلمة سر  تحتوي علي 6 احراف او 6 ارقام علي الاقل')
      }
        dispatch(registerUser({username,password})) 
    }

    useEffect(()=>{
      if(error){
         setNotify(toast.error(error))      
    }else if(success){
        setNotify(toast.success('تم اضافة حساب جديد'))
        navigator('/admin')
       }
    },[success,error])
  return (
    <section className="text-black  flex flex-col items-center mt-20 w-full">
  <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
             
            
              {
                loading ? <Spinner/> : (<>
          <div className="w-96 font-bold border-2 border-gray-400 p-10 max-md:w-80 max-sm:w-60">

                 <h1 className="text-xl font-bold leading-tight  text-black text-center">
                اضافة حساب جديد
              </h1>
                 <div className='flex flex-col items-start w-full'>
                      <label  className="text-sm font-medium text-black">الاسم</label>
                      <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}  className='rounded-md w-full p-2 border-2 border-gray-400' placeholder="الاسم" required=""/>
                  </div>
                  <div className='flex flex-col items-start w-full'>
                      <label  className="text-sm font-medium text-black">الرقم السري</label>
                      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className='rounded-md  w-full p-2 border-2 border-gray-400'  placeholder="الرقم السري" />
                      
                    
                  </div>
                  <div className='flex flex-col items-center '>
                  <button type="submit" className="w-auto   text-black bg-gray-400 p-2 rounded-md mt-2 mb-2 " onClick={()=> handleSubmit()}>اضافة حساب </button>

                    </div>
                 
          </div>

                
                </>)
              }
             
             
                 
         
     
</section>
  )
}

export default Register