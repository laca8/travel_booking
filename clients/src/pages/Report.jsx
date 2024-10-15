import React from 'react'
import ReportForm from '../components/forms/ReportForm'

const Report = () => {
  return (
    <div className='container'>
    <div className='flex flex-row items-center justify-center text-center mt-2 '>
        <h1 className='text-center text-5xl font-bold'>بلاغات</h1>

    </div>
    <ReportForm/>


</div>
  )
}

export default Report