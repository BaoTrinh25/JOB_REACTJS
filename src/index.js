import React from 'react';
import { createRoot } from 'react-dom/client'; //tạo ứng dụng React vào DOM
import App from './App';

const container = document.getElementById('root'); //phần tử DOM gốc với id = root trong file index.html
const root = createRoot(container); //quản lý và render ứng dụng

//render ứng dụng vào DOM
root.render(
  // React.StrictMode: Đây là một component đặc biệt của React giúp kiểm tra các vấn đề tiềm ẩn trong ứng dụng 
  // App là component gốc(chính) của ứng dụng bao gồm các component con
  <React.StrictMode> 
    <App />  
  </React.StrictMode>
);
