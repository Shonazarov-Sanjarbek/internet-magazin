import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {role: "admin" | "user"}

  const login = (username, password) => {
    // Oddiy login: usernamega qarab rol beramiz
    if (username === "admin" && password === "123") {
      setUser({ role: "admin", name: "Admin" });
    } else {
      setUser({ role: "user", name: username });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
