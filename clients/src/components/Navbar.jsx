import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';


import {logout,reset} from '../redux/slicers/authSlice'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const [light,setLight] = useState(false)
  const handleLight = ()=>{
    setLight(!light)
  }
  //const navigator = useNavigate()
    
    const [selectedValue, setSelectedValue] = useState(false); 
    const handleChange = (event) => {
        setSelectedValue(!selectedValue)
     };
     const usersDetails = useSelector((state)=> state.users)
     const {user} = usersDetails
     const dispatch = useDispatch()
     const handleLogout = ()=>{
        console.log('logout');
        dispatch(logout())
        dispatch(reset())
        window.location.href ='/'

//navigator('/')
        
     }
     const closeMenuOnMobile = () => {
     
    }
    useEffect(()=>{
      if (window.innerWidth > 768 ) {
        setLight(true);
      }
    },[light,window.innerWidth])
    
  return (
    <nav className='relative w-full h-full bg-gray-400 shadow-sm shadow-black' >

     <div onClick={()=>handleLight()} className={` hidden p-2 text-white text-3xl mr-2 mt-1 ` }>
     <i className="fa fa-list"></i>

     </div>
    <div className={`container  flex flex-row justify-between   `}>
        <div className=' flex flex-row gap-8'>
            <div className=''>
                <a href='/'>
               <img className='w-12 h-12'  src='https://hrightsstudies.sis.gov.eg/media/1387/%D8%B0%D9%88%D9%8A-%D8%A7%D9%84%D8%A7%D8%B9%D8%A7%D9%82%D8%A9.png' />
                </a>
            </div>
            <ul className='flex flex-row  items-center gap-5 cursor-pointer '>
                <li className='relative'>
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={()=>{handleChange()}} className="w-28" type="button">ادارة الخدمات  {' '}<i className="fa fa-caret-down"></i></button>

<div  className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44  ${selectedValue ? 'visible' : 'invisible'} `}>
    <ul className="p-1 text-sm text-gray-900 " aria-labelledby="dropdownDefaultButton">
      <li onClick={()=>{handleChange()}}>
        <a href="/dis" className="block p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">تسجيل خدمات</a>
      </li>
      <li onClick={()=>{handleChange()}}>
        <a href="/suggDis" className="block p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">تسجيل استفسارات</a>
      </li>
    </ul>
</div>
                </li>
                {
                user?.data &&      
                <>
            <li className='hover:border-b-2 border-black'>
                <a href='/reports'>البلاغات</a>
            </li>
            {/* <li className='hover:border-b-2 border-black'>
                <a>ادارة البلاغات</a>
            </li> */}
            <li className='hover:border-b-2 border-black'>
                <a href='/suggList'>الاستعلامات</a>
            </li>
            </>
            }
            {
              user?.data?.isAdmin == "true" && (
                <li className='hover:border-b-2 border-black'>
                <a href='/admin'>الادمن</a>
            </li>
              )
            }
            </ul>
    </div>
    <div className='mt-1 ml-3 text-white'>
      {
                user?.data ?
                <button className='bg-red-700 p-2 text-white rounded-sm' onClick={()=> handleLogout()}>تسجيل الخروج</button>
                :  
      <button className='bg-blue-950 p-2 rounded-sm hover:scale-95' ><a href='/login'>تسجيل الدخول</a></button>

      }
    </div>
    </div>
 </nav>
  )
}

export default Navbar