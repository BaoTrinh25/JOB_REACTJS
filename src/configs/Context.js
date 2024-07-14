import React, { createContext, useState, useContext } from 'react';

export const MyUserContext = createContext();
export const MyDispatchContext = createContext();

// Tạo Context
export const Context = createContext();

// Tạo Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
  };

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook để sử dụng Context
export const useAuth = () => {
  return useContext(Context);
};