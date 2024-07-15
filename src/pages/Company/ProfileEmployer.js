import React, { useContext, useState } from 'react';
import { MyUserContext } from '../../configs/Context';
import { endpoints, authApi } from '../../configs/APIs';
import { getToken } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline, IoBusiness, IoBriefcase, IoLocation, IoContract, IoLink, IoInformationCircle } from 'react-icons/io5';
import { FaUpload, FaHeart, FaSearch, FaBusinessTime, FaTrash, FaEdit, FaSlash, FaMobile, FaMobileAlt } from 'react-icons/fa';
import bannerImage from '../../assets/banner_hiring.jpg'

const ProfileEmployer = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    console.log("Avatar:", user.avatar);

    const [profileImage, setProfileImage] = useState(user.avatar);
    const [selectedImage, setSelectedImage] = useState(null);

    const [companyName, setCompanyName] = useState(user.company?.companyName || '');
    const [editingCompanyName, setEditingCompanyName] = useState(false);

    const [position, setPosition] = useState(user.company?.position || '');
    const [editingPosition, setEditingPosition] = useState(false);

    const [address, setAddress] = useState(user.company?.address || '');
    const [editingAddress, setEditingAddress] = useState(false);

    const [companyType, setCompanyType] = useState(user.company?.company_type || "");
    const [editingCompanyType, setEditingCompanyType] = useState(false);

    const [information, setInformation] = useState(user.company.information || '');
    const [editingInformation, setEditingInformation] = useState(false);

    const companyTypeMap = {
        0: 'Công ty TNHH',
        1: 'Công ty Cổ phần',
        2: 'Công ty trách nhiệm hữu hạn một thành viên',
        3: 'Công ty tư nhân',
        4: 'Công ty liên doanh',
        5: 'Công ty tập đoàn'
    };

    const dataList = [
        { id: 1, title: 'Cập nhật nhà tuyển dụng', icon: <FaUpload /> },
        { id: 2, title: 'Đăng tin tuyển dụng', icon: <FaHeart /> },
        { id: 3, title: 'Tìm kiếm ứng viên', icon: <FaSearch /> },
        { id: 4, title: 'Quản lý bài đăng tuyển dụng', icon: <FaBusinessTime /> },
    ];

    const dataAccount = [
        { id: 1, title: 'Cập nhật thông tin tài khoản', icon: <FaUpload /> },
        { id: 1, title: 'Xóa tài khoản', icon: <FaTrash /> },
        { id: 3, title: 'Xóa thông tin NTD', icon: <FaSlash /> },

    ];

    const navigateToDetail = (item) => {
        if (item.id === 1) {
            navigate('/update-employer');
        } else if (item.id === 2) {
            navigate('/create-recruitment');
        }
        else if (item.id === 3) {
            navigate('/detail-apply');
        }
        else if (item.id === 4) {
            navigate('/list-job-post');
        }
    };

    const navigateToDetailAcc = (item) => {
        if (item.id === 1) {
            navigate('/update-user');
        } else if (item.id === 2) {
            navigate(''); //xóa thông tin cá nhân
        }
        else if (item.id === 3) {
            navigate(''); //xóa tài khoản
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto text-center">
                <p>Loading...</p>
            </div>
        );
    }

    const handleChooseImage = async () => {
        // Implement image picker logic for web here
        // For example, use a file input and set the selected file to state
    };

    const handleUpdateAvatar = async (selectedImage) => {

    };

    const updateCompanyName = async () => {

    };

    const updatePosition = async () => {

    };

    const updateAddress = async () => {

    };

    const updateCompanyType = async () => {

    };


    const updateInformation = async () => {

    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-orange-50 shadow-md rounded-lg p-6 w-full max-w-4xl">
                <div className="relative mb-4 w-full h-48">
                    <img
                        src={bannerImage} // ảnh bìa
                        alt="Banner"
                        className="w-full h-full object-cover rounded-lg" // Sử dụng kích thước của thẻ cha
                    />
                    <div className="absolute bottom-0 left-20 transform -translate-x-1/3 translate-y-1/3">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full w-40 h-40 object-cover border-4 border-orange-200"
                        />
                        <button
                            className="absolute bottom-0 right-2 bg-orange-500 hover:bg-orange-200 text-white rounded-full p-2 transform translate-x-1/4 -translate-y-1/4"
                            onClick={handleChooseImage}
                        >
                            <IoCameraOutline className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        
                    </div>
                    <button
                        className="absolute -bottom-12 right-0 bg-gray-200 text-gray-600 hover:bg-orange-200 rounded-full p-2"
                        onClick={() => navigate('/edit-infoHiring')}
                    >
                        <div className='flex'>
                            <FaEdit className="w-5 h-5" /> 
                            <p>Edit Profile</p>
                        </div>
                    </button>
                </div>


                <div className="mt-16 mb-20">
                    <div className="items-center mb-3 px-10">
                        <span className="font-bold">Welcome to profile of you, {user.username}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <IoBriefcase className="mr-2 w-6 h-6" />
                        <span className="font-sans">Vị trí: {user.company.position}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <IoBusiness className="mr-2 w-6 h-6" />
                        <span className="font-sans">Công ty: {user.company.companyName}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <IoLocation className="mr-2 w-6 h-6" />
                        <span className="font-sans">Địa chỉ: {user.company.address}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <IoContract className="mr-2 w-6 h-6" />
                        <span className="font-sans">Loại hình công ty: {user.company.company_type_display}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <IoInformationCircle className="mr-2 w-6 h-6" />
                        <span className="font-sans">Thông tin: {user.company.information}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <FaBusinessTime className="mr-2 w-6 h-6" />
                        <span className="font-sans">Email: {user?.email}</span>
                    </div>
                    <div className="flex items-center mb-3 px-10">
                        <FaMobileAlt className="mr-2 w-6 h-6" />
                        <span className="font-sans">Liên hệ: {user?.mobile}</span>
                    </div>
                </div>



                <div className="mb-4">
                    
                </div>

                <div className="mb-4">

                </div>
            </div>
            <div className="mt-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Quản lý nhà tuyển dụng</h2>
                <div className="grid grid-cols-2 gap-4">
                    {dataList.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => navigateToDetail(item)}
                        >
                            {item.icon}
                            <span className="ml-2">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Quản lý tài khoản</h2>
                <div className="grid grid-cols-2 gap-4">
                    {dataAccount.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => navigateToDetailAcc(item)}
                        >
                            {item.icon}
                            <span className="ml-2">{item.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileEmployer;
