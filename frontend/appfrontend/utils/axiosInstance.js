
import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Function to create and configure Axios instance dynamically
const createAxiosInstance = () => {
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

  // Log the base URL for debugging
  console.log('Using base URL:', axiosInstance.defaults.baseURL);

  return axiosInstance;
};

// Export a function that creates a new Axios instance each time it's called
export const getAxiosInstance = () => {
  return createAxiosInstance();
};

// Export the default Axios instance created once at the start
const axiosInstance = createAxiosInstance();
export default axiosInstance;
