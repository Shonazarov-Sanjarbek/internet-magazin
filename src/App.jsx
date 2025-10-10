import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext/AuthContext";
import { CartProvider } from "./context/cartcontext/CartContext";

import Navbar from "./components/navbar/Navbar";
import Home from "./page/home/Home";
import AdminPanel from "./page/adminPanel/AdminPanel";
import Products from "./components/products/Products";
import AdminLogin from "./page/adminlogin/AdminLogin"; // 🔹 admin login sahifa
import { WishlistProvider } from "./context/wishlistcontext/WishlistContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            {/* Navbar faqat admin sahifasida chiqmasin */}
            {window.location.pathname.startsWith("/admin") ? null : <Navbar />}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin" element={<AdminLogin />} />{" "}
              {/* login sahifa */}
              <Route path="/admin/panel" element={<AdminPanel />} />{" "}
              {/* CRUD sahifa */}
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
