import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { graphqlApiUser } from "../api";
import { userLogout } from "../utils";

export const useAuthUser = (GraphqlRoute: string, navigate: NavigateFunction) => {

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

  useEffect(() => {

    if (savedToken && savedToken.length > 2) {

      graphqlApiUser(GraphqlRoute, validateRequestBody).then((res) => {
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
}