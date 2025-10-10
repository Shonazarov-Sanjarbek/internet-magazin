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

  // faqat admin kirsin
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminAuth");
    if (!isAdmin) navigate("/admin");
  }, [navigate]);

  // mavjud mahsulotlarni olish
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // mahsulot qo‘shish
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const added = await addProduct(newProduct);
    setProducts([added, ...products]);
    setNewProduct({ title: "", price: "", description: "", thumbnail: "" });
  };

  // mahsulotni o‘chirish
  const handleDelete = async (id) => {
    const updated = await deleteProduct(id);
    setProducts(updated);
  };

  // Fayl tanlash — preview uchun
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

      <form className="admin-panel__form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Mahsulot nomi"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Narx"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />

        <div className="image-upload">
          <label className="upload-label">Rasm kiriting</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {newProduct.thumbnail && (
          <div className="image-preview">
            <img
              src={newProduct.thumbnail}
              alt="Yangi mahsulot rasmi"
              className="preview-img"
            />
          </div>
        )}

        <textarea
          placeholder="Tavsif"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <button type="submit" className="admin-panel__btn">
          ➕ Qo‘shish
        </button>
      </form>

      <div className="admin-panel__list">
        {products.map((p) => (
          <div key={p.id} className="admin-panel__item">
            <img src={p.thumbnail || "/noimage.png"} alt={p.title} />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <button onClick={() => handleDelete(p.id)}>❌ O‘chirish</button>
          </div>
        ))}
      </div>
    </div>
  );
}
