import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/cartcontext/CartContext";
import { WishlistProvider } from "./context/wishlistcontext/WishlistContext";

import Navbar from "./components/navbar/Navbar";
import Home from "./page/home/Home";
import Products from "./components/products/Products";
import AdminPanel from "./page/adminPanel/AdminPanel";
import AdminLogin from "./page/adminlogin/AdminLogin";
import Cart from "./page/cart/Cart";
import Wishlist from "./page/wishlist/Wishlist";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* faqat admin sahifalarida Navbar chiqmasin */}
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <AppContent />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}
