import axios from 'axios';
import Cookies from 'js-cookie';

// Configure Axios defaults
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Function to create Axios instance with dynamic base URL
const createAxiosInstance = (baseUrl) => {
  const instance = axios.create({
    baseURL: `${baseUrl}/products/`,
  });

  // Add request interceptor to include CSRF token in requests
  instance.interceptors.request.use(
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

  return instance;
};

// Export a default Axios instance with default base URL
const axiosInstance = createAxiosInstance(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000');
export default axiosInstance;

