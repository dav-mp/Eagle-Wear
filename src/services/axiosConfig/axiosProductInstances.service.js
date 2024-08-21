import axios from 'axios';

const axiosProductInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/products', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosProductInstance.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    // Manejo de errores en la solicitud
    return Promise.reject(error);
  }
);

axiosProductInstance.interceptors.response.use(
  (response) => {
    // Manejo de respuestas exitosas
    return response;
  },
  (error) => {
    // Manejo de errores en la respuesta
    if (error.response && error.response.status === 401) {
      // Redirigir a la página de inicio de sesión o mostrar mensaje de error
    }
    return Promise.reject(error);
  }
);

export default axiosProductInstance;
