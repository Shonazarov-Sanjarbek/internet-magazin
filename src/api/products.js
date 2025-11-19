const API_URL = "https://68e7e19a10e3f82fbf412882.mockapi.io/products";

// Barcha mahsulotlarni olish
export async function getProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

// Yangi mahsulot qo‘shish
export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

// Mahsulotni o‘chirish
export async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const res = await fetch(API_URL);
  return res.json();
}

// 🔥 Mahsulotni YANGILASH (count kamaytirish uchun)
export async function updateProduct(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
