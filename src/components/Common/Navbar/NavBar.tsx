import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { graphqlApiUser } from '../../../api';
import { GraphqlRoute, userLogout } from '../../../utils';

const NavBar = () => {

    const savedToken = localStorage.getItem('userAuth');

    const validateRequestBody = {
        query: `
            query {
                userVerifyToken(token: "${savedToken}") {
                    isVerified
                  }
            }
          `
      }
    
      const [isLoggedIn, setIsLoggedIn] = useState(false);
    
      useEffect(() => {
    
        graphqlApiUser(GraphqlRoute, validateRequestBody).then((res) => {
          const validatorData = res.data.data;
          const isVerified = validatorData.userVerifyToken.isVerified;
          if (validatorData && isVerified) {
            setIsLoggedIn(true);
          }
        }).catch((error) => {
          console.log(error);
        });
    
      }, []);
    
      const navigate = useNavigate();
    
      const logout = () => {
        userLogout(navigate);
      }

    return (
        <div className='bg-[#ccc] h-28 w-full flex items-center sticky top-0 z-50 justify-between'>

            <Link to={'/'}>
                <div className='font-bold text-3xl mx-10 '>RTI APPLICATION RECORD KEEPING SYSTEM</div>
            </Link>

            {
                isLoggedIn ? (
                    <div onClick={logout} className='font-semibold text-red-500 mx-10 cursor-pointer hover:underline'>Logo Out</div>
                ) : null
            }

        </div>
    )
}

export default NavBar