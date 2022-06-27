import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { adminVerifyToken } from '../../../api';
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
    const savedToken = localStorage.getItem('auth');
    if (savedToken && savedToken.length > 2) {

      adminVerifyToken(GraphqlRoute, validateRequestBody).then((res) => {
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
    <div>Applications</div>
  )
}

export default Applications