import React from 'react'
import {useNavigate} from 'react-router-dom'
import { fetchSuggs } from '../../redux/slicers/suggSlice'
import { useSelector,useDispatch } from 'react-redux'
const SearchSugg = ({connName,side,phone,numSugg,setConnName,setSide,setPhone,setNumSugg}) => {
  const dis2 = ['استفسارات اعاقه حركية','استفسارات اعاقه بصرية','استفسارات اعاقة ذهنية','استفسارات إعاقة متعددة','استفسارات إعاقة سمعية','استفسارات إعاقة عقلية','اخري']
  const dispatch = useDispatch()

  const handleSearch = ()=>{
    const keywords = {connName,side,phone,numSugg}
   
    console.log(keywords);
    
    dispatch(fetchSuggs(keywords))
    
  }
  return (
    <div className=' mt-10 font-bold'>
    <p className='font-bold text-center '> شاشة بحث الاستعلامات</p>
    <div className='border-2 border-gray-400'> 
     

     <div className='grid grid-cols-2 justify-evenly  max-sm:grid-cols-1 text-right p-3'>
     <div className='flex flex-col w-auto p-1'>
        <label>اسم المتصل</label>
        <input value={connName} onChange={(e)=>setConnName(e.target.value)} className='bg-gray-100 p-1 w-full rounded-sm border-2 border-gray-400' type='text' placeholder='ادخل اسم المتصل' />
      </div>
      <div className='flex flex-col  w-auto p-1'>
        <label>رقم التليفون </label>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='number' placeholder='ادخل رقم التليفون' />
      </div>
      <div className='flex flex-col  w-auto p-1'>
  
          <label>رقم الاستعلام</label>
        <input value={numSugg} onChange={(e)=>setNumSugg(e.target.value)} className='bg-gray-100 p-1 rounded-sm border-2 border-gray-400' type='number' placeholder='ادخل رقم الاستعلام' />
          
      </div>
      <div className='flex flex-col  w-auto p-1'>
          <label>جهة الاستعلام</label>
            <select id="countries" className="bg-gray-100 p-1 rounded-sm w-full border-2 border-gray-400"  value={side} onChange={(e)=>setSide(e.target.value)}>
            <option value="" selected disabled hidden>اختر</option>

            {dis2.map((x,i)=>(
                <option  key={i}>{x}</option>
              ))}
             
            </select>
          </div>
     </div>
    </div>
  <div className='flex flex-row items-start gap-3 mt-2'>
    <button className='bg-yellow-600 p-1 rounded-sm text-white'  onClick={()=>handleSearch()}>بحث</button>
  
  </div>
    
</div>
  )
}

export default SearchSugg