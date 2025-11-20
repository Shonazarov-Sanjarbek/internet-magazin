// src/api/product.js
import axios from "./axiosInstance"; // agar sendagi fayl boshqa bo‘lsa ayt

// Barcha productlarni olish
export const getProducts = async () => {
  const res = await axios.get("/products");
  return res.data;
};

// Product qo‘shish (CREATE)
export const addProduct = async (product) => {
  const res = await axios.post("/products", product);
  return res.data;
};

// Product o‘chirish (DELETE)
export const deleteProduct = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};

// Product yangilash (UPDATE)
export const updateProduct = async (id, updatedData) => {
  const res = await axios.put(`/products/${id}`, updatedData);
  return res.data;
};
