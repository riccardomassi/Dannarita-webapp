import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

let axiosInstance;
let currentBaseUrl = '';

// Function to create Axios instance with dynamic base URL
const createAxiosInstance = (baseUrl) => {
  return axios.create({
    baseURL: `${baseUrl}/products/`,
  });
};

// Function to get base URL dynamically
const getBaseUrl = () => {
  // Default base URL (fallback in case NEXT_PUBLIC_API_BASE_URL is not available)
  let baseUrl = 'http://localhost:8000'; // Adjust with your default local Django server URL

  // Check if NEXT_PUBLIC_API_BASE_URL is available in process.env
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  return baseUrl;
};

// Function to check if base URL has changed
const hasBaseUrlChanged = () => {
  const newBaseUrl = getBaseUrl();
  return newBaseUrl !== currentBaseUrl;
};

// Function to update Axios instance with new base URL
const updateAxiosInstance = () => {
  const newBaseUrl = getBaseUrl();
  if (!axiosInstance || hasBaseUrlChanged()) {
    axiosInstance = createAxiosInstance(newBaseUrl);
    currentBaseUrl = newBaseUrl;
    console.log('Updated base URL:', currentBaseUrl);
  }
};

// Initial update of Axios instance
updateAxiosInstance();

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

// Optional: Automatically update Axios instance when base URL changes
setInterval(() => {
  updateAxiosInstance();
}, 3000); // Check every 3 seconds for base URL changes (adjust as needed)

export default axiosInstance;
