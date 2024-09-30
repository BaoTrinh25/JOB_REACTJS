import React, { useState, useEffect, useContext, useRef } from 'react';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import avatar_local from '../../../assets/default_avatar.png';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from "../../../configs/Context";
import Modal from 'react-modal';
import { getToken } from '../../../utils/storage';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

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
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(null);
    const [selectedRatingId, setSelectedRatingId] = useState(null);
    const user = useContext(MyUserContext);
    const menuRef = useRef(null);
    const [editingRatingId, setEditingRatingId] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editComment, setEditComment] = useState('');
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const handleDeleteRating = async () => {
        try {
            const token = getToken();
            await authApi(token).delete(endpoints['delete_rating'](jobId, selectedRatingId));
            setRatings(ratings.filter((rating) => rating.id !== selectedRatingId));
            setSuccessModalIsOpen(true);
        } catch (error) {
            console.error('Error deleting rating:', error);
        } finally {
            setConfirmationModalIsOpen(false);
        }
    };

    const handleUpdateRating = async () => {
        try {
            const token = getToken();
            const response = await authApi(token).patch(endpoints['patch_rating'](jobId, editingRatingId), {
                rating: editRating,
                comment: editComment,
            });
            setRatings(ratings.map(r => r.id === editingRatingId ? response.data : r));
            setEditingRatingId(null);
            setSuccessModalIsOpen(true);
        } catch (error) {
            console.error('Error updating rating:', error);
        }
    };

    const handleEditComment = (rating) => {
        setEditingRatingId(rating.id);
        setEditRating(rating.rating);
        setEditComment(rating.comment);
        setMenuOpen(null);
    };

    const openConfirmationModal = (ratingId) => {
        setSelectedRatingId(ratingId);
        setConfirmationModalIsOpen(true);
        setMenuOpen(null);
    };

    const closeConfirmationModal = () => {
        setConfirmationModalIsOpen(false);
    };

    const closeSuccessModal = () => {
        setSuccessModalIsOpen(false);
    };

    const handleMenuToggle = (ratingId) => {
        setMenuOpen((prev) => (prev === ratingId ? null : ratingId));
    };

    const handleClose = () => {
        setModalIsOpen(false);
        navigate('/login');
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    console.log(ratings);


    const isCompany = user && user.role === 1;
    return (
        <div className="my-20">
            <h2 className="text-xl font-bold">Đánh giá và bình luận:</h2>
            <div className="border-t mt-4 pt-4 flex flex-col">
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            onClick={() => handleRatingChange(index + 1)}
                            className={`w-8 h-8 cursor-pointer transition-transform duration-200 transform hover:scale-110 ${index < newRating ? 'text-yellow-500' : 'text-gray-300'}`}
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
                    className={`mt-2 py-2 my-4 px-4 rounded w-[60px] ${isCompany ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'} text-white`}
                >
                    {isSubmittingComment ? 'Đang gửi...' : 'Gửi'}
                </button>
            </div>
            <div className="mt-4">
                {ratings.length === 0 ? (
                    <p>Chưa có bình luận nào.</p>
                ) : (
                    ratings.map((rating) => (
                        <div key={rating.id} className="flex items-start mb-4 w-[40%] relative">
                            <img
                                src={rating.user?.avatar ? rating.user?.avatar : avatar_local}
                                alt="avatar"
                                className="w-14 h-14 rounded-full mr-4 border-2 border-orange-200"
                            />
                            <div className="bg-red-50 p-4 rounded-lg w-full shadow-md hover:shadow-lg transition-shadow duration-300 relative">
                                <div className="flex flex-col">
                                    <p className="text-base text-black-600 mb-1">
                                        By: {rating.user?.username}
                                    </p>
                                    <p className="text-xs text-gray-500 mb-1">
                                        {rating.created_date}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-1 mb-2">
                                    {[...Array(5)].map((_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
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
                                <p>{rating.comment}</p>
                                {user && rating.user?.username === user?.username && (
                                    <div className="absolute top-2 right-2">
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => handleMenuToggle(rating.id)}
                                        >
                                            <FaEllipsisV className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                        </button>
                                        {menuOpen === rating.id && (
                                            <div ref={menuRef} className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-xl border z-10">
                                                <button
                                                    onClick={() => handleEditComment(rating)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                >
                                                    <FaEdit className="mr-2" /> Sửa
                                                </button>
                                                <button
                                                    onClick={() => openConfirmationModal(rating.id)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                                >
                                                    <FaTrash className="mr-2" /> Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Thông báo đăng nhập"
                className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-lg font-semibold mb-4">Bạn cần đăng nhập để thực hiện chức năng này.</h2>
                <div className="flex justify-end mt-6"> {/* Căn nút đóng sang phải */}
                    <button
                        onClick={handleClose}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
                    >
                        Đóng
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={confirmationModalIsOpen}
                onRequestClose={closeConfirmationModal}
                style={customStyles}
                contentLabel="Xác nhận xóa"
            >
                <h2>Bạn có chắc chắn muốn <span className='text-orange-600'>"xóa"</span> đánh giá này?</h2>
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={handleDeleteRating} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
                        Xóa
                    </button>
                    <button onClick={closeConfirmationModal} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500">
                        Hủy
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={successModalIsOpen}
                onRequestClose={closeSuccessModal}
                style={customStyles}
                contentLabel="Thông báo thành công"
            >
                <h2>Thao tác thành công!</h2>
                <button onClick={closeSuccessModal} className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">
                    Đóng
                </button>
            </Modal>

            {editingRatingId && (
                <Modal
                    isOpen={!!editingRatingId}
                    onRequestClose={() => setEditingRatingId(null)}
                    style={customStyles}
                    contentLabel="Sửa đánh giá"
                >
                    <h2 className='font-bold'>SỬA ĐÁNH GIÁ VÀ BÌNH LUẬN</h2>
                    <div className="flex flex-col mt-4">
                        <div className="flex space-x-1 mb-2">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    onClick={() => setEditRating(index + 1)}
                                    className={`w-6 h-6 cursor-pointer transition-transform duration-200 transform hover:scale-110 ${index < editRating ? 'text-yellow-500' : 'text-gray-300'}`}
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
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            className="p-2 border rounded mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingRatingId(null)}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleUpdateRating}
                                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
                            >
                                Hoàn tất
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Ratings;