import React,{useState} from 'react'
import Register from './Register'
import StatusWork from '../components/admin/StatusWork'
import TypeWork from '../components/admin/TypeWork'
import CityPlace from '../components/admin/CityPlace'
import OutWork from '../components/admin/OutWork'
import LevelWork from '../components/admin/LevelWork'
import MarridStatus from '../components/admin/MarridStatus'
import Disable from '../components/admin/Disable'
const Admin = () => {
    const [a,setA] = useState(true)
    const [b,setB] = useState(false)
    const [c,setC] = useState(false)
    const [d,setD] = useState(false)
    const [e,setE] = useState(false)
    const [f,setF] = useState(false)
    const [g,setG] = useState(false)
    const [h,setH] = useState(false)
    const clickA = ()=>{
        setA(true)
        setB(false)
        setD(false)
        setC(false)
        setE(false)
        setF(false)
        setG(false)
    }
    const clickB = ()=>{
        setA(false)
        setB(true)
        setD(false)
        setC(false)
        setE(false)
        setF(false)
        setG(false)
    }
    const clickC = ()=>{
        setA(false)
        setB(false)
        setC(true)
        setD(false)
        setE(false)
        setF(false)
        setG(false)
    }
    const clickD = ()=>{
        setA(false)
        setB(false)
        setD(true)
        setC(false)
        setE(false)
        setF(false)
        setG(false)
    }
    const clickE = ()=>{
        setA(false)
        setB(false)
        setD(false)
        setC(false)
        setE(true)
        setF(false)
        setG(false)
    }
    const clickF = ()=>{
        setA(false)
        setB(false)
        setD(false)
        setC(false)
        setE(false)
        setF(true)
        setG(false)
    }
    const clickG = ()=>{
        setA(false)
        setB(false)
        setD(false)
        setC(false)
        setE(false)
        setF(false)
        setG(true)
    }
    const clickH = ()=>{
        setA(false)
        setB(false)
        setD(false)
        setC(false)
        setE(false)
        setF(false)
        setG(false)
        setH(true)
    }

  return (
    <div className=' bg-gray-400 w-full h-screen'>

    
    <div className='container '>
        
        <div className='h-full grid grid-cols-4 '>
        <div className=' h-full'>
   
    <div className="p-5 text-center text-gray-black  border-4 border-white shadow-md mt-10  ">

      <a href="#" className='mb-1 font-bold text-xl'><strong><i className="glyphicon glyphicon-briefcase"></i> Admin Panel</strong></a>
      <hr className='mb-5 mt-1'/>
      
      <ul className="flex flex-col gap-5 items-center text-xl">
      <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickA()} >اضافة مستخدم جديد</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickB()}>الحالة التعليمية</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer  " onClick={()=>clickC()}>المستوي التعليمي</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickD()}>نوع العمل</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer  " onClick={()=>clickE()}>خارج قوة العمل</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickF()}>الحالة الاجتماعية</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickG()}>المحافظة</li>
        <li className="hover:text-gray-400 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer " onClick={()=>clickH()}>الاعاقات</li>
        
      </ul>
        </div>
        </div>
        <div className='w-full col-span-3 mt-10  bg-white text-xl'>
            <div className='w-full '>

            {
                a ? <Register/> : b ?  <StatusWork/> : c?<LevelWork/> : d ? <TypeWork/> : e ? <OutWork/> : f ? <MarridStatus/> : g ? <CityPlace/> : h?<Disable/> : null 
            }
       </div>
        </div>
        </div>
     
    </div>
    </div>
  )
}

export default Admin