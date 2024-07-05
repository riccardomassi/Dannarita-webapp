import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Define a function to get the base URL dynamically
const getBaseUrl = () => {
  // Default base URL (fallback in case NEXT_PUBLIC_API_BASE_URL is not available)
  let baseUrl = 'http://localhost:8000';  // Adjust with your default local Django server URL

  // Check if NEXT_PUBLIC_API_BASE_URL is available in process.env
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  return `${baseUrl}/products/`;
};

// Create an Axios instance with dynamic base URL
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

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
