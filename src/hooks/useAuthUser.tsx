import { useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { graphqlApiPostUser } from "../api";
import { userLogout } from "../utils";

export const useAuthUser = (GraphqlRoute: string, navigate: NavigateFunction) => {

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
}