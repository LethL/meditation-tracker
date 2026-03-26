import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api';
export const API_ROUTES = {
  MEDITATIONS: `${BASE_URL}/meditations`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  PROFILE: `${BASE_URL}/profile`,
  STATS: `${BASE_URL}/stats`,
};

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
