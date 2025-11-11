import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/productcard/ProductCart";
import { useCart } from "../../context/cartcontext/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((data) => {
      // Har bir mahsulotga count qo'shamiz
      const productsWithCount = data.map((p) => ({
        ...p,
        count: p.count || p.stock || 1, // stock mavjud bo'lsa count shuni oladi
      }));
      setProducts(productsWithCount);
    });
  }, []);

  // Sotish funksiyasi
  const handleBuy = (productId) => {
    setProducts((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, count: p.count - 1 } : p
        )
        .filter((p) => p.count > 0) // count 0 bo'lsa olib tashlash
    );

    const product = products.find((p) => p.id === productId);
    if (product) addToCart(product);
  };

  return (
    <div className="products">
      <h1>🛒 Internet do‘kon</h1>
      <div className="products__list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleBuy={() => handleBuy(product.id)}
            />
          ))
        ) : (
          <p>Mahsulotlar yo' q</p>
        )}
      </div>
    </div>
  );
}
