import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/Common/Navbar/NavBar';
import Card from '../components/Home/Card';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

const Home = () => {

  const navigate = useNavigate();

  useAuthUser(GraphqlRoute, navigate);

  return (
    <>
      <NavBar />

      <div className='h-full min-h-[calc(100vh-4rem)] flex flex-col justify-start items-center'>

        <div className='w-full flex justify-between mt-6 items-start'>

          <Link to={`/submission`}>
          <Card title='Submitted Applications' desc='View all the submitted applications' />
          </Link>

          <Link to={`/replies`}>
          <Card title='View Replies' desc='View the replies of submitted applications' />
          </Link>

        </div>

        <div className='mt-64'>
          <Link to={`/new`}>
          <button className='border-[1] px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700'>New Application</button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default Home;