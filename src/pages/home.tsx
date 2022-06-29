import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../components/Common/Navbar/NavBar';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

function Home() {

  const navigate = useNavigate();

  useAuthUser(GraphqlRoute, navigate);

  return (
    <>
      <HomeNavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex justify-center items-center'>
        
      </div>
    </>
  )
}

export default Home;