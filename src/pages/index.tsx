import React from 'react'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <Outlet />
    </div>
  )
}

export default Index