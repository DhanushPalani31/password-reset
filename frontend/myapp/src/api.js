import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Example usage
api.post("/auth/forgot-password", { email });
