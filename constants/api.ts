import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://82.208.23.238:8014/", // URL of your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
