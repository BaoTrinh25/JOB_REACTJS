import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlus, FaSignOutAlt, FaHome, FaCog, FaInbox } from 'react-icons/fa';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';
import { MyDispatchContext } from '../configs/Context';

const SidebarEmployer = () => {
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
        <FlowbiteSidebar className="h-full !bg-gray-900 text-white w-80 flex flex-col">
            <FlowbiteSidebar.ItemGroup>
                <FlowbiteSidebar.Item
                    className="hover:bg-gray-700 rounded text-2xl font-semibold text-white"
                >
                    Bảng điều khiển
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaHome}
                    onClick={() => navigate('/')}
                    className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                >
                    Trang chủ
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaUser}
                    onClick={() => navigate('/profile')}
                    className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                >
                    Hồ sơ của bạn
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaPlus}
                    onClick={() => navigate('/post-recruitment')}
                    className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                >
                    Đăng bài
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaCog}
                    className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                    onClick={toggleEcommerceDropdown}
                >
                    Cài đặt
                    <span className="ml-auto">
                        {isEcommerceOpen ? '▲' : '▼'}
                    </span>
                </FlowbiteSidebar.Item>
                {isEcommerceOpen && (
                    <div className="ml-6">
                        <FlowbiteSidebar.Item
                            onClick={() => navigate('/updateProfile-user')}
                            className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                        >
                            Cập nhật thông tin tài khoản
                        </FlowbiteSidebar.Item>
                        <FlowbiteSidebar.Item
                            onClick={() => navigate('/updateProfile-employer')}
                            className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                        >
                            Cập nhật thông tin nhà tuyển dụng
                        </FlowbiteSidebar.Item>
                    </div>
                )}
                <FlowbiteSidebar.Item
                    icon={FaInbox}
                    onClick={() => navigate('/inbox')}
                    className="hover:bg-gray-700 hover:text-white rounded cursor-pointer text-white"
                >
                    Nhắn tin
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaSignOutAlt}
                    onClick={handleLogout}
                    className="hover:bg-red-600 hover:text-white rounded cursor-pointer text-white"
                >
                    Đăng xuất
                </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar>
    );
};

export default SidebarEmployer;
