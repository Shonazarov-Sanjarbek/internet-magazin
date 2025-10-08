// src/api/products.js
// Faqat API bilan ishlovchi funksiya fayli

// 🧩 1. Mahsulotlarni olish
export async function getProducts() {
  try {
    const localData = localStorage.getItem("products");

    if (localData) {
      return JSON.parse(localData);
    } else {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      localStorage.setItem("products", JSON.stringify(data.products));
      return data.products;
    }
  } catch (error) {
    console.error("Mahsulotlarni olishda xatolik:", error);
    return [];
  }
}

// 🧩 2. Yangi mahsulot qo‘shish
export async function addProduct(newProduct) {
  try {
    const localData = localStorage.getItem("products");
    const products = localData ? JSON.parse(localData) : [];

    // id avtomatik berish
    const addedProduct = { id: Date.now(), ...newProduct };

    // yangisini boshiga qo‘shish
    const updated = [addedProduct, ...products];

    // localStorage yangilash
    localStorage.setItem("products", JSON.stringify(updated));

    return addedProduct;
  } catch (error) {
    console.error("Mahsulot qo‘shishda xatolik:", error);
  }
}

// 🧩 3. Mahsulotni o‘chirish
export async function deleteProduct(id) {
  try {
    const localData = localStorage.getItem("products");
    const products = localData ? JSON.parse(localData) : [];

    // id bo‘yicha filterlash
    const updated = products.filter((p) => p.id !== id);

    // localStorage yangilash
    localStorage.setItem("products", JSON.stringify(updated));

    return updated;
  } catch (error) {
    console.error("Mahsulot o‘chirishda xatolik:", error);
    return [];
  }
}
