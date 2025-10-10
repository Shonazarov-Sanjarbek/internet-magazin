import { useWishlist } from "../../context/wishlistcontext/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h1>💖 Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Hali mahsulot qo‘shilmagan</p>
      ) : (
        <>
          <button onClick={clearWishlist}>Tozalash</button>
          <div className="wishlist-list">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <button onClick={() => removeFromWishlist(item.id)}>❌ O‘chirish</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
