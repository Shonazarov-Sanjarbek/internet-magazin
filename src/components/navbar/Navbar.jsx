// src/components/navbar/Navbar.jsx
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          🛍️ OnlineShop
        </Link>

        <ul className="navbar__links">
          <li><Link to="/">Bosh sahifa</Link></li>
          <li><Link to="/products">Mahsulotlar</Link></li>
          <li><Link to="/cart">🛒 Savat</Link></li>
          <li><Link to="/wishlist">❤️ Wishlist</Link></li>
        </ul>

      </div>
    </nav>
  );
}
