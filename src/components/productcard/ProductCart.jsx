import React, { useState } from "react";
import { Card, Button, Tooltip } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useCart } from "../../context/cartcontext/CartContext";
import { useWishlist } from "../../context/wishlistcontext/WishlistContext";

const { Meta } = Card;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [liked, setLiked] = useState(false);

  // Mahsulot mavjudligini count bo'yicha tekshirish
  const isAvailable = product.count > 0;

  const handleWishlist = () => {
    setLiked(!liked);
    addToWishlist(product);
  };

  const handleBuy = () => {
    if (!isAvailable) return; // agar mavjud bo'lmasa hech narsa qilmaydi
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="card-content">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className={`stock ${isAvailable ? "in" : "out"}`}>
          {isAvailable
            ? `${product.count} dona mavjud`
            : "❌ Sotuvda yo‘q"}
        </p>
      </div>

      <div className="product-actions">
        <Tooltip title={isAvailable ? "Savatchaga qo‘shish" : "Sotuvda yo‘q"}>
          <Button
            shape="circle"
            icon={<ShoppingCartOutlined />}
            onClick={handleBuy}
            disabled={!isAvailable} // count 0 bo'lsa tugma disable
          />
        </Tooltip>

        <Tooltip title="Sevimlilarga qo‘shish">
          <Button
            shape="circle"
            icon={
              liked ? (
                <HeartFilled style={{ color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined style={{ color: "#ff4d4f" }} />
              )
            }
            onClick={handleWishlist}
          />
        </Tooltip>
      </div>
    </div>
  );
}
