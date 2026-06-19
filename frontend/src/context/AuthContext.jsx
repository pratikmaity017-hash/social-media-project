import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthDataContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const res = await api.get("/users/user-data");

      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthDataContext.Provider
      value={{ user, setUser, loading, setLoading, getCurrentUser, logout }}
    >
      {children}
    </AuthDataContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthDataContext);
}
