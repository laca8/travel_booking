import React,{useEffect} from 'react'
import AddNotes from '../components/notesReport/AddNotes'
import ListNotes from '../components/lists/ListNotes'
import {useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchNotes } from '../redux/slicers/notesReportSlicer'
const NotesReport = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  useEffect(()=>{
      dispatch(fetchNotes(id))
  },[id])
  return (
    <div className='container'>
    <div className='flex flex-row items-center justify-center text-center mt-10 mb-1'>
        <h1 className='text-center text-5xl font-bold mb-4'>متابعة البلاغ</h1>

    </div>
    <AddNotes id={id}/>
    <ListNotes/>
    
 


</div>
  )
}

export default NotesReport