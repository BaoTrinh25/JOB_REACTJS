import React, { useEffect, useState } from 'react';
import SidebarEmployer from '../../../component/SidebarEmployer';
import { useParams, useNavigate } from 'react-router-dom';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import useFetchOptions from '../../../configs/useEffects';

const UpdatePostRecruitment = () => {
    const { jobId } = useParams();
    const { careers, employmenttypes } = useFetchOptions();
    const [loading, setLoading] = useState(false);
    const [initialJobDetail, setInitialJobDetail] = useState(null);
    const navigate = useNavigate();
    const [jobDetail, setJobDetail] = useState({
        title: '',
        career: {
            id: '',
            name: ''
        },
        employmenttype: {
            id: '',
            type: ''
        },
        salary: '',
        experience: '',
        quantity: '',
        deadline: '',
        location: '',
        description: ''
    });

    // Fetch job detail
    useEffect(() => {
        const fetchJobDetail = async () => {
            if (loading) return;
            setLoading(true);

            try {
                const token = getToken();
                const response = await APIs.get(endpoints['job_detail'](jobId), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInitialJobDetail(response.data);
                setJobDetail({
                    ...response.data,
                    career: {
                        id: response.data.career?.id || '',
                        name: response.data.career?.name || ''
                    },
                    employmenttype: {
                        id: response.data.employmenttype?.id || '',
                        type: response.data.employmenttype?.type || ''
                    }
                });
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJobDetail();
        }
    }, [jobId]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'deadline') {
            // Handle date conversion if needed here
            setJobDetail(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name.startsWith('career_')) {
            setJobDetail((prevState) => ({
                ...prevState,
                career: {
                    ...prevState.career,
                    [name.replace('career_', '')]: value
                }
            }));
        } else if (name.startsWith('employmenttype_')) {
            setJobDetail((prevState) => ({
                ...prevState,
                employmenttype: {
                    ...prevState.employmenttype,
                    [name.replace('employmenttype_', '')]: value
                }
            }));
        } else {
            setJobDetail(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const token = getToken();

            // Find the changes
            const updates = {};

            // Update career
            if (initialJobDetail.career?.name !== jobDetail.career.name) {
                updates.career = { name: jobDetail.career.name };
            }

            // Update employmenttype
            if (initialJobDetail.employmenttype?.type !== jobDetail.employmenttype.type) {
                updates.employmenttype = { type: jobDetail.employmenttype.type };
            }

            // Check for other fields if needed
            const otherFields = ['title', 'salary', 'experience', 'quantity', 'deadline', 'location', 'description'];
            otherFields.forEach(field => {
                if (initialJobDetail[field] !== jobDetail[field]) {
                    // Format deadline date
                    if (field === 'deadline' && jobDetail[field]) {
                        updates[field] = formatDate(jobDetail[field]);
                    } else {
                        updates[field] = jobDetail[field];
                    }
                }
            });

            await authApi(token).patch(endpoints['update_info_job'](jobId), updates);
            alert('Cập nhật thông tin thành công!');
            navigate("/job-posted");
        } catch (error) {
            console.error('Error updating job info', error);
            alert('Có lỗi xảy ra khi cập nhật!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex h-auto min-h-screen bg-gray-100">
            <SidebarEmployer />
            <div className="flex-1">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
                    </div>
                ) : (
                    <div className="w-[85%] mx-auto my-5 bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-green-600 mb-6">Chỉnh sửa tin tuyển dụng</h2>
                        <div>
                            {/* Tiêu đề */}
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-semibold mb-1">
                                    Tiêu đề tin tuyển dụng
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full p-2 border rounded"
                                    value={jobDetail.title || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex space-x-4 mb-4">
                                {/* Ngành nghề */}
                                <div className="flex-1">
                                    <label htmlFor="career_id" className="block font-semibold mb-1">
                                        Ngành nghề
                                    </label>
                                    <select
                                        id="career_id"
                                        name="career_id"
                                        value={jobDetail?.career?.id}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {careers.map(career => (
                                            <option key={career.id} value={career.id}>
                                                {career.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Loại hình công việc */}
                                <div className="flex-1">
                                    <label htmlFor="employmenttype_id" className="block font-semibold mb-1">
                                        Loại hình công việc
                                    </label>
                                    <select
                                        id="employmenttype_id"
                                        name="employmenttype_id"
                                        value={jobDetail?.employmenttype?.id}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        {employmenttypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Mức lương */}
                                <div className="flex-1">
                                    <label htmlFor="salary" className="block font-semibold mb-1">
                                        Mức lương
                                    </label>
                                    <select
                                        id="salary"
                                        name="salary"
                                        className="w-full p-2 border rounded"
                                        onChange={handleChange}
                                        value={jobDetail?.salary || '0'}
                                    >
                                        <option value="0">Thỏa thuận</option>
                                        <option value="1">Từ 1-2 triệu</option>
                                        <option value="2">Từ 2-5 triệu</option>
                                        <option value="3">Trên 5 triệu</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-4 mb-4">
                                {/* Kinh nghiệm */}
                                <div className="flex-1">
                                    <label htmlFor="experience" className="block font-semibold mb-1">
                                        Kinh nghiệm
                                    </label>
                                    <input
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        className="w-full p-2 border rounded"
                                        value={jobDetail?.experience || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="quantity" className="block font-semibold mb-1">
                                        Số lượng tuyển
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        className="w-full p-2 border rounded"
                                        value={jobDetail?.quantity || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="deadline" className="block font-semibold mb-1">
                                        Hạn nộp hồ sơ
                                    </label>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        className="w-full p-2 border rounded"
                                        value={jobDetail?.deadline || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Địa điểm, mô tả công việc */}
                            <div className="mb-4">
                                <label htmlFor="location" className="block font-semibold mb-1">
                                    Địa điểm làm việc
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="w-full p-2 border rounded"
                                    value={jobDetail?.location || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block font-semibold mb-1">
                                    Mô tả công việc
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    value={jobDetail?.description || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Nút Lưu */}
                            <button
                                onClick={handleUpdate}
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatePostRecruitment;
