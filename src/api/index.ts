import { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_ADMIN, API_USER } from "../utils";

API_ADMIN.interceptors.request.use((req: AxiosRequestConfig) => {
    const savedTokenAdmin = localStorage.getItem('adminAuth');
    if (savedTokenAdmin && req && req.headers) {
        req.headers.Authorization = savedTokenAdmin;
    }
    return req;
});

API_USER.interceptors.request.use((req: AxiosRequestConfig) => {
    const savedTokenUser = localStorage.getItem('userAuth');
    if (savedTokenUser && req && req.headers) {
        req.headers.Authorization = savedTokenUser;
    }
    return req;
});

export const graphqlApiAdmin = (GraphqlRoute: string, validateRequestBody: { query: string }): Promise<AxiosResponse> => {
    return API_ADMIN.post(GraphqlRoute, validateRequestBody);
}

export const graphqlApiUser = (GraphqlRoute: string, validateRequestBody: { query: string }): Promise<AxiosResponse> => {
    return API_USER.post(GraphqlRoute, validateRequestBody);
}