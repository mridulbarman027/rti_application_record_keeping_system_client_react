import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { graphqlApiPostUser } from '../api';
import { GraphqlRoute, userLogout } from '../utils';

function Home() {

  const navigate = useNavigate();

  const validateRequestBody = {
    query: `
      query {
        userVerifyToken(userId: "") {
          isVerified
        }
      }
    `
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('userAuth');
    
    if (savedToken && savedToken.length > 2) {

      graphqlApiPostUser(GraphqlRoute, validateRequestBody).then((res) => {
        const validatorData = res.data.data;
        const isVerified = validatorData.userVerifyToken.isVerified;
        if (!validatorData || !isVerified) {
          userLogout(navigate);
        }
      }).catch((error) => {
        userLogout(navigate);
      });

    } else {
      userLogout(navigate);
    }
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home;