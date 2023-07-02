import axios from "axios";

const BASE_URL = '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post('/auth/jwt/refresh/', {}, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            return apiClient(originalRequest);
          } else {
            // If token refresh fails, redirect the user to the login page, or handle appropriately
          }
        });
    }
    
    // If the error was due to other reasons, just throw it back to the caller
    return Promise.reject(error);
  }
);

export default apiClient;

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true // This is required for sending cookies automatically with each request
})
