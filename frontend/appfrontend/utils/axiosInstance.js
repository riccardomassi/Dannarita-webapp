import axios from 'axios';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

// Create an Axios instance with dynamic base URL
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/products/'
});

export default axiosInstance;