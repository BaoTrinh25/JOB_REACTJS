import React, { useContext, useState, useEffect, useRef } from 'react';
import { MyUserContext } from '../../../configs/Context';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline, IoBusiness, IoBriefcase, IoLocation, IoContract, IoInformationCircle } from 'react-icons/io5';
import { FaEdit, FaUpload } from 'react-icons/fa';
import bannerImage from '../../../assets/banner_hiring.jpg'
import defaultAvatar from '../../../assets/default_avatar.png';
import { BookmarkBorderOutlined, Delete, EmailOutlined, ListAltOutlined, PhoneAndroid, SearchSharp, Settings, TagOutlined, Update } from '@mui/icons-material';
import { BiDollarCircle } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { getToken, removeToken } from '../../../utils/storage';
import { authApi, endpoints } from '../../../configs/APIs';
import Modal from 'react-modal';

const ProfileApplicant = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const skills = user?.jobSeeker?.skills || [];
    const areas = user?.jobSeeker?.areas || [];
    const [profileImage, setProfileImage] = useState(defaultAvatar);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
    console.log(user.avatar);
    

    useEffect(() => {
        if (user && user.avatar) {
            setProfileImage(user.avatar);
        }
    }, [user]);

    const dataManage = [
        { id: 1, title: 'Việc làm yêu thích', icon: <BookmarkBorderOutlined /> },
        { id: 2, title: 'Tìm kiếm việc làm', icon: <SearchSharp /> },
        { id: 3, title: 'Việc làm đã ứng tuyển', icon: <ListAltOutlined /> },
    ];

    const dataAccount = [
        { id: 1, title: 'Cập nhật thông tin ứng viên', icon: <FaUpload /> },
        { id: 2, title: 'Cập nhật thông tin cá nhân', icon: <Update /> },
        { id: 3, title: 'Xóa tài khoản', icon: <Delete /> },
    ];

    const navigateToDetail = (item) => {
        if (item.id === 1) {
            navigate('liked-job');
        } else if (item.id === 2) {
            navigate('/jobs');
        } else if (item.id === 3) {
            navigate('/job-applied');
        }
    };

    const navigateToDetailAcc = (item) => {
        if (item.id === 1) {
            navigate('/updateProfile-appplicant');
        } else if (item.id === 2) {
            navigate('/updateProfile-user');
        } else if (item.id === 3) {
            setDeleteModalOpen(true);
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto text-center">
                <p>Loading...</p>
            </div>
        );
    }

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
            const response = await authApi(token).patch(endpoints['patch_user'], form, {
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
                setDeleteModalOpen(false);
                setSuccessModalOpen(true);
                setTimeout(() => {
                    navigate('/');
                    setSuccessModalOpen(false);
                    window.location.reload(); // Refresh lại trang web
                }, 2000);
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
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
                        <span>Ứng viên: <span className="font-bold">{user.username}</span></span>
                        <span>Mã ứng viên: <span className="font-bold">{user.id}</span></span>
                    </div>
                    <div className='flex flex-row w-full mt-7'>
                        <div className="mb-3 w-[45%] mx-4 pt-3 border-2 border-red-200 border-dashed bg-yellow-50">
                            <div className="flex items-center mb-3 px-5">
                                <IoBriefcase className="mr-2 w-6 h-6" />
                                <span className="font-sans">Lĩnh vực: {user?.jobSeeker?.career.name ? `${user.jobSeeker.career.name}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoBusiness className="mr-2 w-6 h-6" />
                                Kỹ năng:
                                {skills.map((skill, index) => (
                                    <React.Fragment key={skill.id}>
                                        <span className="font-sans p-1">{skill.name}</span>
                                        {index < skills.length - 1 && <span>,</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoLocation className="mr-2 w-6 h-6" />
                                <span className="font-sans">Kinh nghiệm: {user?.jobSeeker?.experience ? `${user.jobSeeker.experience}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoContract className="mr-2 w-6 h-6" />
                                Khu vực:
                                {areas.map((area, index) => (
                                    <React.Fragment key={area.id}>
                                        <span className="font-sans p-1">{area.name}</span>
                                        {index < areas.length - 1 && <span>,</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <BiDollarCircle className="mr-2 w-6 h-6" />
                                <span className="font-sans">Mức lương mong muốn: {user?.jobSeeker?.salary_expectation ? `${user.jobSeeker.salary_expectation}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <IoInformationCircle className="mr-2 w-6 h-6" />
                                <span className="font-sans">Vị trí mong muốn: {user?.jobSeeker?.position ? `${user.jobSeeker.position}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                        </div>
                        <div className="mb-3 w-[45%] mx-4 pt-3 border-2 border-red-200 border-dashed bg-yellow-50">
                            <div className="flex items-center mb-3 px-5">
                                <TagOutlined className="mr-2 w-6 h-6" />
                                <span className="font-sans">Họ và tên: {user.first_name ? `${user.first_name} ${user.last_name}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <EmailOutlined className="mr-2 w-6 h-6" />
                                <span className="font-sans">Email: {user.email ? `${user.email}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <PhoneAndroid className="mr-2 w-6 h-6" />
                                <span className="font-sans">Điện thoại: {user.mobile ? `${user.mobile}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                {user.gender === 'female' ? (
                                    <BsGenderFemale className="mr-2 w-6 h-6" />
                                ) : (
                                    <BsGenderMale className="mr-2 w-6 h-6" />
                                )}
                                <span className="font-sans">Giới tính: {user.gender === 'female' ? 'Nữ' : 'Nam'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 border-dashed mt-10">
                    <h2 className="mt-5 text-lg font-bold flex items-center mb-3">
                        <Settings className="mr-2 w-5 h-5" />Quản lý tìm việc
                    </h2>
    
                    <div className="grid grid-cols-3 gap-3 mt-3 mx-3">
                        {dataManage.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-100 text-blue-800 px-4 py-3 rounded-md shadow hover:bg-red-100 flex items-center cursor-pointer"
                                onClick={() => navigateToDetail(item)}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-200 border-dashed mt-10">
                <h2 className="mt-5 text-lg font-bold flex items-center mb-3">
                            <Settings className="mr-2 w-5 h-5" />Quản lý tài khoản
                        </h2>
                    <div className="grid grid-cols-3 gap-3 mt-3 mx-3">
                        {dataAccount.map((item) => (
                            <div
                                key={item.id}
                                className="bg-gray-100 text-blue-900 px-4 py-3 rounded-md shadow hover:bg-red-100 flex items-center cursor-pointer"
                                onClick={() => navigateToDetailAcc(item)}
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                contentLabel="Delete Account Confirmation"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg p-8 max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Xác nhận xóa tài khoản</h2>
                    <p className="mb-4">Bạn có chắc chắn muốn xóa tài khoản của mình không? Hành động này không thể hoàn tác.</p>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mr-2"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                        >
                            Xóa tài khoản
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={SuccessModalOpen}
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

export default ProfileApplicant;
