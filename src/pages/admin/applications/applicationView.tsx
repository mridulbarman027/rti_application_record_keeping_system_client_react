import React from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar'

function ApplicationView() {

  const params = useParams();
  const applicationId = params.applicationId;

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        View Application {applicationId}

      </div>

    </div>
  )
}

export default ApplicationView