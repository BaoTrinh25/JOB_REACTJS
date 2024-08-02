import React, { useState, useEffect, useContext } from 'react';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import defaultAvatar from '../../../assets/default_avatar.png';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../../../configs/Context";
import Modal from 'react-modal';
import { getToken } from '../../../utils/storage';

// Cấu hình CSS cho Modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

const Ratings = ({ jobId }) => {
    const [ratings, setRatings] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [loading, setLoading] = useState(true);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const user = useContext(MyUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await APIs.get(endpoints['rating'](jobId));
                setRatings(response.data.results);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, [jobId]);

    const handleRatingChange = (rating) => {
        setNewRating(rating);
    };

    const handleSubmitComment = async () => {
        if (!user) {
            setModalIsOpen(true);
            return;
        }
        setIsSubmittingComment(true);
        try {
            const token = getToken();
            const response = await authApi(token).post(endpoints['rating'](jobId), {
                rating: newRating,
                comment: newComment,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setRatings([...ratings, response.data]);
            setNewComment('');
            setNewRating(5);
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold">Đánh giá và bình luận:</h2>
            <div className="border-t mt-4 pt-4 flex flex-col">
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            onClick={() => handleRatingChange(index + 1)}
                            className={`w-8 h-8 cursor-pointer ${index < newRating ? 'text-yellow-500' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                d="M9.049 2.927c.3-.92 1.603-.92 1.903 0l1.482 4.564a1 1 0 00.95.69h4.771c.967 0 1.371 1.24.588 1.81l-3.838 2.787a1 1 0 00-.362 1.118l1.482 4.564c.3.92-.755 1.688-1.54 1.118l-3.838-2.787a1 1 0 00-1.176 0l-3.838 2.787c-.785.57-1.84-.198-1.54-1.118l1.482-4.564a1 1 0 00-.362-1.118L1.207 9.991c-.783-.57-.379-1.81.588-1.81h4.771a1 1 0 00.95-.69l1.482-4.564z"
                            />
                        </svg>
                    ))}
                </div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Nhập bình luận của bạn..."
                    className="w-[60%] p-2 border rounded mt-2"
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
                {ratings.length === 0 ? (
                    <p>Chưa có bình luận nào.</p>
                ) : (
                    ratings.map((rating) => (
                        <div key={rating.id} className="flex items-start mb-4 w-[40%] ">
                            <img
                                src={rating.user.avatar ? rating.user.avatar : defaultAvatar}
                                alt="avatar"
                                className="w-14 h-14 rounded-full mr-4 border-2 border-orange-200"
                            />
                            <div className="bg-red-50 p-4 rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex flex-col">
                                    <p className="text-base text-black-600 mb-1">
                                        By: {rating.user.username}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {rating.created_date}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-5 h-5 ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.92 1.603-.92 1.903 0l1.482 4.564a1 1 0 00.95.69h4.771c.967 0 1.371 1.24.588 1.81l-3.838 2.787a1 1 0 00-.362 1.118l1.482 4.564c.3.92-.755 1.688-1.54 1.118l-3.838-2.787a1 1 0 00-1.176 0l-3.838 2.787c-.785.57-1.84-.198-1.54-1.118l1.482-4.564a1 1 0 00-.362-1.118L1.207 9.991c-.783-.57-.379-1.81.588-1.81h4.771a1 1 0 00.95-.69l1.482-4.564z"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700">{rating.comment}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Thông báo"
                style={customStyles}
            >
                <h2 className="text-lg font-bold mb-4">Bạn cần đăng nhập!</h2>
                <p className="mb-4">Vui lòng đăng nhập để gửi bình luận và đánh giá.</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800"
                    >
                        Đăng nhập
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Đóng
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Ratings;
