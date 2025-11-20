import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../api/products";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", thumbnail: "" }); // ⚡ image → thumbnail
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateProduct(editId, form);
    } else {
      await addProduct(form);
    }

    setForm({ title: "", price: "", thumbnail: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail, // ⚡ image → thumbnail
    });
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel – Products</h1>

      {/* FORM */}
      <form className="admin-panel__form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="thumbnail" // ⚡ image → thumbnail
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit" className="admin-panel__btn">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCT LIST */}
      <div className="admin-panel__list">
        {products.map((p) => (
          <div key={p.id} className="admin-panel__item">
            <img
              src={p.thumbnail || "/noimage.png"} // ⚡ fallback rasm qo‘shildi
              alt={p.title}
            />
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <div className="admin-panel__actions">
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
