import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Create an Axios instance with dynamic base URL
const axiosInstance = axios.create({
  baseURL: 'https://dannarita-backend.serveo.net/products/',
  // Change the baseURL if you are using a local Django server
  // baseURL: 'http://127.0.0.1:8000/products/'
});

// Add a request interceptor to include CSRF token in requests
axiosInstance.interceptors.request.use(
  config => {
    const csrfToken = Cookies.get('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;