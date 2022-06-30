import { LoadingOverlay, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginSignupNavbar from '../components/Common/Navbar/LoginSignupNavbar';
import { GraphqlApi } from '../utils';

const Signup = () => {

  const [visible, setVisible] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useNavigate();

  const submitSignup = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      password: { value: string };
      address: { value: string };
    };
    const name = target.name.value;
    const email = target.email.value;
    const phone = target.phone.value;
    const password = target.password.value;
    const address = target.address.value;

    if (!name || name.length < 4) {
      setModalTitle("Name length should be more than 4 characters")
      setModalOpened(true);
      return;
    }

    if (!email || email.length < 6) {
      setModalTitle("Invalid Email")
      setModalOpened(true);
      return;
    }

    if (!phone || phone.length !== 10) {
      setModalTitle("Invalid Phone")
      setModalOpened(true);
      return;
    }

    if (!password || password.length < 4) {
      setModalTitle("Invalid Password")
      setModalOpened(true);
      return;
    }

    if (!address || address.length < 4) {
      setModalTitle("Address length should be more than 4 characters")
      setModalOpened(true);
      return;
    }

    setVisible((v) => !v);

    const requestBody = {
      query: `
        mutation {
          userSignup(userSignupInput: {user_name: "${name}", user_email: "${email}", user_phone: "${phone}", user_password: "${password}", user_address: "${address}"}) {
            status
          }
        }
      `
    }

    axios.post(GraphqlApi, requestBody).then((res) => {
      setVisible(false);

      const result = res.data;
      const userData = result as { userSignup: { 'status': string } };
      const errors = result.errors;
      if (userData && !errors) {
        showNotification({
          title: 'Signup Successfull',
          message: 'User created successfully. Now you can login',
          autoClose: 2000,
        })
        navigate('./login');
      } else {
        setVisible(false);
        setModalTitle('User with email: ' + email + ' already exists. Try using different email.');
        setModalOpened(true);
      }
    }).catch(error => {
      setVisible(false);
      setModalTitle('Something went wrong');
      setModalOpened(true);
    });

  }

  return (
    <>

      <LoginSignupNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        <form onSubmit={submitSignup}>

          <div className='flex flex-col mx-20 justify-center p-4 items-center border-[1px] border-slate-400 rounded-lg'>

            <div className='font-semibold text-lg text-blue-600 mb-4'>Create your account</div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Name: </div>
              <input type='text' name='name' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Email: </div>
              <input type='email' name='email' autoComplete='off' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Phone: </div>
              <input type='text' maxLength={10} name='phone' autoComplete='off' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Password: </div>
              <input type='password' name='password' autoComplete='new-password' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Address: </div>
              <textarea name="address" className='w-60 p-1 border-[1px] text-base ml-2'></textarea>
            </div>

            <input className='border-[1px] mb-4 border-blue-800 bg-blue-600 hover:bg-blue-900 cursor-pointer text-white rounded-md pl-10 pr-10 pt-[4px] pb-[6px] flex items-center justify-center' type="submit" value='Signup' />

            <Link to={`/login`}>
              <div className='font-semibold text-sm text-blue-400 mb-4 hover:underline'>Go to login page</div>
            </Link>

          </div>

        </form>

      </div>

      <LoadingOverlay visible={visible} />

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Login alert"
      >
        <span className='text-lg font-bold text-red-500'>{modalTitle}</span>
      </Modal>

    </>
  )
}

export default Signup;