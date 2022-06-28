import React from 'react'
import { Link } from 'react-router-dom';
import LoginSignupNavbar from '../components/Common/Navbar/LoginSignupNavbar';

function Login() {
  return (
    <>

      <LoginSignupNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        <form>

          <div className='flex flex-col mx-20 justify-center p-4 items-center border-[1px] border-slate-400 rounded-lg'>

            <div className='font-semibold text-lg text-blue-600 mb-4'>Login your account</div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Phone: </div>
              <input type='text' maxLength={10} name='asdas' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Password: </div>
              <input type='text' name='asdas' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <input className='border-[1px] mb-4 border-blue-800 bg-blue-600 hover:bg-blue-900 cursor-pointer text-white rounded-md pl-10 pr-10 pt-[4px] pb-[6px] flex items-center justify-center' type="submit" value='Login' />

            <Link to={`/signup`}>
              <div className='font-semibold text-sm text-red-400 mb-4 hover:underline'>Create new account</div>
            </Link>

          </div>

        </form>

      </div>



    </>
  )
}

export default Login;