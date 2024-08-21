import React, { useContext, useState, useEffect, useRef } from 'react';
import { MyUserContext } from '../../../configs/Context';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline, IoBusiness, IoLocation, IoContract } from 'react-icons/io5';
import { FaUpload, FaBusinessTime, FaTrash, FaEdit } from 'react-icons/fa';
import bannerImage from '../../../assets/banner_hiring.jpg';
import defaultAvatar from '../../../assets/default_avatar.png';
import { PostAddSharp, EmailOutlined, ListAltOutlined, PhoneAndroid, TagOutlined, Update, Settings } from '@mui/icons-material';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { getToken, removeToken } from '../../../utils/storage';
import { authApi, endpoints } from '../../../configs/APIs';
import Modal from 'react-modal';

const ProfileEmployer = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const [profileImage, setProfileImage] = useState(defaultAvatar);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user && user.avatar) {
            setProfileImage(user.avatar);
        }
    }, [user]);

    const dataManage = [
        { id: 1, title: 'Đăng tin tuyển dụng', icon: <PostAddSharp /> },
        { id: 2, title: 'Danh sách ứng viên', icon: <ListAltOutlined /> },
        { id: 3, title: 'Quản lý bài đăng tuyển dụng', icon: <FaBusinessTime /> },
    ];

    const dataAccount = [
        { id: 1, title: 'Cập nhật thông tin NTD', icon: <FaUpload /> },
        { id: 2, title: 'Cập nhật thông tin cá nhân', icon: <Update /> },
        { id: 3, title: 'Xóa tài khoản', icon: <FaTrash /> },
    ];

    const navigateToDetail = (item) => {
        if (item.id === 1) {
            navigate('/post-recruitment');
        } else if (item.id === 2) {
            navigate('');
        } else if (item.id === 3) {
            navigate('/job-posted');
        }
    };

    const navigateToDetailAcc = (item) => {
        if (item.id === 1) {
            navigate('/updateProfile-employer');
        } else if (item.id === 2) {
            navigate('/updateProfile-user'); //xóa thông tin cá nhân
        } else if (item.id === 3) {
            setIsDeleteModalOpen(true); // Hiển thị modal xóa tài khoản
        }
    };

    const handleChooseImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file) => {
        const form = new FormData();
        form.append('avatar', file);

        try {
            const token = getToken();
            const response = await authApi(token).patch(endpoints['patch_user'], 
                form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert("Cập nhật avatar thành công!");
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const token = getToken();
            const response = await authApi(token).delete(endpoints['delete_user'](user.id));

            if (response.status === 204) {
                removeToken(); // Xóa token khỏi localStorage hoặc sessionStorage
                setIsDeleteModalOpen(false);
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    navigate('/');
                    setIsSuccessModalOpen(false);
                    window.location.reload(); // Refresh lại trang web
                }, 2000);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    if (!user) {
        return (
            <div className="container mx-auto text-center">
                <p>Loading...</p>
            </div>
        );
    }

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
                            src={profileImage} //avatar
                            alt="Profile"
                            className="rounded-full w-40 h-40 object-cover border-4 border-orange-200"
                        />
                        <button
                            className="absolute bottom-0 right-2 bg-orange-500 hover:bg-orange-200 text-white rounded-full p-2 transform translate-x-1/4 -translate-y-1/4"
                            onClick={handleChooseImage}
                        >
                            <IoCameraOutline className="w-5 h-5" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                    </div>
                    <button
                        className="absolute -bottom-12 right-0 bg-gray-200 text-gray-600 hover:bg-orange-200 rounded-full p-2"
                        onClick={() => navigate('/updateProfile-user')}
                    >
                        <div className='flex'>
                            <FaEdit className="w-5 h-5" />
                            <p>Edit Profile</p>
                        </div>
                    </button>
                </div>
                <div className='container mt-5 pt-10'>
                    <div className="mb-3 px-10 flex flex-col">
                        <span>Nhà tuyển dụng: <span  className="font-bold">{user.username}</span></span>
                        <span>Mã NTD: <span className="font-bold">{user.id}</span></span>
                    </div>
                    <div className='flex flex-row w-full mt-7'>
                        <div className="mb-3 w-[55%] mx-4 pt-3 border-2 border-red-200 border-dashed bg-yellow-50">
                            <div className="flex items-center mb-3 px-5">
                                <IoBusiness className="mr-2 w-6 h-6" />
                                <span className="font-sans">Công ty: {user?.company?.companyName}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoLocation className="mr-2 w-6 h-6" />
                                <span className="font-sans">Địa chỉ: {user?.company?.address}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoContract className="mr-2 w-6 h-6" />
                                <span className="font-sans">Loại hình công ty: {user?.company?.company_type_display}</span>
                            </div>
                        </div>
                        <div className='mb-3 w-[45%] mx-4 border-2 p-3 border-red-200 border-dashed bg-yellow-50'>
                            <div className="flex items-center mb-3 px-5">
                                <TagOutlined className="mr-2 w-6 h-6" />
                                <span>Tên: </span>
                                <span className="font-sans pl-2">
                                    {user.first_name} {user.last_name}
                                </span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <EmailOutlined className="mr-2 w-6 h-6" />
                                <span>Email: </span>
                                <span className="font-sans pl-2">{user.email}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <PhoneAndroid className="mr-2 w-6 h-6" />
                                <span>Số điện thoại: </span>
                                <span className="font-sans pl-2">{user.mobile}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                {user.gender === 'male' ? <BsGenderMale className="mr-2 w-6 h-6" /> : <BsGenderFemale className="mr-2 w-6 h-6" />}
                                <span>Giới tính: </span>
                                <span className="font-sans pl-2">{user.gender === 'male' ? 'Nam' : 'Nữ'}</span>
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-gray-200 border-dashed mt-10'>
                        <h2 className="mt-5 text-lg font-bold flex items-center mb-3">
                            <Settings className="mr-2 w-5 h-5" />Quản lý tài khoản nhà tuyển dụng
                        </h2>
                        <div className="grid grid-cols-3 gap-3 mt-3 mx-3">
                            {dataAccount.map((item) => (
                                <button
                                    key={item.id}
                                    className="bg-gray-100 text-blue-800 px-4 py-3 rounded-md shadow hover:bg-red-100 flex items-center cursor-pointer"
                                    onClick={() => navigateToDetailAcc(item)}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='border-t border-gray-200 border-dashed mt-10'>
                        <h2 className="mt-5 text-lg font-bold flex items-center mb-3">
                            <FaEdit className="mr-2 w-5 h-5" />Quản lý tuyển dụng
                        </h2>
                        <div className="grid grid-cols-3 gap-3 mt-3 mx-3">
                            {dataManage.map((item) => (
                                <button
                                    key={item.id}
                                    className="bg-gray-100 text-blue-900 px-4 py-3 rounded-md shadow hover:bg-red-100 flex items-center cursor-pointer"
                                    onClick={() => navigateToDetail(item)}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Confirm Delete Account"
                className="bg-white rounded-lg p-8 max-w-md mx-auto mt-20 shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-bold mb-4">Xác nhận xóa tài khoản</h2>
                <p className="mb-4">Bạn có chắc chắn muốn xóa tài khoản này không?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-4 py-2 mr-2"
                        onClick={closeDeleteModal}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
                        onClick={handleDeleteAccount}
                    >
                        Xóa
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={isSuccessModalOpen}
                onRequestClose={closeSuccessModal}
                contentLabel="Delete Success"
                className="bg-white rounded-lg p-8 max-w-md mx-auto mt-20 shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-bold mb-4">Xóa tài khoản thành công!</h2>
            </Modal>
        </div>
    );
};

export default ProfileEmployer;
