import { useCart } from "../../context/cartcontext/CartContext";
import { useAuth } from "../../context/authcontext/AuthContext";
import { useWishlist } from "../../context/wishlistcontext/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useAuth();

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.stock} dona mavjud</p>

      <div className="product-actions">
        {/* Savatchaga qo‘shish */}
        {user?.role === "user" && product.stock > 0 && (
          <button className="btn add" onClick={() => addToCart(product)}>
            🛒 Savatchaga qo‘shish
          </button>
        )}

        {/* Wishlistga qo‘shish */}
        {user?.role === "user" && (
          <button className="btn wish" onClick={() => addToWishlist(product)}>
            💖 Wishlistga qo‘shish
          </button>
        )}

        {/* Mahsulot tugagan bo‘lsa */}
        {product.stock === 0 && <p className="out">❌ Sotuvda yo‘q</p>}
      </div>
    </div>
  );
}
