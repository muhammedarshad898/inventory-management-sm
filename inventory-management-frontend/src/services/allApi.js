import axios from "axios";

const BASE_URL = "https://inventory-management-sm.onrender.com/api";

// Axios instance with base config
const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- AUTH ----------
export const registerApi = (userData) => api.post("/auth/register", userData);
export const loginApi = (userData) => api.post("/auth/login", userData);
export const logoutApi = () => api.post("/auth/logout");

// ---------- PRODUCTS ----------
export const getProductsApi = () => api.get("/products");
export const addProductApi = (productData) => api.post("/products", productData);
export const updateProductApi = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProductApi = (id) => api.delete(`/products/${id}`);

export default api;