import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20 gap-6 text-xl'>
    <h1><span className='font-bold text-5xl bg-gray-400 p-2 rounded-sm'>404</span> - Page Not Found</h1>
    <p>We can`t seem to find the page you`re looking for.</p>
    <a href="/" className='bg-gray-400 text-black p-2 rounded-sm hover:scale-95'>Go back home</a>
  </div>
  )
}

export default NotFound