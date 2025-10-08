// src/components/products/Products.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../productcard/ProductCart";

export default function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    getProducts().then(setProducts);
  };

  useEffect(() => {
    loadProducts();

    const handleStorageChange = (e) => {
      if (e.key === "products") loadProducts();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="products">
      <h1 className="products__title">🛒 Internet do‘kon</h1>

      <div className="products__grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="products__empty">Mahsulotlar yo‘q</p>
        )}
      </div>
    </div>
  );
}
