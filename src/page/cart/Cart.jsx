import { useState, useEffect } from "react";
import { useCart } from "../../context/cartcontext/CartContext";
import { sendTelegramMessage } from "../../api/sendTelegram";
import { updateProduct } from "../../api/products"; // 🔥 MUHIM IMPORT

export default function Cart() {
  const { cartItems, updateCartItemQty, removeFromCart, clearCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  // LocalStorage dan yuklash
  useEffect(() => {
    const savedForm = localStorage.getItem("orderForm");
    if (savedForm) setForm(JSON.parse(savedForm));

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      JSON.parse(savedCart).forEach((item) =>
        updateCartItemQty(item.id, item.qty)
      );
    }
  }, []);

  // LocalStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("orderForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBuyClick = (item) => setSelectedItem(item);

  // 🔥 ENGI MUHIM QISM – butun funksiyani yangilab qo‘ydim
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone)
      return alert("Ism va telefon raqam kerak!");

    const message = `
🛒 *Yangi sotuv!*
👤 Mijoz: ${form.name}
📞 Telefon: ${form.phone}
🏠 Manzil: ${form.address || "Kiritilmagan"}
💬 Izoh: ${form.comment || "Yo‘q"}

📦 Mahsulot: ${selectedItem.title}
💵 Narxi: $${selectedItem.price}
🔢 Soni: 1 dona
    `;

    // 1) Telegramga yuborish
    await sendTelegramMessage(message);

    // 2) API dagi count ni -1 qilish (eng asosiy joy)
    await updateProduct(selectedItem.id, {
      ...selectedItem,
      count: selectedItem.count - 1, // 🔥 API count kamayadi  
    });

    // 3) Cart qty kamaytirish
    const newQty = selectedItem.qty - 1;
    if (newQty > 0) updateCartItemQty(selectedItem.id, newQty);
    else removeFromCart(selectedItem.id);

    setSelectedItem(null);
  };

  return (
    <div className="cart-page">
      <h2>🛒 Savat</h2>

      {cartItems.length === 0 ? (
        <p className="empty">Savat bo‘sh</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />

                <div className="info">
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                  <span>{item.qty} dona mavjud</span>
                </div>

                <button onClick={() => handleBuyClick(item)}>💰 Sotuv</button>
              </li>
            ))}
          </ul>

          <button className="clear-btn" onClick={clearCart}>
            Savatni tozalash
          </button>
        </>
      )}

      {selectedItem && (
        <div className="order-form">
          <h3>🧾 Buyurtma ma’lumotlari</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ismingiz"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Telefon raqami"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Manzil"
              value={form.address}
              onChange={handleChange}
            />

            <textarea
              name="comment"
              placeholder="Izoh"
              value={form.comment}
              onChange={handleChange}
            />

            <div className="form-buttons">
              <button type="submit">✅ Yuborish</button>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="cancel-btn"
              >
                ❌ Bekor qilish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
