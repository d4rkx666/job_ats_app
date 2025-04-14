import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT+process.env.REACT_APP_BACKEND_ENDPOINT_VERSION,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("data_user"));
    if(userData){
      const token = userData.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
   (response) => response,
   (error) => {
     if (error.response?.status === 401) {
       // Token is expired or invalid
       localStorage.removeItem("data_user"); // Clear the token
       window.location.href = "/login"; // Redirect to login page
     }
     return Promise.reject(error);
   }
 );

export default api;