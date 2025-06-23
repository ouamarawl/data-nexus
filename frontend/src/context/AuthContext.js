import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  // Synchronisation du contexte avec le localStorage (pour multi-onglets et refresh)
  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      setAdmin(token ? { token } : null);
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setAdmin({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
