import { useCart } from "../../context/cartcontext/CartContext";
import { useAuth } from "../../context/authcontext/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.stock} dona mavjud</p>

      {user?.role === "user" && product.stock > 0 && (
        <button onClick={() => addToCart(product)}>🛒 Savatchaga qo‘shish</button>
      )}
      {product.stock === 0 && <p className="out">❌ Sotuvda yo‘q</p>}
    </div>
  );
}
