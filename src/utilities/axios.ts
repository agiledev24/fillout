import axios from 'axios';
import { API_BASE_URL, API_KEY } from './secrets';

const axiosInstance = axios.create({ baseURL: API_BASE_URL, timeout: 30000 });

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;

export default axiosInstance;