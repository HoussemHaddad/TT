import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5273/api',
});

// Attacher automatiquement le token à chaque requête si présent
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
