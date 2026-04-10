import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nn_token');
    const saved = localStorage.getItem('nn_user');
    if (token && saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('nn_token');
        localStorage.removeItem('nn_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token, user: userData } = res.data.data;
    localStorage.setItem('nn_token', token);
    localStorage.setItem('nn_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (email, username, password) => {
    const res = await authAPI.register({ email, username, password });
    const { token, user: userData } = res.data.data;
    localStorage.setItem('nn_token', token);
    localStorage.setItem('nn_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('nn_token');
    localStorage.removeItem('nn_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}