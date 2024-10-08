import React, { useState } from 'react';
import {
  BiChevronDown,
  BiChevronUp,
  BiPlus,
  BiFile,
  BiUser,
  BiCalendar,
  BiMoney,
  BiBuilding,
  BiLogOut,
  BiSolidInbox
} from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarEmployer = () => {
  const [openQuangLyDangTuyen, setOpenQuangLyDangTuyen] = useState(true);
  const [openQuangLyDichVu, setOpenQuangLyDichVu] = useState(true);
  const [openCapNhat, setOpenCapNhat] = useState(true);
  const [openHopThoai, setOpenHopThoai] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-72 h-auto bg-gray-700 shadow-lg">
      <h2 className='text-2xl text-white text-center mt-5 p-5'>BẢNG ĐIỀU KHIỂN</h2>
      {/* <h3>{user.username}</h3> */}
      <div class="border-t border-gray-300 my-4"></div>
      <div className="px-6 py-4">
        <div
          className="flex items-center hover:bg-gray-700 rounded pb-4 text-white text-xl cursor-pointer"
          onClick={() => navigate('/')}
        >
          <FaHome className="mr-2" />
          Trang chủ
        </div>
        {/* Quản lý đăng tuyển */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpenQuangLyDangTuyen(!openQuangLyDangTuyen)}
          >
            <span className="font-bold text-white">Quản lý đăng tuyển</span>
            {openQuangLyDangTuyen ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openQuangLyDangTuyen && (
            <ul className="pl-4 mt-2">
              <li className="mb-2">
                <NavLink to="/post-recruitment" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiPlus /> <span>Tạo tin tuyển dụng</span>
                </NavLink>
              </li>
              <li className='mb-2'>
                <NavLink to="/job-posted" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiFile /> <span>Quản lý tuyển dụng</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Quản lý dịch vụ */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpenQuangLyDichVu(!openQuangLyDichVu)}
          >
            <span className="font-bold text-white">Quản lý dịch vụ</span>
            {openQuangLyDichVu ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openQuangLyDichVu && (
            <ul className="pl-4 mt-2">
              <li className="mb-2">
                <NavLink to="/package" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiMoney /> <span>Mua gói đăng tin</span>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/checkout" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiCalendar /> <span>Lịch sử thanh toán</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Tài khoản */}
        <div className="mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenCapNhat(!openCapNhat)}>
            <span className="font-bold text-white">Tài khoản</span>
            {openCapNhat ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openCapNhat && (
            <ul className="pl-4 mt-2">
              <li className="mb-2">
                <NavLink to="/employer-profile" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiBuilding /> <span>Tài khoản nhà tuyển dụng</span>
                </NavLink>
              </li>
              {/* Cập nhật tài khoản và công ty */}
              <li className="mb-2">
                <NavLink to="/updateProfile-user" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiUser /> <span>Cập nhật tài khoản</span>
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/updateProfile-employer" className="flex items-center space-x-2 text-white hover:text-green-600">
                  <BiBuilding /> <span>Cập nhật thông tin công ty</span>
                </NavLink>
              </li>
              {/* Xử lý đăng xuất */}
              <li className="mb-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white hover:text-red-600"
                >
                  <BiLogOut /> <span>Đăng xuất</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarEmployer;
