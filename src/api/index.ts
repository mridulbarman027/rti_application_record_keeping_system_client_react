import { AxiosRequestConfig, AxiosResponse } from "axios";
import { API } from "../utils";

API.interceptors.request.use((req: AxiosRequestConfig) => {
    const savedToken = localStorage.getItem('auth');
    if (savedToken && req && req.headers) {
        req.headers.Authorization = savedToken;
    }
    return req;
});

export const adminVerifyToken = (GraphqlRoute: string, validateRequestBody: { query: string }): Promise<AxiosResponse> => {
    return API.post(GraphqlRoute, validateRequestBody);
}