import axios from 'axios';
import Cookies from 'js-cookie';

// Configurazione predefinita di Axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`,
});

// Aggiungi un interceptor di richiesta per includere il CSRF token in tutte le richieste
axiosInstance.interceptors.request.use(config => {
  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
