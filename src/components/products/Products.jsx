import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/productcard/ProductCart";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="products">
      <h1>🛒 Internet do‘kon</h1>
      <div className="products__list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Mahsulotlar yo‘q</p>
        )}
      </div>
    </div>
  );
}
