import { useEffect } from 'react'
import { NavigateFunction } from 'react-router-dom';
import { graphqlApiAdmin } from '../api';
import { adminLogout } from '../utils';

const useAuthAdmin = (GraphqlRoute: string, navigate: NavigateFunction) => {
    const savedToken = localStorage.getItem('adminAuth');

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

        if (savedToken && savedToken.length > 2) {

            graphqlApiAdmin(GraphqlRoute, validateRequestBody).then((res) => {
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
}

export default useAuthAdmin;