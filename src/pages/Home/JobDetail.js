import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import APIs, { authApi, endpoints, fetchJobDetail } from '../../configs/APIs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { MyUserContext } from '../../configs/Context';
import Ratings from '../User/JobSeeker/Ratings';
import { getToken } from '../../utils/storage';

const JobDetail = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSubmittingFavorite, setIsSubmittingFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const user = useContext(MyUserContext);

    useEffect(() => {
        const getJobDetails = async () => {
            try {
                const response = await fetchJobDetail(jobId);
                setJob(response.data);

                // Kiểm tra trạng thái lưu bài viết
                if (user) {
                    const token = getToken();
                    const likeResponse = await authApi(token).get(endpoints['check_liked'](jobId));
                    setIsFavorite(likeResponse.data.liked);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getJobDetails();
    }, [jobId, user]);

    const handleApplyJob = async () => {
        if (user?.role === 1) {
            setNotificationMessage('Tính năng này không phù hợp với vai trò của bạn');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }
        if (user?.role === 0) {
            navigate(`/jobApplication/${jobId}`);
        } else {
            setNotificationMessage('Bạn cần đăng nhập!');
            setShowModal(true);
        }
    };

    const handleToggleFavorite = async () => {
        if (!user) {
            setNotificationMessage('Bạn cần đăng nhập để lưu công việc yêu thích!');
            setShowModal(true);
            return;
        }

        setIsSubmittingFavorite(true);
        try {
            const token = getToken();
            const response = await authApi(token).post(endpoints['like'](jobId));
            setIsFavorite(response.data.liked);

            const message = response.data.liked ? 'Lưu việc làm thành công' : 'Đã bỏ lưu việc làm';
            setNotificationMessage(message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } catch (error) {
            console.error('Error handling favorite job: ', error);
        } finally {
            setIsSubmittingFavorite(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        );
    }

    if (!job) {
        return <div>Không tìm thấy công việc</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <img src={job.image} alt={job.title} className="w-full h-80 object-cover mb-4" />
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="bg-yellow-50 p-10 pt-0 shadow rounded mb-4">
                <div>
                    <p className="text-lg font-semibold">Công ty: {job.company?.companyName}</p>
                    <p>Tuyển vị trí: {job?.position}</p>
                    <p>Lĩnh vực: {job?.career.name}</p>
                    <p>Mức lương: {job?.salary} VNĐ</p>
                    <p>Giới tính: {job?.gender === 1 ? 'Nữ' : 'Nam'}</p>
                    <p>Loại hình công việc: {job?.employmenttype?.type}</p>
                    <p>Số lượng tuyển: {job?.quantity}</p>
                    <p>Địa điểm: {job?.location}</p>
                    <p className="text-red-500">Hạn nộp hồ sơ: {job?.deadline}</p>
                    <h2 className="text-xl font-bold mt-4">Mô tả công việc:</h2>
                    <p>{job?.description}</p>
                    <h2 className="text-xl font-bold mt-4">Yêu cầu kinh nghiệm:</h2>
                    <p>{job?.experience}</p>
                    <h2 className="text-xl font-bold mt-4">Thông tin công ty:</h2>
                    <p>- Công ty: {job.company?.companyName}</p>
                    <p>- Địa chỉ: {job.company?.address}</p>
                    <p>- Loại doanh nghiệp: {job.company?.company_type_display}</p>
                    <p>- Thông tin chi tiết: {job.company?.information}</p>
                </div>

                <div className="flex flex-col items-center mt-20">
                    <div className="flex items-center space-x-4">
                        <button onClick={handleToggleFavorite} className="text-green-500">
                            {isFavorite ? <BsFillBookmarkFill className="text-4xl" /> : <BiBookmark className="text-4xl hover:text-yellow-500" />}
                        </button>
                        <button onClick={handleApplyJob} className="bg-green-500 text-white py-2 px-10 rounded hover:bg-yellow-500">Ứng tuyển</button>
                    </div>
                    {showNotification && <div className="mt-4 text-red-500">{notificationMessage}</div>}
                </div>
            </div>
            <Ratings jobId={jobId} />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-70"></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-50">
                        <h2 className="text-xl font-bold mb-4">Thông báo</h2>
                        <p>{notificationMessage}</p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                                onClick={() => navigate('/login')}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="bg-red-700 text-white py-2 px-4 rounded hover:bg-gray-700"
                                onClick={() => setShowModal(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetail;
