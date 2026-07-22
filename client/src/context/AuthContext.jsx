import {
  createContext,
  useContext,
  useState,
} from "react";

import { loginUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading] = useState(false);

  const login = async (credentials) => {

    const data = await loginUser(credentials);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setToken(data.token);

    setUser(data.user);

    return data.user;
  };

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

};

export const useAuth = () => useContext(AuthContext);