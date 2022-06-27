import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const baseUrl = 'http://localhost:3000';

export const GraphqlApi = baseUrl+ '/graphql';

export const GraphqlRoute = '/graphql';

export const API = axios.create({ baseURL: baseUrl });

export const adminLogout = (navigate: NavigateFunction) => {
    localStorage.setItem('auth', '');
    navigate('/admin/adminLogin');
}