import { useNavigate } from 'react-router-dom';

const Logout = (dispatch) => {
  const navigate = useNavigate();

  // Thực hiện hành động đăng xuất
  const logout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("user");
    dispatch({ type: 'logout' });
    navigate('/login');
  };

  return logout;
};

export default Logout;
