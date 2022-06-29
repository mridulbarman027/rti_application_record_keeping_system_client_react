import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { graphqlApiPostAdmin } from '../../../api';
import AdminNavbar from '../../../components/Common/Navbar/Admin/AdminNavbar';
import { adminLogout, GraphqlRoute } from '../../../utils';

function Applications() {

  const navigate = useNavigate();

  const validateRequestBody = {
    query: `
      query {
        adminVerifyToken(adminId: "") {
          isVerified
        }
      }
    `
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('adminAuth');
    if (savedToken && savedToken.length > 2) {

      graphqlApiPostAdmin(GraphqlRoute, validateRequestBody).then((res) => {
        const validatorData = res.data.data;
        const isVerified = validatorData.adminVerifyToken.isVerified;
        if (!validatorData || !isVerified) {
          adminLogout(navigate);
        }
      }).catch((error) => {
        adminLogout(navigate);
      });

    } else {
      adminLogout(navigate);
    }
  }, []);

  return (
    <>

      <AdminNavbar />

    </>
  )
}

export default Applications