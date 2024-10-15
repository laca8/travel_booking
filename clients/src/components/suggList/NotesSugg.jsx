import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { addNote, fetchNotes } from '../../redux/slicers/noteSuggSlice'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner';

const AddNotesSugg = () => {
  const {id} = useParams()
  const [text,setText] = useState('')
  const notesSuggDetails = useSelector((state)=>state.noteSugg)
  const {notes,error,loading,note} = notesSuggDetails
  const dispatch = useDispatch()
     useEffect(()=>{
      dispatch(fetchNotes(id))
  },[id])
     const handleNote = () => {      
    if(text != '' ){
      dispatch(addNote({note:text,suggId:id}))
          setNotify(toast.success('تم اضافة متابعة جديدة'))
          window.location.reload();
       }else{
         setNotify(toast.error('يجب عليك ادخال متابعة'))
       }
  }
  const [notify,setNotify] = useState('')

  useEffect(()=>{
    if(error){
setNotify(toast.error(error))      
  }
  },[error])
  return (
    <div className='container'>
       {
        error && <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
      }
    <div className='flex flex-col p-3 text-right '>
    {
           loading && <Spinner/>
         }
          <div className='flex flex-row items-center justify-center text-center mt-10 mb-1'>
        <h1 className='text-center text-5xl font-bold mb-4'>متابعة الاستعلام</h1>

    </div>
       <label>المتابعة</label>
       <textarea id="message" rows="4" className="bg-gray-100  rounded-sm w-full border-2 border-gray-400"  value={text} onChange={(e)=>setText(e.target.value)}></textarea>
     </div>
   <div className='flex flex-row items-start gap-3 '>
  
   <button className='bg-green-800 p-2 rounded-sm text-white mr-3' onClick={()=>handleNote()}>اضف المتابعة </button>
 </div>
 <div className=" w-full h-60 overflow-y-auto flex flex-col flex-grow bg-purple-50 mr-3 mt-3 rounded-sm">
              {
                notes?.data?.length != 0 ? (
                  notes?.data?.map((x,i)=>(
                 
                  <div key={i} className='border-2  border-gray-400  w-full mb-2'>
        <h3 className='bg-gray-400 p-1'>المتابعة رقم[{i+1}]</h3>
        <p>{x?.note}</p>
        <p className='bg-gray-200 p-1'>تاريخ المتابعة : {new Date(x?.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
    </div>
            
                  ))
                ) : (
                  <div className='border-2  border-gray-400  w-full mb-2'>
        <h3 className='bg-gray-400 p-1'>لا يوجد اي متابعات سابقة</h3>
       
    </div>
                )
              }
    </div>
</div>
  )
}

export default AddNotesSugg