import { createContext, useState, useEffect } from "react";
import { navigateTo } from "../utils/navigateUtils"; // Import the corrected function
const AuthContext = createContext();
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate(); 
  useEffect(() => {

    if (token) {
      localStorage.setItem("token", token);
      navigateTo(navigate, "/");
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
