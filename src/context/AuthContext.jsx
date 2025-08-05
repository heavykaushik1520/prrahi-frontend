/* eslint-disable no-unused-vars */
// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { refreshToken } from "../services/api"; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authToken) return;

    const decoded = jwtDecode(authToken);
    const exp = decoded.exp * 1000;
    const now = Date.now();
    const timeout = exp - now - 60 * 1000;

    if (timeout > 0) {
      const timer = setTimeout(async () => {
        try {
          const newToken = await refreshToken();
          setAuthToken(newToken);
          localStorage.setItem("jwtToken", newToken);
          setUser(jwtDecode(newToken)); // optional, use jwtDecode here too
        } catch (err) {
          logout();
        }
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      logout();
    }
  }, [authToken]);

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    setUser(jwtDecode(token));
    setIsAuthenticated(true); 
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    setIsAuthenticated(!!authToken);
    if (authToken) {
      try {
        setUser(jwtDecode(authToken));
      } catch (error) {
        console.error("Failed to decode token on auth token change:", error);
        logout(); 
      }
    } else {
      setUser(null);
    }
  }, [authToken]);


  return (
    <AuthContext.Provider
      value={{ authToken, isAuthenticated, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

