import axios, { AxiosInstance } from "axios";
import { API_BASE_URL, API_BASE_URL_ONLINE } from "./config";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL_ONLINE, // URL of your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
