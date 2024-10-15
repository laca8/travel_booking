import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { addNote, fetchNotes } from '../../redux/slicers/notesReportSlicer'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../Spinner';

const AddNotes = ({id}) => {

const [text,setText] = useState('')
const dispatch = useDispatch()
   console.log(id);
   const notesReport = useSelector((state)=>state.noteReport)
   const {note,notes,error,loading} = notesReport
   const handleNote = () => {
   
    if(text != '' ){
   dispatch(addNote({note:text,reportId:id}))
       setNotify(toast.success('تم اضافة متابعة جديدة'))
       window.location.reload();
    }else{
      setNotify(toast.error('يجب عليك ادخال متابعة'))

    }
   //dispatch(fetchNotes(id))
}
const [notify,setNotify] = useState('')

useEffect(()=>{
  if(error){
    setNotify(toast.error(error))      
}
},[error])

  return (
    <div>
         <div className='flex flex-col p-3 text-right '>
         {
                loading && <Spinner/>
              }
            
            <label>المتابعة</label>
            <textarea id="message" rows="4" className="bg-gray-100  rounded-sm w-full border-2 border-gray-400"  value={text} onChange={(e)=>setText(e.target.value)}></textarea>
          </div>
        <div className='flex flex-row items-start gap-3 '>
       
        <button className='bg-green-800 p-2 rounded-sm text-white mr-3' onClick={()=>handleNote()}>اضف المتابعة </button>
      </div>

     <div>
        <p className='text-white'>{notify}</p>
          <ToastContainer position="top-right"/>
      </div>
      
    </div>
  )
}

export default AddNotes