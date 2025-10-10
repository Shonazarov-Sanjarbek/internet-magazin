import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, addProduct, deleteProduct } from "../../api/products";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  // 🔒 faqat admin kirishi uchun
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) navigate("/admin");
  }, [navigate]);

  // 📦 mavjud mahsulotlarni olish
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // 🆕 yangi mahsulot qo‘shish
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Agar foydalanuvchi blob URL (local preview) yuborsa, to‘xtatamiz
    if (newProduct.thumbnail.startsWith("blob:")) {
      alert("Iltimos, haqiqiy rasm URL kiriting (yoki rasmni serverga yuklang).");
      return;
    }

    const added = await addProduct(newProduct);
    setProducts([added, ...products]);
    setNewProduct({ title: "", price: "", description: "", thumbnail: "" });
  };

  // ❌ mahsulotni o‘chirish
  const handleDelete = async (id) => {
    await deleteProduct(id);
    const updated = await getProducts();
    setProducts(updated);
  };

  // 🖼 Fayl yuklash (preview uchun)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, thumbnail: imageUrl });
    }
  };

  return (
    <div className="admin-panel">
      <h1>👑 Admin Panel</h1>

      {/* Qo‘shish formasi */}
      <form className="admin-panel__form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Mahsulot nomi"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Narx"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />

        {/* Rasm URL kiritish */}
        <input
          type="text"
          placeholder="Rasm URL (https://...)"
          value={newProduct.thumbnail.startsWith("blob:") ? "" : newProduct.thumbnail}
          onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
        />


        <textarea
          placeholder="Tavsif"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />

        <button type="submit" className="admin-panel__btn">➕ Qo‘shish</button>
      </form>

      {/* Mahsulotlar ro‘yxati */}
      <div className="admin-panel__list">
        {products.map((p) => (
          <div key={p.id} className="admin-panel__item">
            <img src={p.thumbnail || "/noimage.png"} alt={p.title} />
            <div className="info">
              <h3>{p.title}</h3>
              <p>${p.price}</p>
            </div>
            <button onClick={() => handleDelete(p.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
