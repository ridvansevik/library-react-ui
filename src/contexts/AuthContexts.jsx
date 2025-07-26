import React, { createContext, useState, useContext, useEffect } from 'react';
import {apiClient} from '../api/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Uygulama ilk yüklendiğinde localStorage'ı kontrol et
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      apiClient.defaults.headers.common['Authorization'] = `Basic ${storedToken}`;
    }
  }, []);

  const login = async (username, password) => {
    try {
      const token = btoa(`${username}:${password}`);
      // DÜZELTME: 'Authorization' ve 'defaults' doğru yazıldı.
      apiClient.defaults.headers.common['Authorization'] = `Basic ${token}`;

      const userData = { username };
      // DÜZELTME: State'e string yerine obje kaydediyoruz.
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      // DÜZELTME: Anahtar ve değer ayrı parametreler olmalı.
      localStorage.setItem('token', token);

      return true;
    } catch (error) {
      console.error('Login Failed', error);
      logout(); // Hata durumunda bilgileri temizle
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // DÜZELTME: 'Authorization' doğru yazıldı.
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const value = { user, login, logout };

  // DÜZELTME: `{children}` (küçük harfle) kullanılmalı.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};