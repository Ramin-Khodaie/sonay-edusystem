import axios from "axios";

export const getAccessToken = () => {
  return localStorage.getItem("at")
}

export const bixios = axios.create({
  withCredentials: true,


  headers: {
    "Authorization": 'null',
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
  baseURL: "//localhost:8000/api/"
});


bixios.interceptors.request.use((config)=> {
  const token = localStorage.getItem('at');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
},
(error) => Promise.reject(error))
