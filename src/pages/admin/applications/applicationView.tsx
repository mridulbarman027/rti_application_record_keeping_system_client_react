import React from 'react'
import AdminNavbar from '../../../components/Common/Navbar/AdminNavbar'

function ApplicationView() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        View Application

      </div>

    </div>
  )
}

export default ApplicationView