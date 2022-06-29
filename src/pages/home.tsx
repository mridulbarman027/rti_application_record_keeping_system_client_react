import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../hooks';
import { GraphqlRoute } from '../utils';

function Home() {

  const navigate = useNavigate();

  useAuthUser(GraphqlRoute, navigate);

  return (
    <div>Home</div>
  )
}

export default Home;