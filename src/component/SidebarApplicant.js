import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaHome, FaCog, FaInbox, FaSearch, FaHeart, FaList } from 'react-icons/fa';
import { MyDispatchContext } from '../configs/Context';

const SidebarApplicant = () => {
    const navigate = useNavigate();
    const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);
    const dispatch = useContext(MyDispatchContext);

    const toggleEcommerceDropdown = () => {
        setIsEcommerceOpen(!isEcommerceOpen);
    };

    const handleLogout = () => {
        dispatch({ type: 'logout' });
        navigate('/');
    };

    return (
        <div className="h-full bg-gray-800 text-white w-80 flex flex-col p-4">
            <ul className="space-y-4">
                <li className="text-2xl hover:bg-gray-700 rounded p-2 cursor-pointer">
                    Bảng điều khiển
                </li>
                <div class="border-t border-gray-300 my-4"></div>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <FaHome className="mr-2" />
                    Trang chủ
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('/applicant-profile')}
                >
                    <FaUser className="mr-2" />
                    Hồ sơ của bạn
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('/jobs')}
                >
                    <FaSearch className="mr-2" />
                    Tìm việc làm
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('/liked-job')}
                >
                    <FaHeart className="mr-2" />
                    Việc làm đã lưu
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('/job-applied')}
                >
                    <FaList className="mr-2" />
                    Việc làm đã ứng tuyển
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={toggleEcommerceDropdown}
                >
                    <FaCog className="mr-2" />
                    Cài đặt
                    <span className="ml-auto">{isEcommerceOpen ? '▲' : '▼'}</span>
                </li>
                {isEcommerceOpen && (
                    <ul className="ml-6 space-y-2">
                        <li
                            className="hover:bg-gray-700 rounded p-2 cursor-pointer"
                            onClick={() => navigate('/updateProfile-user')}
                        >
                            Cập nhật thông tin tài khoản
                        </li>
                        <li
                            className="hover:bg-gray-700 rounded p-2 cursor-pointer"
                            onClick={() => navigate('/updateProfile-applicant')}
                        >
                            Cập nhật thông tin ứng viên
                        </li>
                    </ul>
                )}
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={() => navigate('')}
                >
                    <FaInbox className="mr-2" />
                    Nhắn tin
                </li>
                <li
                    className="flex items-center hover:bg-gray-700 rounded p-2 cursor-pointer"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="mr-2" />
                    Đăng xuất
                </li>
            </ul>
        </div>
    );
};

export default SidebarApplicant;
