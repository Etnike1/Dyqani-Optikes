import axios from 'axios';


// This is the address where your Spring Boot backend is running
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// This interceptor automatically attaches the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;