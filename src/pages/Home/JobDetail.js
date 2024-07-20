import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobDetail } from '../../configs/APIs';
import { BiBookmark } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from '../../configs/Context';


const JobDetail = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSubmittingFavorite, setIsSubmittingFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
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

        getJobDetails();
    }, [jobId]);


    const handleApplyJob = async () => {
        if (user?.jobSeeker) {
          navigate(`/jobApplication/${jobId}`);
        } else {
          alert('Bạn cần đăng nhập!');
          navigate('/login');
        }
    };

    const handleToggleFavorite = async () => {
        // if (!user) {
        //   alert('Bạn cần đăng nhập để lưu công việc yêu thích!');
        //   history.push('/login');
        //   return;
        // }

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
        <div className="container mx-auto">
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
                    {showNotification && <div className="mt-4 text-green-500">{notificationMessage}</div>}
                </div>

            </div>
        </div>
    );
};

export default JobDetail;
