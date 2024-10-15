import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import data from '../../data.json'
import {useSelector,useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

const Form1 = () => {
const [notify,setNotify] = useState('')
  const x = JSON.stringify(data)
  const y = JSON.parse(x)
  //console.log(x);
  const cities =[]
  console.log(cities);
  const [dats,setDats] = useState(y.filter((v,i,a)=>a.findIndex(v2=>(v["المحافظة"] === v2["المحافظة"]))===i))
  //console.log(dats)
  const navigator = useNavigate()
  const [nameUser,setNameUser] = useState('')
  const [communicationReport,setCommunicationReport] = useState('')
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
  const stages = ['الصحة','التربية والتعليم','التضامن','المالية','التامينات']
  const usersDetails = useSelector((state)=> state.users)
  const {user} = usersDetails
const connectorData = JSON.parse(localStorage.getItem('connector'))
  useEffect(()=>{
setNameUser(user?.data?.username)
if(connectorData){
  setConnAge(connectorData?.connAge)
  setConnName(connectorData?.connName)
  setConnPhone(connectorData?.connPhone)
  setConnCity(connectorData?.connCity)
  setConnPlace(connectorData?.connPlace)
  setConnShiek(connectorData?.connShiek)
  setConnId(connectorData?.connId)
  setConnType(connectorData?.connType)
  setConnJop(connectorData?.connJop)
  setConnRelation(connectorData?.connRelation)
  setSide(connectorData?.side)
  setCommunicationReport(connectorData?.communicationReport)
}
  },[user])
  const handleSubmitReport = ()=>{
    const connector ={
      side,
      nameUser,
      communicationReport,
        connName,
        connCity,
        connId,
        connJop,
        connPhone,
        connPlace,
        connRelation,
        connType,
        connAge,
        connShiek
    }
    
    if( 
      nameUser != ''&
        connName != ''&
        connCity != ''&
        side != ''&
        communicationReport != ''&
        connPlace !='' &
        connShiek !='' ){
          localStorage.setItem('connector',JSON.stringify(connector))
    console.log(connector);  
    navigator('/report')
        }else {
          setNotify(toast.error('يجب عليك استكمال جميع البيانات'))
        }
  }
  const handleSubmitSuggestion = ()=>{
    const connector ={
        connName,
        connCity,
        connId,
        connJop,
        connPhone,
        connPlace,
        connShiek,
        connRelation,
        connType,
        connAge,
        nameUser,
        side,
        communicationReport,
        


      }
      if( 
        nameUser != ''&
          connName != ''&
          connCity != ''&
          side != ''&
          connPhone !=''&
          communicationReport != ''&
          connPlace !='' &
          connShiek !='' ){
            localStorage.setItem('connector',JSON.stringify(connector))
      console.log(connector);  
      navigator('/suggestion')
          }else {
            setNotify(toast.error('يجب عليك استكمال جميع البيانات'))
          }

  }

  return (
    <div className=' mt-10 font-bold'>
      
        <p className='font-bold text-right text-red-700 mb-1'>ملاحظة (1) الاسئلة ذات النجمة الحمراء يجب ملؤها <span className='text-red-700'>*</span></p>
        <p className='font-bold text-right bg-gray-400 p-1 w-auto rounded-sm'> ملاحظة (2) الاسئلة ذات الخلفية الرمادية لا داعي لسؤالها </p>

        <div className='border-2 border-gray-400'> 
          <p className='bg-gray-100 p-1 text-center'>بيانات متلقي البلاغ </p>

         <div className='grid grid-cols-3 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
         <div className='flex flex-col w-full p-1'>
         <label>متلقي البلاغ <span className='text-red-700'>*</span></label>
         <input disabled className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل اسم متلقي البلاغ' value={nameUser} onChange={(e)=>setNameUser(e.target.value)} />
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>وسيلة البلاغ <span className='text-red-700'>*</span></label>
          <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={communicationReport} onChange={(e)=>setCommunicationReport(e.target.value)}>
            <option value="" selected disabled hidden>اختر</option>
             
              <option >اتصال هاتفي</option>
              <option >ايميل</option>
              <option >بريد</option>
              <option >اخري</option>
             
            </select>
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>جهة البلاغ <span className='text-red-700'>*</span></label>

            <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={side} onChange={(e)=>setSide(e.target.value)}>
            <option value="" selected disabled hidden>اختر</option>

            {
                stages?.map((x,i)=>
                <option key={i}>{x}</option>
                )
              }
             
            </select>
          </div>
          
         
         </div>
        
        </div>

        <div className='border-2 border-gray-400 mt-2'> 

          <p className='bg-gray-100 p-1 text-center' >بيانات المتصل</p>

         <div className='grid grid-cols-4 justify-evenly  max-sm:grid-cols-1 text-right p-3'>
         <div className='flex flex-col w-auto p-1'>
            <label>الاسم<span className='text-red-700 '>*</span></label>
            <input className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400' value={connName} onChange={(e)=>setConnName(e.target.value)} type='text' placeholder='ادخل الاسم' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>رقم التليفون <span className='text-red-700'>*</span></label>
            <input maxLength={'11'} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={connPhone} onChange={(e)=>setConnPhone(e.target.value)} type='text' placeholder='ادخل رقم التليفون' />
          </div>
          <div className='flex flex-col w-auto p-1 '>
            <label>تاريخ الميلاد</label>
            <input className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={connAge} onChange={(e)=>setConnAge(e.target.value)} type='date' placeholder='ادخل السن ' />
          </div>
          <div className='flex flex-col w-auto bg-gray-400 rounded-md p-1 '>
            <label>النوع</label>
            <select id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" value={connType} onChange={(e)=>setConnType(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
            <option value="ذكر">ذكر</option>
            <option value="انثي">انثي</option>
            </select>

          
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المحافظة <span className='text-red-700'>*</span></label>
           
            <select id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400"value={connCity} onChange={(e)=>setConnCity(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
           
           {
            dats &&dats?.map((x,i)=>(
              <option key={i}>{x['المحافظة']}</option>
            ))
           }
            </select>
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المركز/الحي<span className='text-red-700'>*</span></label>
            <select  disabled={!connCity} id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل المركز/الحي' value={connPlace} onChange={(e)=>setConnPlace(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
          
           {
           connCity && y&&y.filter((x,i)=> x['المحافظة']  == connCity).filter((v,i,a)=>a.findIndex(v2=>(v["الحي"] === v2["الحي"]))===i)?.map((x,i)=>(
              <option key={i}>{x['الحي']}</option>
            
            
            ))
           }
            </select>
        
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>القرية/الشياخة<span className='text-red-700'>*</span></label>
            <select  disabled={!connPlace} id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل القرية/الشياخة' value={connShiek} onChange={(e)=>setConnShiek(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
         
           {
          connPlace && y && y?.filter((x,i)=> x['الحي']  == connPlace && x['المحافظة']  == connCity)?.map((x,i)=>(
              <option key={i}>{x['الشياخة']}</option>
            
            
            ))
           }
            </select>
        
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>الوظيفة</label>
            <input className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' value={connJop} onChange={(e)=>setConnJop(e.target.value)} placeholder='ادخل الوظيفة' />
          </div>
         
          <div className='flex flex-col w-auto p-1 '>
            <label>درجة القرابة مع صاحب المشكلة</label>
            <input className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={connRelation} onChange={(e)=>setConnRelation(e.target.value)} type='text' placeholder='ادخل درجة القرابة' />
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>الرقم القومي</label>
            <input maxLength={'14'} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={connId} onChange={(e)=>setConnId(e.target.value)} type='text' placeholder='ادخل الرقم القومي' />
          </div>
         
         </div>
        </div>
      <div className='flex flex-row items-start gap-3 mt-2'>
        <button className='bg-yellow-600 p-1 rounded-sm text-white' onClick={()=>handleSubmitReport()}>بلاغات</button>
        <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleSubmitSuggestion()}>استعلامات </button>
      </div>
      <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
    </div>
  )
}

export default Form1