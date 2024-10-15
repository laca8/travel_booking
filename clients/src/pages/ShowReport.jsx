import React, { useEffect,useState } from 'react'
import UpdateReport from '../components/forms/UpdateReport'
import {useParams} from 'react-router-dom'
import {fetchReport} from '../redux/slicers/reportSlice'
import { useSelector,useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner'
const ShowReport = () => {
const [notify,setNotify] = useState('')

  const dispatch = useDispatch()
  let { id } = useParams();
  const reportDetail = useSelector((state)=>state.report)
  const {error,loading,report} = reportDetail
  useEffect(()=>{
    console.log(report);
    
    if(!report?.data?.connName || report?.data?._id != id){

        dispatch(fetchReport(id))
    }
  },[id])

  useEffect(()=>{
    if(error){
      setNotify(toast.error(error))      
  }
  },[error])
  return (
    <div className='container'>
       {
                loading && <Spinner/>
              }
            
      <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
      
      
   
          {
            report?.data &&(
              <div className='flex flex-row justify-between mt-2 p-2 bg-gray-400 rounded-sm font-bold text-xl'>
                <p>رقم البلاغ: {report?.data?.numReport}</p>
                <p>التاريخ { new Date(report?.data?.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                
              </div>
            )
          }
        <UpdateReport id={id}/>
    </div>
  )
}

export default ShowReport