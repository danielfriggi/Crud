import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Função para fazer login, salvar token
  function login(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  // Logout limpa token
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  // Cabeçalhos para requisições autenticadas
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  return (
    <AuthContext.Provider value={{ token, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
