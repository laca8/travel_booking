import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchReports} from '../../redux/slicers/reportSlice'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from '../Spinner'
import { ToastContainer, toast } from 'react-toastify';

const ListsReports = () => {
    const navigator = useNavigate()
   
    const clickToShow = (id)=>{
        navigator(`/show-report/${id}`)
    }
    const report = useSelector((state)=> state.report)

    const {error,loading,reports} = report
    const [notify,setNotify] = useState('')

useEffect(()=>{
  if(error){
    setNotify(toast.error(error))      
}
},[error])
  return (
<div className="w-full h-72 overflow-y-auto flex flex-col flex-grow shadow-md sm:rounded-lg font-bold ">
{
                loading && <Spinner/>
              }
             <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
  {
    reports?.data?.length == 0 ? 
    <p className='bg-gray-400 text-right p-1 text-white rounded-sm mt-2 mb-2'>لا يوجد بيانات تتماشي مع عملية البحث حاول مرة اخري</p>
     : (
        <table className="w-full text-sm text-right text-gray-500  mt-10 bg-blue-900 border-2 border-gray-400">
        <thead className="text-xs text-black uppercase  bg-gray-400 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                 رقم البلاغ
                </th>
                <th scope="col" className="px-6 py-3">
                    اسم المتصل
                </th>
                <th scope="col" className="px-6 py-3">
                    رقم التليفون
                </th>
                <th scope="col" className="px-6 py-3">
                    تاريخ المكالمة
                </th>
                <th scope="col" className="px-6 py-3">
                   #
                </th>
            </tr>
        </thead>
        <tbody className='bg-zinc-100 text-gray-700 '>
            
            {
                reports?.data && reports?.data?.map((x,i)=>(
                    <tr key={i} className=" border-b  hover:bg-gray-700 hover:text-zinc-100">
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                {x?.numReport}
                </th>
                <td className="px-6 py-4">
              {x?.connName}
                </td>
                <td className="px-6 py-4">
                 {x?.connPhone}
                </td>
                <td className="px-6 py-4">
                {x?.createdAt}
                </td>
                <td className="px-6 py-4 text-right ">
                   
                    <button  className="font-medium text-white bg-blue-900 p-1 m-1" onClick={()=>{clickToShow(x?._id)}}>عرض</button>
                </td>

            </tr>
                ))
            }
            
        </tbody>
    </table>
    )
  }
</div>

  )
}

export default ListsReports