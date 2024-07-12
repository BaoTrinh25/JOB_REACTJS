import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Đăng nhập thành công');
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    // Xử lý đăng nhập Google thành công ở đây
    alert('Đăng nhập với Google thành công');
  };

  const handleGoogleLoginFailure = (response) => {
    console.log(response);
    // Xử lý đăng nhập Google thất bại ở đây
    alert('Đăng nhập với Google thất bại');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-slate-200 p-8 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">SIGN IN</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-900">
          Sign in
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account?</span>{' '}
          <Link to="/register" className="text-blue-950 underline">
          Sign Up
          </Link>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="flex-shrink text-sm text-gray-500 px-4">OR</span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          render={renderProps => (
            <button
              className="flex items-center justify-center mt-4 p-2 border rounded bg-white shadow hover:bg-gray-100 w-full"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default Login;
