// src/context/wishlistcontext/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

// Context yaratamiz
const WishlistContext = createContext();

// Provider komponent
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // LocalStorage’ga avtomatik saqlash
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlistga mahsulot qo‘shish
  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      setWishlist([product, ...wishlist]);
    }
  };

  // Wishlistdan o‘chirish
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  // Hammasini tozalash
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Context’dan foydalanish uchun hook
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist faqat <WishlistProvider> ichida ishlashi kerak");
  }
  return context;
}
