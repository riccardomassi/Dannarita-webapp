import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axiosInstance.defaults.xsrfCookieName = 'csrftoken';
axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';
axiosInstance.defaults.withCredentials = true;

// Function to get base URL dynamically
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/';
};

// Create an Axios instance with baseURL 
const axiosInstance = axios.create(
  { baseURL: getBaseUrl() }
);

// Add a request interceptor to include CSRF token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
