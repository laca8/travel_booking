import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';

const CityPlace = () => {

    const [notify,setNotify] = useState('')
    const [city,setCity] = useState('')
    const [place,setPlace] = useState('')
    const [shiek,setShiek] = useState([''])
    const [data,setData] = useState([])
    const [edit,setEdit] = useState(false)
    const [d1,setD1] = useState(false)
    const [d2,setD2] = useState(false)
    const [c1,setC1] = useState('')
    const [c2,setC2] = useState('')
    const [c3,setC3] = useState([])
    const [search1,setSearch1] = useState('')
    const [search2,setSearch2] = useState('')
        const API_URL = 'http://localhost:5000/api/city' 
   
    const handleD1=()=>{
        setD1(!d1)
    }
    const handleD2=()=>{
        setD2(!d2)
    }
    const handleAdd = async()=>{
        const title = {
            city,
            place,
            shiek
        }
        console.log(title);
        
        if(city == '' || place == '' || shiek==[]){
         setNotify(toast.error('يجب عليك استكمال جميع البيانات'))
         setD1(false)
        }else{
         const res = await axios.post(API_URL,{city,place,shiek})
         setCity('')
         setPlace('')
         setShiek([])
         setD1(false)
         setD2(false)
         console.log(res)
         setNotify(toast.success('تم اضافة المحافظة'))

        }
    }

    useEffect(()=>{
        const fetchData = async()=>{
            
            const res = await axios.get(API_URL)
          
            setData(res?.data?.data)
            if(search1 != '' && search2 == ''){
            setData(res?.data?.data?.filter((x)=> x.city == search1))
                 
            }else if(search2 != '' && search1 == ''){
            setData(res?.data?.data?.filter((x)=> x.place == search2))

            }else if(search1 != '' && search2 != ''){
                setData(res?.data?.data?.filter((x)=>x.city == search1 && x.place == search2))
            }else{
            setData(res?.data?.data)

            }
        }
        fetchData()
       },[city,shiek,place,notify,search1,search2])
       const handleDelete = async(id)=>{
           try {
           const res = await axios.delete(`${API_URL}/${id}`)
           if(res?.data){
               setNotify(toast.success('تم حذف البيانات'))
               setCity(null)
               setPlace(null)
               setShiek(null)
           }
               
           } catch (error) {
           setNotify(toast.error(error?.response?.data?.message))
               
           }
       }
const handleEdit = async(id)=>{
    setEdit(!edit)
    try {
        const res = await axios.get(`${API_URL}/${id}`)
       // setD(res?.data?.data)
       console.log(res);
       
        setC1(res?.data?.data?.city)
        setC2(res?.data?.data?.place)
        setC3(res?.data?.data?.shiek)
            
        } catch (error) {
        setNotify(toast.error(error?.response?.data?.message))
            
        }

}
const handleRemove = (i)=>{
    console.log(i);
    //shiek.filter((item,index) => index !== i)
    //setShiek(shiek.splice(i,1))
    if(i == 0){
        console.log(i);
        
    }else{
        setShiek(shiek.filter((o, index) => index !== i))

    }

}
const addInput = () => {
    setShiek(shiek.concat(""));
  };

  const changeInput = (index, value) => {
    const updated = [...shiek];
    updated[index] = value;
    setShiek(updated);
  };
  return (
    <div className=' container flex flex-col  p-2 '>
           <div>
    <span className='text-white'>{notify}</span>
	    <ToastContainer position="top-right"/>
  </div>
  <div className='flex flex-row justify-between'>
    <h1 className='p-2  rounded-sm text-gray-400 font-bold mb-2'>المحافظة</h1>
    <button  className='bg-gray-400 p-1 text-white' onClick={()=>handleD1()}>اضافة</button>
    </div>

    <div className='flex flex-row gap-2 p-1'>
        <input className='p-1 border-2'  type='text' value={search1} onChange={(e)=>setSearch1(e.target.value)} placeholder='المحافظة'  />
        <input className='p-1 border-2' type='text' value={search2} onChange={(e)=>setSearch2(e.target.value)}  placeholder='المركز'/>
        
    </div>
      
   {
    d1 ?
    <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => d1(false)}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
          <div className='flex flex-col mt-2 gap-4'>
    <input value={city} onChange={(e)=>setCity(e.target.value)} type='text' placeholder='اضافة محافظة' className='border-2 border-gray-400 p-1 w-full'/>
    <input value={place} onChange={(e)=>setPlace(e.target.value)} type='text' placeholder='اضافة قسم/مركز' className='border-2 border-gray-400 p-1 w-full'/>
    <div className='flex flex-col h-80 overflow-y-auto'>
    {
                    shiek?.map((x,i)=>(
                        <div key={i} className='flex flex-row m-1'>
           
                <input value={x} onChange={(e) => changeInput(i, e.target.value)}  type='text' placeholder='شياخة' className='border-2 border-gray-400  w-full' />

                <button className='bg-red-500 p-1 m-1 cursor-pointer'  onClick={()=>handleRemove(i)}>X</button>
        <button disabled={!shiek} className='bg-yellow-400  p-1 text-black m-1 h-10' onClick={()=>addInput()}>+</button>


</div>


                    ))
                 }
                </div>

                          
    </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setD1(false)}
            >
              Close
            </button>
        <button disabled={!shiek} className='bg-gray-400 p-1 text-white ' onClick={()=>handleAdd()}>اضافة</button>

          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  
    </>
    :null
   }
    
    <div className='grid grid-cols-3 gap-1 font-bold   h-96 overflow-y-auto'>

   
    {
        data?.map((x,i)=>(
      
            <div key={i} className='p-1 col-span-1 h-auto   bg-gray-400 text-black text-sm mt-1 rounded-md shadow-md'>
                <div className=''>
                <input disabled className='p-1' value={`المحافظة : ${x?.city}`}  type='text'/>
                 
               { edit &&(
              <div className='bg bg-gray-400   mt-1'>
                <input disabled className='p-1 mb-1' value={`المركز/القسم : ${x?.place}`}  type='text'/>
                <p>الشياخات : </p>
                <div className='m-2 flex flex-row flex-wrap'>
                
               {
                x?.shiek && x?.shiek?.map((y,i)=>(
                   
                    <span key={i}  className=' bg-gray-200 text-black p-1 rounded-md m-1'>{y}</span>
                ))
               }
                </div>

              </div>  
            )
        }
                </div>
                <div className='mt-1'>


                <button className='p-1 bg-red-500 ml-2' onClick={()=>handleDelete(x?._id)}>حذف</button>
                <button className='p-1 bg-green-500' onClick={()=>handleEdit(x?._id)}>تفاصيل</button>
                </div>

            </div>   
        ))
        
     
        
    }
    

</div>
</div>
  )
}

export default CityPlace