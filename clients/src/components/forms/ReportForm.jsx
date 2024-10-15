import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import data from '../../data.json'
import { useDispatch,useSelector } from 'react-redux'
import {addReport} from '../../redux/slicers/reportSlice'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner'
import axios from 'axios'
const ReportForm = () => {
const [notify,setNotify] = useState('')

  const reportDetail = useSelector((state)=>state.report)
  const {error,loading,report,success} = reportDetail
  const dispatch = useDispatch()
  const x = JSON.stringify(data)
  const y = JSON.parse(x)
  //console.log(x);
  
  
  
  const cities =[]
  console.log(cities);
  
  const [dats,setDats] = useState(y.filter((v,i,a)=>a.findIndex(v2=>(v["المحافظة"] === v2["المحافظة"]))===i))
  const navigator = useNavigate()
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('')
  const [place,setPlace] = useState('')
  const [shiek,setShiek] = useState('')
  const [type,setType] = useState('')

  const [id,setId] = useState('')
  const [dis,setDis] = useState('')
  const [reason,setReason] = useState('')
  const [order,setOrder] = useState('')
  const [age,setAge] = useState('')
  
  const [eduStatus,setEduStatus] = useState('')
  const [eduLevel,setEduLevel] = useState('')
  const [marridStatus,setMarridStatus] = useState('')
  const [workStatus,setWorkStatus] = useState('')
  const [typeWork,setTypeWork] = useState('')
  const [outWork,setOutWork] = useState('')
  const [healthInsure,setHealthInsure] = useState('')
  const [finSupport,setFinSupport] = useState('')
  const [eduDataStatus,setEduDataStaus] = useState([])
  const [eduDataLevel,setEduDataLevel] = useState([])
  const [typeDataWork,setTypeDataWork] = useState([])
  const [OutDataWork,setOutDataWork] = useState([])
  const [marrDataStatus,setMarrDataStatus] = useState([])
  const [disData,setDisData] = useState([])
  const handleSubmitReport = ()=>{
    const connector = JSON.parse(localStorage.getItem('connector'))
    console.log(connector); 

    const disabl ={
       name,
       phone,
       city,
       place,
       shiek,
       type,
       eduStatus,
       eduLevel,
       workStatus,
       outWork,
       typeWork,
       marridStatus,
       finSupport,
       healthInsure,
      nameUser:connector.nameUser,
      communicationReport:connector.communicationReport,
     connName:connector.connName,
     connCity:connector.connCity,
     connId:connector.connId,
     connJop:connector.connJop,
     connPhone:connector.connPhone,
     connPlace:connector.connPlace,
     connRelation:connector.connRelation,
     connType:connector.connType,
     connAge:connector.connAge,
     connShiek:connector.connShiek,
       id,
       dis,
       reason,
       report:order,
       age,
       side:connector.side, 
    }
    // console.log(disabl);
     if(name != '' & city != '' & place != '' & shiek != ''){
     dispatch(addReport(disabl))
     console.log(report);
     localStorage.removeItem('connector')
      setNotify(toast.success('تم اضافة بلاغ جديد'))
      window.location.reload()
      alert(`رقم البلاغ هو : ${report?.data?.numReport}`)

     }else{
      setNotify(toast.error('يجب عليك استكمال جميع البيانات'))

     }
  }
  
  useEffect(()=>{
    if(error){
setNotify(toast.error(error))      
  }else if(success){
      setNotify(toast.success('تم اضافة بلاغ جديد'))
      navigator('/')

     }
  },[success,error])
  const API_URL = 'http://localhost:5000/api' 

  useEffect(()=>{
    const fetchData1 = async()=>{
        const res = await axios.get(`${API_URL}/workType`)
        setTypeDataWork(res?.data?.data)
    }
    const fetchData2 = async()=>{
      const res = await axios.get(`${API_URL}/eduStatus`)
      setEduDataStaus(res?.data?.data)
  }
  const fetchData3 = async()=>{
    const res = await axios.get(`${API_URL}/eduLevel`)
    setEduDataLevel(res?.data?.data)
}
const fetchData4 = async()=>{
  const res = await axios.get(`${API_URL}/marrideStatus`)
  setMarrDataStatus(res?.data?.data)
}
const fetchData5 = async()=>{
  const res = await axios.get(`${API_URL}/outWork`)
  setOutDataWork(res?.data?.data)
}
const fetchData6 = async()=>{
  const res = await axios.get(`${API_URL}/disable`)
  setDisData(res?.data?.data)
}
const fetchData7 = async()=>{
  const res = await axios.get(`${API_URL}/workType`)
  setTypeDataWork(res?.data?.data)
}

    fetchData1()
    fetchData2()
    fetchData3()
    fetchData4()
    fetchData5()
    fetchData6()
    fetchData7()
   },[])
  return (
    <div className='mt-3 font-bold'>
      <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
{
                loading && <Spinner/>
              }
        <p className='font-bold text-right text-red-700 mb-1'>ملاحظة (1) الاسئلة ذات النجمة الحمراء يجب ملؤها <span className='text-red-700'>*</span></p>
        <p className='font-bold text-right bg-gray-400 p-1 w-auto rounded-sm'> ملاحظة (2) الاسئلة ذات الخلفية الرمادية لا داعي لسؤالها </p>


        <div className='border-2 border-gray-400'> 
          <p className='bg-gray-100 p-1 text-center'>بيانات البلاغ</p>

         <div className='grid grid-cols-4 max-sm:grid-cols-1 justify-evenly  text-right p-3 '>
         <div className='flex flex-col w-auto  p-1'>
            <label>اسم الحالة</label>
            <input className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='ادخل الاسم'  />
          </div>
          <div className='flex flex-col  w-auto p-1'>
          <label>نوع الاعاقة<span className='text-red-700'>*</span></label>
            <select defaultValue={'اختر نوع الاعاقة'} id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={dis} onChange={(e)=>setDis(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>

            {
      disData ? disData?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
            </select>
          </div>
          <div className='flex flex-col w-auto  p-1'>
            <label>سبب الاعاقة</label>
            <input className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={reason} onChange={(e)=>setReason(e.target.value)} type='text' placeholder='ادخل سبب الاعاقة'  />
          </div>
         
          <div className='flex flex-col w-auto p-1'>
            <label>رقم تليفون الحالة </label>
            <input maxLength={'11'} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={phone} onChange={(e)=>setPhone(e.target.value)} type='text' placeholder='ادخل رقم التليفون' />
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>تاريخ الميلاد</label>
            <input  className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={age} onChange={(e)=>setAge(e.target.value)} type='date' placeholder='ادخل تاريخ الميلاد ' />
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>المحافظة <span className='text-red-700'>*</span></label>
           
            <select   className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400"value={city} onChange={(e)=>setCity(e.target.value)}  >
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
            <select  disabled={!city} id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل المركز/الحي' value={place} onChange={(e)=>setPlace(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>

           {
           city && y&&y.filter((x,i)=> x['المحافظة']  == city).filter((v,i,a)=>a.findIndex(v2=>(v["الحي"] === v2["الحي"]))===i)?.map((x,i)=>(
              <option key={i}>{x['الحي']}</option>
            
            
            ))
           }
            </select>
        
          </div>
          <div className='flex flex-col  w-auto p-1'>
            <label>القرية/الشياخة<span className='text-red-700'>*</span></label>
            <select  disabled={!place} id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" placeholder='ادخل القرية/الشياخة' value={shiek} onChange={(e)=>setShiek(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
          
           {
          place && y && y?.filter((x,i)=> x['الحي']  == place && x['المحافظة']  == city)?.map((x,i)=>(
              <option key={i}>{x['الشياخة']}</option>
            
            
            ))
           }
            </select>
        
          </div>
          <div className='flex flex-col w-auto  bg-gray-400 rounded-md p-1'>
            <label>النوع</label>
            <select id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" value={type} onChange={(e)=>setType(e.target.value)}  >
            <option value="" selected disabled hidden>اختر</option>
            <option value="ذكر">ذكر</option>
            <option value="انثي">انثي</option>
            </select>
          </div>
          <div className='flex flex-col w-auto p-1'>
            <label>الرقم القومي</label>
            <input maxLength={'14'} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' value={id} onChange={(e)=>setId(e.target.value)} type='text' placeholder='ادخل الرقم القومي' />
          </div>
         </div>


        </div>
        <div className='border-2 border-gray-400 mt-2'>
          
        <p className='bg-gray-100 p-1 text-center'>استكمال تفاصيل البلاغ</p>

<div className='grid grid-cols-4 max-sm:grid-cols-1 justify-evenly  text-right p-3  '>

 <div className='flex flex-col  w-auto p-1'>
 <label>الحالة التعليمية</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={eduStatus} onChange={(e)=>setEduStatus(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>
   {
      eduDataStatus ? eduDataStatus?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
   
   </select>
 </div>

 <div className='flex flex-col  w-auto p-1'>
 <label>المستوي التعليمي</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={eduLevel} onChange={(e)=>setEduLevel(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>
   {
      eduDataLevel ? eduDataLevel?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
   
   </select>
 </div>
 <div className='flex flex-col  w-auto p-1'>
 <label>حالة العمل</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={workStatus} onChange={(e)=>setWorkStatus(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>

     <option >نعم</option>
     <option >لا يعمل</option>
  
   
   </select>
 </div>
 <div className='flex flex-col  w-auto p-1'>
 <label>نوع العمل</label>
   <select disabled={workStatus =='لا يعمل'} id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={typeWork} onChange={(e)=>setTypeWork(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>
    {
      typeDataWork ? typeDataWork?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
   </select>
 </div>
 <div className='flex flex-col  w-auto p-1'>
 <label>خارج قوة العمل</label>
   <select  disabled={workStatus =='نعم يعمل'  } id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={outWork} onChange={(e)=>setOutWork(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>
   {
      OutDataWork ? OutDataWork?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
   </select>
 </div>

 <div className='flex flex-col  w-auto p-1'>
 <label>الحالة الاجتماعية</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={marridStatus} onChange={(e)=>setMarridStatus(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>
   {
      marrDataStatus ? marrDataStatus?.map((x,i)=>(
      <option key={i}>{x?.title}</option>
      )) : <p>loading...</p>
    }
   </select>
 </div>
 <div className='flex flex-col  w-auto p-1'>
 <label>هل له تامين صحي</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={healthInsure} onChange={(e)=>setHealthInsure(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>

     <option >نعم</option>
     <option >لا</option>
    
   
   </select>
 </div>
 <div className='flex flex-col  w-auto p-1'>
 <label>هل  يحصل علي دعم مالي</label>
   <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" value={finSupport} onChange={(e)=>setFinSupport(e.target.value)}>
   <option value="" selected disabled hidden>اختر</option>

     <option >تأمين</option>
     <option >معاش</option>
     <option >تكافل</option>
     <option >كرامة</option>
     <option >اعادات حكومية</option>
     <option >اعادات اهلية</option>
     <option >اخري</option>
    
   
   </select>
 </div>
 

          </div> 
          
         <div className='flex flex-col p-3 text-right '>
            <label>تفاصيل البلاغ</label>
            <textarea id="message" rows="4" className="bg-gray-100  rounded-sm w-full border-2 border-gray-400" value={order} onChange={(e)=>setOrder(e.target.value)} ></textarea>
          </div>
          </div>

        
        <div className='flex flex-row items-start gap-3 mt-2'>
       
        <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleSubmitReport()}>انهاء </button>
      </div>
        
        
    </div>
  )
}

export default ReportForm