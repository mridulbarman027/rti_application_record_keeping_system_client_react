import React from 'react'
import AdminNavbar from '../../components/Common/Navbar/AdminNavbar';

function AdminHome() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        Admin Home

      </div>



    </div>
  )
}

export default AdminHome;