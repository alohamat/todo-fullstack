import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { ReactNode } from "react";

const API_BASE = "todo-fullstack-production-e159.up.railway.app"

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  loading: true,
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
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get(`${API_BASE}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (newAccessToken: string, newRefreshToken: string) => {
    localStorage.setItem("access_token", newAccessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    setAccessToken(newAccessToken);
    fetchUser(newAccessToken);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccessToken(null);
    setUser(null);
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    if (accessToken) {
      fetchUser(accessToken);
    } else if (refreshToken) {
      axios
        .post(`${API_BASE}api/refresh`, { refresh_token: refreshToken })
        .then((res) => {
          const newToken = res.data.access_token;
          localStorage.setItem("access_token", newToken);
          setAccessToken(newToken);
          fetchUser(newToken);
        })
        .catch(() => logout());
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
