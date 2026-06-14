import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,             
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;