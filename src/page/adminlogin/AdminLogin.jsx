import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Oddiy misol uchun:
    if (email === "sanj@rbek.uz" && password === "sanjarbek10") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/panel");
    } else {
      setError("Email yoki parol noto‘g‘ri!");
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h2>Admin tizimga kirish</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login__btn">
            Kirish
          </button>
          {error && <p className="admin-login__error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
