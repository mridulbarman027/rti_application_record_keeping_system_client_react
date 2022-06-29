import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const baseUrl = 'http://localhost:3000';

export const GraphqlApi = baseUrl+ '/graphql';

export const GraphqlRoute = '/graphql';

export const API_ADMIN = axios.create({ baseURL: baseUrl });

export const API_USER = axios.create({ baseURL: baseUrl });

export const adminLogout = (navigate: NavigateFunction) => {
    localStorage.setItem('adminAuth', '');
    navigate('/admin/adminLogin');
}

export const userLogout = (navigate: NavigateFunction) => {
    localStorage.setItem('userAuth', '');
    navigate('/login');
}