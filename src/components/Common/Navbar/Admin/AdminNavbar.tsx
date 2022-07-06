import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavbar() {
  return (
    <div className='bg-[#ccc] h-28 w-full flex items-center'>

      <Link to={'/admin'}>
        <div className='font-bold text-3xl mx-10 '>RTI APPLICATION RECORD KEEPING SYSTEM ADMIN</div>
      </Link>

    </div>
  )
}

export default AdminNavbar