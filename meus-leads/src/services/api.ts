import axios from "axios";

const api = axios.create({
  baseURL: "https://leads-123.vercel.app/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
