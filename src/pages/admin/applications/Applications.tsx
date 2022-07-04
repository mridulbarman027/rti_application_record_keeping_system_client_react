import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar';
import useAuthAdmin from '../../../hooks/useAuthAdmin';
import { GraphqlRoute } from '../../../utils';

const Applications = () => {

  const navigate = useNavigate();

  useAuthAdmin(GraphqlRoute, navigate);

  return (
    <>

      <AdminNavbar />

    </>
  )
}

export default Applications