import React,{useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import data from '../../data.json'
import {useSelector,useDispatch} from 'react-redux'
import {editSugg, fetchSugg} from '../../redux/slicers/suggSlice'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner'

const UpdateSugg = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const clickToNotes = ()=>{
      navigator(`/notes-sugg/${id}`)
  }
  const print = ()=>{
    window.print()
  }
  const suggDetails = useSelector((state)=>state.suggestion)
  const {error,loading,sugg} = suggDetails
  const usersDetails = useSelector((state)=> state.users)
     const {user} = usersDetails
  const [nameUser,setNameUser] = useState('')
  const [communicationSugg,setCommunicationSugg] = useState('')
  const [connName,setConnName] = useState('')
  const [connPhone,setConnPhone] = useState('')
  const [connCity,setConnCity] = useState('')
  const [connPlace,setConnPlace] = useState('')
  const [connShiek,setConnShiek] = useState('')
  const [connJop,setConnJop] = useState('')
  const [connType,setConnType] = useState('')
  const [connRelation,setConnRelation] = useState('')
  const [connId,setConnId] = useState('')
  const [connAge,setConnAge] = useState('')
  const [side,setSide] = useState('')
  
  const [suggType,setSuggType] = useState('')
  const [suggSide,setSuggSide] = useState('')
  useEffect(()=>{
    if (sugg?.data?.connName || sugg?.data?._id == id) {
      setConnName(sugg?.data?.connName)
      setConnPhone(sugg?.data?.connPhone)
      setConnAge(sugg?.data?.connAge)
      setConnCity(sugg?.data?.connCity)
      setConnPlace(sugg?.data?.connPlace)
      setConnShiek(sugg?.data?.connShiek)
      setConnId(sugg?.data?.connId)
      setConnJop(sugg?.data?.connJop)
      setConnRelation(sugg?.data?.connRelation)
      setConnType(sugg?.data?.connType)
      setConnType(sugg?.data?.connType)
      setSide(sugg?.data?.side)
      setNameUser(sugg?.data?.nameUser)
      setCommunicationSugg(sugg?.data?.communicationSugg)
      setSuggSide(sugg?.data?.suggSide)
      setSuggType(sugg?.data?.suggType)
    
    }
  },[id,sugg])

  const handleUpdate = ()=>{
    const r ={
      _id:sugg?.data?._id,
      side,
        connName,
        connCity,
        connId,
        connJop,
        connPhone,
        connPlace,
        connRelation,
        connType,
        connAge,
        connShiek,
        nameUser,
        suggType,
        suggSide,
        communicationSugg
        
    }
    //console.log(r);
    //console.log(id);
    
    dispatch(editSugg(r))
    }
  const [notify,setNotify] = useState('')

  useEffect(()=>{
    if(error){
setNotify(toast.error(error))      
  }
  },[error])
  return (
   <>
    <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
 
   <div className=' '>
   {
                loading && <Spinner/>
              }
    
   <div className='border-2 border-gray-400 mt-2'> 
          <p className='bg-gray-100 p-1 text-center'>بيانات متلقي الاستعلام </p>

         <div className='grid grid-cols-3 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
         <div className='flex flex-col w-full p-1'>
         <label>متلقي الاستعلام</label>
         <input value={nameUser} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل اسم متلقي الاستعلام' disabled />
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>وسيلة الاستعلام</label>
          <input disabled value={communicationSugg} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل وسيلة الاستعلام' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>جهة الاستعلام</label>
          <input disabled value={side} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل وسيلة الاستعلام' />
          </div>
          
         
         </div>
        
        </div>
        <div className='border-2 border-gray-400 mt-2 '> 
          <p className='bg-gray-100 p-1'>  بيانات المتصل</p>

          <div className='grid grid-cols-4 justify-evenly  max-sm:grid-cols-1 text-right p-3'>
         <div className='flex flex-col w-auto p-1'>
            <label>الاسم</label>
            <input value={connName} onChange={(e)=>setConnName(e.target.value)} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الاسم' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>رقم التليفون </label>
            <input maxLength={'11'} value={connPhone} onChange={(e)=>setConnPhone(e.target.value)}  className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل رقم التليفون' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المحافظة </label>
            <input value={connCity} onChange={(e)=>setConnCity(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل المحافظة' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المركز/الحي</label>
            <input value={connPlace} onChange={(e)=>setConnPlace(e.target.value)}  className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل المركز/الحي' />
          </div>
         
          <div className='flex flex-col  w-auto p-1'>
            <label>القرية/الشياخة<span className='text-red-700'>*</span></label>
            <input value={connShiek} onChange={(e)=>setConnShiek(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text'  />
          </div>
          <div className='flex flex-col w-auto p-1 '>
            <label>الوظيفة</label>
            <input value={connJop} onChange={(e)=>setConnJop(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الوظيفة' />
          </div>
          <div className='flex flex-col w-auto p-1 '>
            <label>النوع</label>
            <input value={connType} onChange={(e)=>setConnType(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل النوع' />
          </div>
         
          <div className='flex flex-col w-auto p-1 '>
            <label>الرقم القومي</label>
            <input maxLength={'14'} value={connId} onChange={(e)=>setConnId(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الرقم القومي' />
          </div>
         </div>
        </div>

        <div className='border-2 border-gray-400 mt-2'> 
          <p className='bg-gray-100 p-1'>  بيانات الاستعلام </p>

         <div className='grid grid-cols-3 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
         <div className='flex flex-col w-full p-2'>
            <label>النوع</label>
            <input value={suggType} onChange={(e)=>setSuggType(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder=' ' />
           
          </div>

          <div className='flex flex-col  w-auto p-1'>
          <label>جهة الاستعلام</label>
          <input value={suggSide} onChange={(e)=>setSuggSide(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder=' ' />
           
          </div>
          
         
         </div>
        
        </div>
      
    <div className='flex flex-row items-start gap-2 mt-2'>
    <button className='bg-green-800 p-1 rounded-sm text-white'onClick={()=>clickToNotes()} >ملاحظات</button>
    <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleUpdate()} >تعديل </button>
    <button className='bg-yellow-700 p-1 rounded-sm text-white' onClick={()=>print()}>طباعة </button>
    </div>
        
    </div>
   </>
  )
}

export default UpdateSugg