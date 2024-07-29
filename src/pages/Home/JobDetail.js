import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import APIs, { authApi, endpoints, fetchJobDetail } from '../../configs/APIs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from '../../configs/Context';
import { getToken } from '../../utils/storage';
import Ratings from '../User/JobSeeker/Ratings';

const JobDetail = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSubmittingFavorite, setIsSubmittingFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const navigate = useNavigate();
    const user = useContext(MyUserContext);

    useEffect(() => {
        const getJobDetails = async () => {
            try {
                const response = await fetchJobDetail(jobId);
                setJob(response.data);
                console.log(response.data);
                const favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
                const isFav = favoriteJobs.some(item => item.id === jobId);
                setIsFavorite(isFav);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await APIs.get(endpoints['list_cmt'](jobId));
                setComments(Array.isArray(response.data.results) ? response.data.results : []);
                console.log(response.data.results);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        getJobDetails();
        fetchComments();
    }, [jobId]);

    const handleApplyJob = async () => {
        if (user?.company) {
            setNotificationMessage('Tính năng này không phù hợp với vai trò của bạn');
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return;
        }
        if (user?.jobSeeker) {
            navigate(`/jobApplication/${jobId}`);
        } else {
            alert('Bạn cần đăng nhập!');
            navigate('/login');
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setIsSubmittingComment(true);
        try {
            const token = getToken();
            const form = new FormData();
            form.append('content', newComment);

            const res = await authApi(token).post(endpoints['post_cmt'](jobId), form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (res.status === 201) {
                setComments([...comments, res.data]);
                setNewComment('');
            } else {
                console.error('Error posting comment:', res.data);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleToggleFavorite = async () => {
        if (!user) {
            alert('Bạn cần đăng nhập để lưu công việc yêu thích!');
            navigate('/login');
            return;
        }

        setIsSubmittingFavorite(true);
        setTimeout(async () => {
            const newFavoriteStatus = !isFavorite;
            setIsFavorite(newFavoriteStatus);
            setIsSubmittingFavorite(false);

            const message = newFavoriteStatus ? 'Lưu việc làm thành công' : 'Đã bỏ lưu việc làm';
            setNotificationMessage(message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);

            try {
                const favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];
                const updatedFavoriteJobs = newFavoriteStatus
                    ? [...favoriteJobs, job]
                    : favoriteJobs.filter(item => item.id !== jobId);
                localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavoriteJobs));
            } catch (error) {
                console.error('Error handling favorite job: ', error);
            }
        }, 2000);
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
                    <p>Loại hình công việc: {job?.employmenttype.type}</p>
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
            <div className="mt-10">
                <h2 className="text-xl font-bold">Bình luận</h2>
                <div className="border-t mt-4 pt-4 flex flex-col">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Nhập bình luận của bạn..."
                        className="w-[60%] p-2 border rounded"
                    />
                    <button
                        onClick={handleSubmitComment}
                        disabled={isSubmittingComment}
                        className="mt-2 bg-green-600 text-white py-2 my-4 px-4 rounded hover:bg-green-500 w-[60px]"
                    >
                        {isSubmittingComment ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </div>
                <div className="mt-4">
                    {comments.length === 0 ? (
                        <p>Chưa có bình luận nào.</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex items-start mb-4">
                                <img
                                    src={comment.user.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full mr-4 border-2"
                                />
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">
                                        By: {comment.user.username}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {comment.created_date}
                                    </p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <h1 className="text-2xl font-bold mb-4">Rating</h1>
                <Ratings jobId={jobId}/>
            </div>
        </div>
    );
};

export default JobDetail;
