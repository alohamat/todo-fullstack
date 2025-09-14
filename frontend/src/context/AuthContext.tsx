import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { ReactNode } from "react";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const refreshToken = localStorage.getItem("refresh_token");

  const fetchUser = async (token: string) => {
    try {
      const res = await axios
        .get("http://localhost:8080/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      return setUser(res.data.user);
    } catch {
      logout();
    }
  };

  const login = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    setAccessToken(newAccessToken);
    fetchUser(newAccessToken);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }
  }, []);
  // refresh automático
  useEffect(() => {
    if (!accessToken && refreshToken) {
      axios
        .post("http://localhost:8080/api/refresh", { refresh_token: refreshToken })
        .then((res) => {
          const newToken = res.data.access_token;
          localStorage.setItem("access_token", newToken);
          setAccessToken(newToken);
          fetchUser(newToken);
        })
        .catch(() => logout());
    } else if (accessToken) {
      fetchUser(accessToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;