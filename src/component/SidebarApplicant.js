import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaPlus, FaSignOutAlt, FaHome, FaCog, FaInbox, FaSearch, FaHeart } from 'react-icons/fa';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';

const SidebarApplicant = () => {
    const navigate = useNavigate();
    const [isEcommerceOpen, setIsEcommerceOpen] = useState(false);

    const toggleEcommerceDropdown = () => {
        setIsEcommerceOpen(!isEcommerceOpen);
    };

    return (
        <FlowbiteSidebar className="h-full bg-gray-800 text-white w-80 flex flex-col">
            <FlowbiteSidebar.ItemGroup>
                <FlowbiteSidebar.Item
                    className="hover:bg-gray-700 rounded text-2xl"
                >
                    Dashboard
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaHome}
                    onClick={() => navigate('/')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Home
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaUser}
                    onClick={() => navigate('/applicant-profile')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    My Profile
                </FlowbiteSidebar.Item>

                <FlowbiteSidebar.Item
                    icon={FaSearch}
                    onClick={() => navigate('/jobs')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Search Job
                </FlowbiteSidebar.Item>

                <FlowbiteSidebar.Item
                    icon={FaHeart}
                    onClick={() => navigate('')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Liked Job
                </FlowbiteSidebar.Item>

                <FlowbiteSidebar.Item
                    icon={FaPlus}
                    onClick={() => navigate('/job-applied')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Applied Job
                </FlowbiteSidebar.Item>

                <FlowbiteSidebar.Item
                    icon={FaCog}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                    onClick={toggleEcommerceDropdown}
                >
                    Setting
                    <span className="ml-auto">
                        {isEcommerceOpen ? '▲' : '▼'}
                    </span>
                </FlowbiteSidebar.Item>
                {isEcommerceOpen && (
                    <div className="ml-6">
                        <FlowbiteSidebar.Item
                            onClick={() => navigate('/updateProfile-user')}
                            className="hover:bg-gray-700 rounded cursor-pointer"
                        >
                            Update Info User
                        </FlowbiteSidebar.Item>
                        <FlowbiteSidebar.Item
                            onClick={() => navigate('/updateProfile-applicant')}
                            className="hover:bg-gray-700 rounded cursor-pointer"
                        >
                            Update Info Applicant
                        </FlowbiteSidebar.Item>
                    </div>
                )}
                <FlowbiteSidebar.Item
                    icon={FaInbox}
                    onClick={() => navigate('')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Inbox
                </FlowbiteSidebar.Item>
                <FlowbiteSidebar.Item
                    icon={FaSignOutAlt}
                    onClick={() => navigate('')}
                    className="hover:bg-gray-700 rounded cursor-pointer"
                >
                    Log out
                </FlowbiteSidebar.Item>
            </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar>
    );
};

export default SidebarApplicant;
