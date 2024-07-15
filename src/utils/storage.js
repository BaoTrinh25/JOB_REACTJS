
// Lưu trữ token vào Local Storage
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Lấy token từ Local Storage
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Xóa token khỏi Local Storage
export const removeToken = () => {
  localStorage.removeItem('authToken');
};
