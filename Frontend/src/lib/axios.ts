import axios from "axios";
import { store } from "../shared/store/store";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/",
    
});


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // add the token in the header
    config.headers.Authorization = `Bearer ${store.getState().auth.auth.token}`;
  return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

