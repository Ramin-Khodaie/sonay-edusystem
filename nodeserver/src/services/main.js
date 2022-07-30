import axios from "axios";

export const bixious = axios.create({
  headers : {
    "Authorization" : `bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
    baseURL: "http://127.0.0.1:8000/api/" 
  });