import { Link } from "react-router-dom";
import { useCart } from "../../context/cartcontext/CartContext";
import { useWishlist } from "../../context/wishlistcontext/WishlistContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          🛍️ OnlineShop
        </Link>

        <ul className="navbar__links">
          <li><Link to="/">Bosh sahifa</Link></li>
          <li><Link to="/products">Mahsulotlar</Link></li>

          <li>
            <Link to="/cart">
              🛒 Savat
              {cartItems.length > 0 && (
                <span className="count">{cartItems.length}</span>
              )}
            </Link>
          </li>

          <li>
            <Link to="/wishlist">
              ❤️ Wishlist
              {wishlist.length > 0 && (
                <sup className="count">{wishlist.length}</sup>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
