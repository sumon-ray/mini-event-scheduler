import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mini-scheduler-backend.vercel.app/api', 
});

export default api;
