// src/api/products.js

const API_URL = "https://68e7e19a10e3f82fbf412882.mockapi.io/products";

// 🔹 Barcha mahsulotlarni olish
export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Mahsulotlarni yuklashda xatolik!");
  return await res.json();
}

// 🔹 Yangi mahsulot qo‘shish
export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Mahsulot qo‘shishda xatolik!");
  return await res.json();
}

// 🔹 Mahsulotni o‘chirish
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Mahsulotni o‘chirishda xatolik!");
  return await getProducts();
}
