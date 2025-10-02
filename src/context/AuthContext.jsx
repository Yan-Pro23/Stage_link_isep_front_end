import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// ⚠️ Mets ton URL backend Laravel ici
const API_URL = "http://127.0.0.1:8000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // ✅ toujours un objet

  // ---- Connexion ----
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
    } catch (err) {
      if (err.response?.status === 422) {
        // erreurs de validation Laravel
        setValidationErrors(err.response.data.errors || {});
      } else {
        setError(err.response?.data?.message || "Erreur de connexion");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Inscription ----
  const register = async (formData) => {
    setIsLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const response = await axios.post(`${API_URL}/register`, formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
    } catch (err) {
      if (err.response?.status === 422) {
        setValidationErrors(err.response.data.errors || {});
      } else {
        setError(err.response?.data?.message || "Erreur lors de l'inscription");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Déconnexion ----
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // ---- Clear errors ----
  const clearErrors = () => {
    setError(null);
    setValidationErrors({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        validationErrors, // ✅ toujours défini
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
