import React, { useContext, useState, useEffect } from 'react';
import { MyUserContext } from '../../../configs/Context';
import { useNavigate } from 'react-router-dom';
import { IoCameraOutline, IoBusiness, IoBriefcase, IoLocation, IoContract, IoInformationCircle } from 'react-icons/io5';
import { FaEdit, FaUpload } from 'react-icons/fa';
import bannerImage from '../../../assets/banner_hiring.jpg'
import defaultAvatar from '../../../assets/default_avatar.png';
import { BookmarkBorderOutlined, Delete, EmailOutlined, ListAltOutlined, ManageAccounts, PhoneAndroid, SearchSharp, TagFacesOutlined, TagOutlined, Update } from '@mui/icons-material';
import { BiDollarCircle } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

const ProfileApplicant = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const skills = user?.jobSeeker?.skills || [];
    const areas = user?.jobSeeker?.areas || [];
    //khởi tạo giá trị avatar mặc định
    const [profileImage, setProfileImage] = useState(defaultAvatar);
    //nếu avatar kh null thì sẽ lấy giá trị để cập nhật.
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
            navigate('');
        } else if (item.id === 2) {
            navigate('/jobs');
        }
        else if (item.id === 3) {
            navigate('');
        }
    };

    const navigateToDetailAcc = (item) => {
        if (item.id === 1) {
            navigate('/updateProfile-appplicant');
        } else if (item.id === 2) {
            navigate('/updateProfile-user'); 
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
        // Implement logic to choose image here
        // For example, use a file input and update selected image to state
        // try {
        //     const selectedImage = await openImagePicker(); 
        //     // Cập nhật trạng thái profileImage với hình ảnh đã chọn
        //     if (selectedImage) {
        //         setProfileImage(selectedImage);
        //     }
        // } catch (error) {
        //     console.error('Error choosing image:', error);
        // }
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
                        <span>Ứng viên: <span  className="font-bold">{user.username}</span></span>
                        <span>Mã ứng viên: <span className="font-bold">{user.id}</span></span>
                    </div>
                    <div className='flex flex-row w-full mt-7'>
                        <div className="mb-3 w-[45%] mx-4 pt-3 border-2 border-red-200 border-dashed bg-yellow-50">
                            <div className="flex items-center mb-3 px-5">
                                <IoBriefcase className="mr-2 w-6 h-6" />
                                <span className="font-sans">Lĩnh vực: {user?.jobSeeker?.career.name}</span>
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
                                <span className="font-sans">Kinh nghiệm: {user?.jobSeeker?.experience}</span>
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
                                <IoInformationCircle className="mr-2 w-6 h-6" />
                                <span className="font-sans">Vị trí : {user?.jobSeeker?.position}</span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <BiDollarCircle className="mr-2 w-6 h-6" />
                                <span className="font-sans">Mức lương mong muốn: {user?.jobSeeker?.salary_expectation} VNĐ</span>
                            </div>
                        </div>
                        <div className='mb-3 w-[45%] mx-4 border-2 p-3 border-red-200 border-dashed bg-yellow-50'>
                            <div className="flex items-center mb-3 px-5">
                                <TagOutlined className="mr-2 w-6 h-6" />
                                <span>Tên: </span>
                                <span className="font-sans text-red-800 pl-2">
                                    {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : <span className="text-red-800">Bạn chưa cập nhật</span>}
                                </span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                {user?.gender === 1 ? <BsGenderFemale className="mr-2 w-6 h-6" /> : <BsGenderMale className="mr-2 w-6 h-6" />}
                                <span className="font-sans">
                                    Giới tính: {user?.gender === 1 ? 'Nữ' : user?.gender === 2 ? 'Nam' : <span className="text-red-800">Bạn chưa cập nhật</span>}
                                </span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <EmailOutlined className="mr-2 w-6 h-6" />
                                <span className="font-sans">
                                    Email: {user?.email ? user.email : <span className="text-red-800">Bạn chưa cập nhật</span>}
                                </span>
                            </div>
                            <div className="flex items-center mb-3 px-5">
                                <PhoneAndroid className="mr-2 w-6 h-6" />
                                <span>Liên hệ: </span>
                                <span className="font-sans pl-2">
                                    {user?.mobile ? `${user.mobile}` : <span className='text-red-800'>Bạn chưa cập nhật</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-3 px-5">
                        <span className="font-sans">CV của bạn: {user?.jobSeeker?.cv ? user?.jobSeeker?.cv : <span className='text-red-800'>Bạn chưa cập nhật</span>}</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Quản lý tìm việc</h2>
                <div className="grid grid-cols-2 gap-4">
                    {dataManage.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center cursor-pointer hover:bg-yellow-50"
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
                            className="bg-white shadow-md rounded-lg p-4 flex items-center cursor-pointer hover:bg-yellow-50"
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

export default ProfileApplicant;
