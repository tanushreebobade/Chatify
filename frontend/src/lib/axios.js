import axios from 'axios';

const devDefault = 'http://localhost:3000/api';
const prodDefault = '/api';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    (import.meta.env.MODE === 'development' ? devDefault : prodDefault),
  withCredentials: true
});