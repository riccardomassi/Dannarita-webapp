import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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

// Custom hook to manage Axios instance and update it on URL change
export const useAxios = () => {
  const [axiosInstance, setAxiosInstance] = useState(null);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Fetch environment variable or any other mechanism to get base URL
    const fetchBaseUrl = async () => {
      // Example: Fetching from environment variable
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
      setBaseUrl(baseUrl);
    };

    fetchBaseUrl();
  }, []);

  useEffect(() => {
    if (baseUrl) {
      const instance = createAxiosInstance(baseUrl);
      setAxiosInstance(instance);
    }
  }, [baseUrl]);

  return axiosInstance;
};
