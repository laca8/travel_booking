import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import data from '../../data.json'
import {useSelector,useDispatch} from 'react-redux'
import {editReport, fetchReport} from '../../redux/slicers/reportSlice'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner'
const UpdateReport = ({id}) => {
const [notify,setNotify] = useState(null)

  const dispatch = useDispatch()
  const navigator = useNavigate()
  const clickToNotes = (id)=>{
      navigator(`/notes/${id}`)
  }
  const print = ()=>{
    window.print()
  }
  const x = JSON.stringify(data)
  const y = JSON.parse(x)
  //console.log(x);
  
  
  
  const cities =[]
  console.log(cities);
  const reportDetail = useSelector((state)=>state.report)
  const {error,loading,report} = reportDetail
  const usersDetails = useSelector((state)=> state.users)
     const {user} = usersDetails
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
  const [eduStatus,setEduStatus] = useState('')
  const [eduLevel,setEduLevel] = useState('')
  const [marridStatus,setMarridStatus] = useState('')
  const [workStatus,setWorkStatus] = useState('')
  const [typeWork,setTypeWork] = useState('')
  const [outWork,setOutWork] = useState('')
  const [healthInsure,setHealthInsure] = useState('')
  const [finSupport,setFinSupport] = useState('')
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('')
  const [place,setPlace] = useState('')
  const [shiek,setShiek] = useState('')
  const [type,setType] = useState('')
  const [ids,setIds] = useState('')
  const [dis,setDis] = useState('')
  const [reason,setReason] = useState('')
  const [age,setAge] = useState('')
  const [imp,setImp] = useState(false)

  useEffect(()=>{
    if (report?.data?.nameUser || report?.data?._id == id) {
      setConnName(report?.data?.connName)
      setConnPhone(report?.data?.connPhone)
      setConnAge(report?.data?.connAge)
      setConnCity(report?.data?.connCity)
      setConnPlace(report?.data?.connPlace)
      setConnShiek(report?.data?.connShiek)
      setConnId(report?.data?.connId)
      setConnJop(report?.data?.connJop)
      setConnRelation(report?.data?.connRelation)
      setConnType(report?.data?.connType)
      setCity(report?.data?.city)
      setPlace(report?.data?.place)
      setShiek(report?.data?.shiek)
      setConnType(report?.data?.connType)
      setImp(report?.data?.imp)

      setEduLevel(report?.data?.eduLevel)
      setEduStatus(report?.data?.eduStatus)
      setOutWork(report?.data?.outWork)
      setFinSupport(report?.data?.finSupport)
      setHealthInsure(report?.data?.healthInsure)
      setMarridStatus(report?.data?.marridStatus)
      setNameUser(report?.data?.nameUser)
      setCommunicationReport(report?.data?.communicationReport)
      setWorkStatus(report?.data?.workStatus)
      setTypeWork(report?.data?.typeWork)
      setName(report?.data?.name)
      setAge(report?.data?.age)
      setIds(report?.data?.id)
      setCity(report?.data?.city)
      setPlace(report?.data?.place)
      setShiek(report?.data?.shiek)
      setType(report?.data?.type)
      setDis(report?.data?.dis)
      setReason(report?.data?.reason)
      setPhone(report?.data?.phone)
    }
  },[id,dispatch,report])

  const handleUpdate = ()=>{
    const r ={
      _id:report?.data?._id,
      side,
      eduStatus,
      eduLevel,
      workStatus,
      outWork,
      typeWork,
      marridStatus,
      finSupport,
      healthInsure,
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
        name,
       phone,
       city,
       place,
       type,
       ids,
       dis,
       reason,
       age,
    }
    //console.log(r);
    //console.log(id);
    
    dispatch(editReport(r))
    alert('تم تحديث البلاغ')
    console.log(report);
    
    
  }
  useEffect(()=>{
    if(error){
      setNotify(toast.error(error))      
  }
  },[error])

  const handleImp = ()=>{
    setImp(true)
    const r ={
      _id:report?.data?._id,
      imp:true,
      side,
      eduStatus,
      eduLevel,
      workStatus,
      outWork,
      typeWork,
      marridStatus,
      finSupport,
      healthInsure,
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
        name,
       phone,
       city,
       place,
       type,
       ids,
       dis,
       reason,
       age,
    }
    dispatch(editReport(r))
    console.log(imp);
    
  }
  return (
   <>
  
   <div className='font-bold text-center '>
   {
                loading ? <Spinner/> :(
                  <>
                  <div className='grid grid-cols-2 gap-2 max-md:grid-cols-1'>
<div className='border-2 border-gray-400 mt-2'> 
       <p className='bg-gray-100 p-1 text-center'>بيانات متلقي البلاغ </p>

      <div className='grid grid-cols-1 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
      <div className='flex flex-col w-full p-1'>
      <label>متلقي البلاغ</label>
      <input disabled value={nameUser} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل اسم متلقي البلاغ' />
       </div>
       <div className='flex flex-col  w-auto p-1'>
       <label>وسيلة البلاغ</label>
       <input disabled value={communicationReport}  className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل وسيلة البلاغ' />
       </div>
       
      
      </div>
     
     </div>
     <div className='border-2 border-gray-400 mt-2 '> 
       <p className='bg-gray-100 p-1'>  بيانات المتصل</p>

       <div className='grid grid-cols-3 justify-evenly  max-sm:grid-cols-1 text-right p-3'>
      <div className='flex flex-col w-auto p-1'>
         <label>الاسم</label>
         <input disabled={report?.data?.imp}  value={connName} onChange={(e)=>setConnName(e.target.value)}  className={`bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400`} type='text' placeholder='ادخل الاسم' />
       </div>
       <div className='flex flex-col  w-auto p-1'>
         <label>رقم التليفون </label>
         <input value={connPhone} onChange={(e)=>setConnPhone(e.target.value)}   className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='number' placeholder='ادخل رقم التليفون' />
       </div>
       <div className='flex flex-col  w-auto p-1'>
         <label>المحافظة </label>
         <input value={connCity} onChange={(e)=>setConnCity(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل المحافظة' />
       </div>
       <div className='flex flex-col  w-auto p-1'>
         <label>المركز/الحي</label>
         <input value={connPlace} onChange={(e)=>setConnPlace(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل المركز/الحي' />
       </div>
      
       <div className='flex flex-col  w-auto p-1'>
         <label>القرية/الشياخة</label>
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
         <label>درجة القرابة</label>
         <input value={connRelation} onChange={(e)=>setConnRelation(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل درجة القرابة' />
       </div>
       <div className='flex flex-col w-auto p-1 '>
         <label>الرقم القومي</label>
         <input value={connId} onChange={(e)=>setConnId(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الرقم القومي' />
       </div>
      </div>
     </div>
     </div>
     <div className='grid grid-cols-2 gap-2 max-md:grid-cols-1'>

   
     <div className='border-2 border-gray-400  mt-2'> 
       <p className='bg-gray-100 p-1 text-center'>بيانات البلاغ</p>

      <div className='grid grid-cols-3 max-sm:grid-cols-1 justify-evenly  text-right p-3 '>
      <div className='flex flex-col w-auto  p-1'>
         <label>اسم الحالة</label>
         <input value={name} onChange={(e)=>setName(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل الاسم'  />
       </div>
       <div className='flex flex-col  w-auto p-1'>
       <label>نوع الاعاقة</label>
         <input value={dis} onChange={(e)=>setDis(e.target.value)} id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400" />
       
       </div>
       <div className='flex flex-col w-auto  p-1'>
         <label>سبب الاعاقة</label>
         <input value={reason} onChange={(e)=>setReason(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل سبب الاعاقة'  />
       </div>
      
       <div className='flex flex-col w-auto p-1'>
         <label>رقم تليفون الحالة </label>
         <input maxLength={'11'} value={phone} onChange={(e)=>setPhone(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  type='text' placeholder='ادخل رقم التليفون' />
       </div>
       <div className='flex flex-col w-auto p-1'>
         <label>تاريخ الميلاد</label>
         <input value={age} onChange={(e)=>setAge(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  type='date' placeholder='ادخل تاريخ الميلاد ' />
       </div>
       <div className='flex flex-col  w-auto p-1'>
       <label>المحافظة </label>
       <input value={city} onChange={(e)=>setCity(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل المحافظة' />
        
      
       </div>
       <div className='flex flex-col  w-auto p-1'>
       <label>الحي/المركز </label>
       <input value={place} onChange={(e)=>setPlace(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الحي' />
 
       </div>
       <div className='flex flex-col  w-auto p-1'>
       <label>القرية/الشياخة </label>
       <input value={shiek} onChange={(e)=>setShiek(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل الشياخة' />
     
       </div>
       <div className='flex flex-col w-auto p-1'>
         <label>النوع</label>
         <input value={type} onChange={(e)=>setType(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
       </div>
       <div className='flex flex-col w-auto p-1'>
         <label>الرقم القومي</label>
         <input maxLength={'14'} value={ids} onChange={(e)=>setIds(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
       </div>
      </div>


     </div>
     <div className='border-2 border-gray-400 mt-2'>
       
     <p className='bg-gray-100 p-1 text-center'>استكمال تفاصيل البلاغ</p>

<div className='grid grid-cols-3 max-sm:grid-cols-1 justify-evenly  text-right p-3  '>

<div className='flex flex-col  w-auto p-1'>
<label>الحالة التعليمية</label>
<input value={eduStatus} onChange={(e)=>setEduStatus(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />

</div>

<div className='flex flex-col  w-auto p-1'>
<label>المستوي التعليمي</label>
<input value={eduLevel} onChange={(e)=>setEduLevel(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>
<div className='flex flex-col  w-auto p-1'>
<label>حالة العمل</label>
<input value={workStatus} onChange={(e)=>setWorkStatus(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>
<div className='flex flex-col  w-auto p-1'>
<label>نوع العمل</label>
<input value={typeWork} onChange={(e)=>setTypeWork(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>
<div className='flex flex-col  w-auto p-1'>
<label>خارج قوة العمل</label>
<input value={outWork} onChange={(e)=>setOutWork(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>

<div className='flex flex-col  w-auto p-1'>
<label>الحالة الاجتماعية</label>
<input value={marridStatus} onChange={(e)=>setMarridStatus(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>
<div className='flex flex-col  w-auto p-1'>
<label>هل له تامين صحي</label>
<input value={healthInsure} onChange={(e)=>setHealthInsure(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>
<div className='flex flex-col  w-auto p-1'>
<label>هل علي دعم فني</label>
<input value={finSupport} onChange={(e)=>setFinSupport(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400'  />
</div>


       </div> 
       
     
       </div>
       </div>
 <div className='flex flex-row items-start gap-2 mt-2'>
 <button className='bg-green-800 p-1 rounded-sm text-white'onClick={()=>clickToNotes(id)} >ملاحظات</button>
 <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleUpdate()} >تعديل </button>
 <button className='bg-yellow-700 p-1 rounded-sm text-white' onClick={()=>print()}>طباعة </button>
 <button className={`bg-gray-400 p-1 rounded-sm text-black   ${ report?.data?.imp && 'bg-gray-800'} `} disabled={imp == true} onClick={()=>handleImp()}>تنفيذ البلاغ </button>

 </div>
                  </>
                )
              }

        
    </div>
   <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
      
   </>
  )
}

export default UpdateReport