import React,{useState,useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addSugg } from '../../redux/slicers/suggSlice'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner';

const SuggForm = () => {
  const navigator = useNavigate()
  const [notify,setNotify] = useState('')

  const [suggReport,setSuggReport] = useState('')
  const [suggSide,setSuggSide] = useState('')
  const [suggType,setSuggType] = useState('استعلام/استفسار')
  const connector = JSON.parse(localStorage.getItem('connector'))
const dispatch = useDispatch()

  const handleSubmitSugg = ()=>{
    const disabl ={
     connName:connector.connName,
     connCity:connector.connCity,
     connId:connector.connId,
     connJop:connector.connJop,
     connPhone:connector.connPhone,
     connPlace:connector.connPlace,
     connRelation:connector.connRelation,
     connType:connector.connType,
     side:connector.side,
     nameUser:connector.nameUser,
     communicationSugg:connector.communicationReport,
    connAge:connector.connAge,
    connShiek:connector.connShiek,
     report:suggReport,
       suggType,
      suggSide,
    }
    console.log(disabl);
    
    if(suggSide != '' ){
      dispatch(addSugg(disabl))
     localStorage.removeItem('connector')

        navigator('/reports')
       setNotify(toast.success('تم اضافة استعلام جديد'))
    }else{
      setNotify(toast.error('يجب عليك استكمال جميع البيانات'))

    }
  }
  const suggDetails = useSelector((state)=>state.suggestion)
  const {error,loading,sugg,success} = suggDetails
  useEffect(()=>{
    if(error){
setNotify(toast.error(error))      
  }
  },[error])
  return (
    <div className='mt-10 font-bold'>
       <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
{
                loading && <Spinner/>
              }
         
        <div className='border-2 border-gray-400'> 
          <p className='bg-gray-100 p-1 text-center'>  بيانات الاستعلام </p>

         <div className='grid grid-cols-2 justify-evenly  max-sm:grid-cols-1  text-right p-1 w-full'>
         <div className='flex flex-col w-full p-2'>
            <label>النوع<span className='text-red-700'>*</span></label>
            <select value={'استعلام/استفسار'} onChange={(e)=>setSuggType(e.target.value)} id="countries" className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400" disabled>
              <option selected>{suggType}</option>
            </select>
          </div>
          <div className='flex flex-col w-auto p-2'>
          <label>جهة الاستفسار<span className='text-red-700'>*</span></label>
            <select id="countries" value={suggSide} onChange={(e)=>setSuggSide(e.target.value)} className="bg-gray-100 p-1 rounded-sm border-2 border-gray-400"  >
            <option value="" selected disabled hidden>اختر</option>

              <option >استفسار اعاقه حركية</option>
              <option >استفسار اعاقه سمعية</option>
              <option >استفسار اعاقه بصرية</option>
              <option >استفسار اعاقه ذهنية</option>
              <option >استفسار اعاقه متعددة</option>
          
            </select>
          </div>
        
          
         
         </div>
         <div className='flex flex-col p-3 text-right '>
            <label>ملخص الطلب</label>
            <textarea id="message" rows="4" className="bg-gray-100  rounded-sm w-full border-2 border-gray-400" value={suggReport} onChange={(e)=>setSuggReport(e.target.value)} ></textarea>
          </div>
        </div>
        <div className='flex flex-row items-start gap-3 mt-2'>
       
        <button className='bg-blue-950 p-1 rounded-sm text-white' onClick={()=>handleSubmitSugg()}>انهاء </button>
      </div>
        
        
    </div>
  )
}

export default SuggForm