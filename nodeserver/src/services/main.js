import axios from "axios";

export const bixious = axios.create({
  headers : {
    "Authorization" : `bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  },
    baseURL: "http://localhost:8000/api/" 
  });