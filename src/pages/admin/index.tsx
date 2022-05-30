import React from 'react'
import { Outlet } from 'react-router-dom';

function AdminIndex() {
  return (
    <>
      <Outlet />
    </>
  )
}

export default AdminIndex;