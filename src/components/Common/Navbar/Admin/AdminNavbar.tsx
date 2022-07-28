import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { graphqlApiAdmin } from '../../../../api';
import { adminLogout, GraphqlRoute } from '../../../../utils';

const AdminNavbar = () => {

  const validateRequestBody = {
    query: `
        query {
            adminVerifyToken(adminId: "") {
            isVerified
            }
        }
      `
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    graphqlApiAdmin(GraphqlRoute, validateRequestBody).then((res) => {
      const validatorData = res.data.data;
      const isVerified = validatorData.adminVerifyToken.isVerified;
      if (validatorData && isVerified) {
        setIsLoggedIn(true);
      }
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  const navigate = useNavigate();

  const logout = () => {
    adminLogout(navigate);
  }

  return (
    <div className='bg-[#ccc] h-28 w-full flex items-center sticky top-0 z-50 justify-between'>

      <Link to={'/admin'}>
        <div className='font-bold text-3xl mx-10 '>RTI APPLICATION RECORD KEEPING SYSTEM ADMIN</div>
      </Link>

      {
        isLoggedIn ? (
          <div onClick={logout} className='font-semibold text-red-500 mx-10 cursor-pointer hover:underline'>Log Out</div>
        ) : null
      }

    </div>
  )
}

export default AdminNavbar