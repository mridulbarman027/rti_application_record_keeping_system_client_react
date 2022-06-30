import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../components/Common/Navbar/NavBar';
import Card from '../components/Home/Card';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

function Home() {

  const navigate = useNavigate();

  useAuthUser(GraphqlRoute, navigate);

  return (
    <>
      <HomeNavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='w-full flex justify-between mt-6 items-start'>

          {/* <Card cardValue= />

          <Card />

          <Card /> */}

        </div>

        <div className='mt-64'>
        <button className='border-[1] px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700'>New Application</button>
        </div>
        
      </div>
    </>
  )
}

export default Home;