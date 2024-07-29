import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJobDetail } from '../../../configs/APIs';
import { useNavigate } from "react-router-dom";
import { MyUserContext } from '../../../configs/Context';


const ApplicationDetail = () => {
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
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getJobDetails();
    }, [jobId]);


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

            </div>
        </div>
    );
};

export default ApplicationDetail;
