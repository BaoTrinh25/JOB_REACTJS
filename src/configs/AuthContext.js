// import React, { createContext, useState, useContext, useEffect } from 'react';

// export const AuthContext = createContext(); // Đổi tên thành AuthContext

// // Tạo Provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Hàm đăng nhập
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   // Hàm đăng xuất
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   // Khôi phục trạng thái đăng nhập từ localStorage khi ứng dụng khởi động
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook để sử dụng AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
