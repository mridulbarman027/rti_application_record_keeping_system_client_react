import { LoadingOverlay, Modal } from '@mantine/core';
import React, { useState } from 'react'
import AdminNavbar from '../../components/Common/Navbar/AdminNavbar';

function AdminLogin() {

  const [visible, setVisible] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    if (!username && username.length < 4) {
      setModalTitle("Invalid username")
      setModalOpened(true);
      return;
    }

    if (!password && password.length < 6) {
      setModalTitle("Invalid password")
      setModalOpened(true);
      return;
    }

    console.log(username + " " + password);
    setVisible((v) => !v);
  }

  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>

      <AdminNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        <LoadingOverlay visible={visible} />

        <Modal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          title="Login alert"
        >
          <span>{modalTitle}</span>
        </Modal>

        <form onSubmit={submitLogin}>

          <div className='flex flex-col mx-20 justify-center p-4 items-center border-[1px] border-slate-400 rounded-lg'>

            <div className='font-semibold text-lg text-blue-600 mb-4'>Admin Login</div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Username: </div>
              <input type='text' maxLength={20} name='username' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Password: </div>
              <input type='password' name='password' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <input className='border-[1px] mb-4 border-blue-800 bg-blue-600 hover:bg-blue-900 cursor-pointer text-white rounded-md pl-10 pr-10 pt-[4px] pb-[6px] flex items-center justify-center' type="submit" value='Login' />

          </div>

        </form>

      </div>

    </div>
  )
}

export default AdminLogin;