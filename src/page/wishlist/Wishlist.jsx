import { useWishlist } from "../../context/wishlistcontext/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h2>❤️ Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="empty">Wishlist bo‘sh</p>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map((item) => (
            <li key={item.id} className="wishlist-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="info">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
              </div>
              <button onClick={() => removeFromWishlist(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
