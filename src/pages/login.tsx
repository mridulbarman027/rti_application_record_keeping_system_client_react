import { LoadingOverlay, Modal } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginSignupNavbar from '../components/Common/Navbar/LoginSignupNavbar';
import { GraphqlApi } from '../utils';

const Login = () => {

  const [visible, setVisible] = useState(false);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useNavigate();

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      user_email: { value: string };
      user_password: { value: string };
    };
    const user_email = target.user_email.value;
    const user_password = target.user_password.value;

    if (!user_email || user_email.length < 4) {
      setModalTitle("Invalid email")
      setModalOpened(true);
      return;
    }

    if (!user_password || user_password.length < 4) {
      setModalTitle("Invalid password")
      setModalOpened(true);
      return;
    }

    setVisible((v) => !v);

    const requestBody = {
      query: `
        query {
          userLogin(user_email: "${user_email}", user_password: "${user_password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    axios.post(GraphqlApi, requestBody).then((res) => {
      setVisible(false);
      if (res.status !== 200) {
        setModalTitle('Wrong password');
        setModalOpened(true);
        return;
      }
      const loginData = res.data.data.userLogin;
      const userId = loginData.userId;
      const token = loginData.token;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userAuth', token);

      navigate('/');

    }).catch(error => {
      setVisible(false);
      setModalTitle('Wrong password');
      setModalOpened(true);
    });

  }

  useEffect(() => {
    const savedToken = localStorage.getItem('userAuth');

    if (savedToken && savedToken.length > 2) {
      navigate('/');
      return;
    }
  }, []);

  return (
    <>

      <LoginSignupNavbar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>

        <form onSubmit={submitLogin}>

          <div className='flex flex-col mx-20 justify-center p-4 items-center border-[1px] border-slate-400 rounded-lg'>

            <div className='font-semibold text-lg text-blue-600 mb-4'>Login your account</div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Email: </div>
              <input type='email' maxLength={40} name='user_email' autoComplete='off' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <div className='w-full flex mb-4'>
              <div className='w-24 text-left flex items-center'>Password: </div>
              <input type='password' name='user_password' autoComplete='new-password' className='w-60 p-1 border-[1px] text-base ml-2' />
            </div>

            <input className='border-[1px] mb-4 border-blue-800 bg-blue-600 hover:bg-blue-900 cursor-pointer text-white rounded-md pl-10 pr-10 pt-[4px] pb-[6px] flex items-center justify-center' type="submit" value='Login' />

            <Link to={`/signup`}>
              <div className='font-semibold text-sm text-red-400 mb-4 hover:underline'>Create new account</div>
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

export default Login;