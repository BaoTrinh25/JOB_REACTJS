import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyDispatchContext } from '../../configs/Context';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { setToken } from '../../utils/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginGG from './LoginGG';

const Login = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const [alertShown, setAlertShown] = useState(false);
  const nav = useNavigate();
  const dispatch = useContext(MyDispatchContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const fields = [
    { label: "Username", icon: "email", field: "username" },
    { label: "Password", icon: "lock", field: "password", secureTextEntry: true },
  ];

  const change = (value, field) => {
    setUser((current) => {
      return { ...current, [field]: value };
    });
  };

  const login = async () => {
    setIsLoggingIn(true);
    setAlertShown(false);
    try {
      let res = await APIs.post(endpoints["login"], {
        ...user,
        // "client_id": "8gMvsTseiW2YTOd9tik7q5VZxGNbhqdmY49qHkVU",
        // "client_secret": "qLfzKj3gXRmzVk4s6guZrm1KPYelxZF3aqJKMSMXmc4Dv8QYGq4bhJhpkae0yN1Qf2C7jiT0IqXqLwBlxX4xYzcqjTdCYoBnuq760mUOGRxOuRw3Zi7hSW8IkSTIhWhf",
        "grant_type": "password",

        "client_id": "3Mj3P2rLZV34jTnqcn09cc0cAGAZATPjUfhO9ftG",
        "client_secret": "77sUVuOmGc5O2vwfxmCHZEEAJ6qfJBLYUMaKSti6jnhZ04GrL30DtLyLo5gcf6x1DxUJZiHV6Uf3ClH2NlyHVuHqjnxSFMr2ZwCktWWTfr3lF8YKN6VHJGTFZ6dYhnQv",
      });

      setToken(res.data.access_token);
      setTimeout(async () => {
        let user = await authApi(res.data.access_token).get(endpoints["current_user"]);
        dispatch(
          {
            "type": "login",
            "payload": user.data
          });
        if (!alertShown) {
          toast.success('Đăng nhập thành công');
          nav("/");
          if (user && user.role !== null) {
            window.localStorage.setItem('user', JSON.stringify(user.data)); // Lưu trữ thông tin user vào localStorage
            window.localStorage.setItem('isLoggedIn', true); // Đánh dấu người dùng đã đăng nhập
          }
          setAlertShown(true);
        }
      }, 100);
    } catch (ex) {
      if (!alertShown) {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại !!');
        setAlertShown(true);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/007/164/537/original/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg')" }}>
      <form className="bg-white p-8 rounded-xl shadow-xl w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
        <div className="mb-4">
          {fields.map((f) => (
            <div key={f.field} className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={f.field}>{f.label}</label>
              <input
                type={f.secureTextEntry ? "password" : "text"}
                id={f.field}
                className="w-full px-3 py-2 border rounded"
                value={user[f.field] || ""}
                onChange={(event) => change(event.target.value, f.field)}
                required
              />
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-teal-900"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account?</span>{' '}
          <Link to="/register" className="text-blue-950 underline">
            Create Your Account
          </Link>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="flex-shrink text-sm text-gray-500 px-4">OR</span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>
        <LoginGG />
        <div className='mt-5'>
          <Link to="/" className="text-green-700 text-sm justify-center">
            Trải nghiệm ngay không cần đăng nhập!
          </Link>
        </div>

      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
