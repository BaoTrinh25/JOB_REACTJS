import React, { useEffect, useState } from 'react';
import { getToken } from '../../../utils/storage';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import { useNavigate } from 'react-router-dom';

const ListJobLiked = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();

    const fetchLikedJobs = async (pageNum) => {
        if (loading) return;
        setLoading(true);

        try {
            const token = getToken();
            const res = await authApi(token).get(endpoints['liked_job'](pageNum));
            const data = res.data;
            console.log(data);
            if (data && data.results) {
                setJobs(data.results);
                setPageCount(Math.ceil(data.count / 10));
            } else {
                console.error('API response does not contain a results array');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLikedJobs(pageNum);
    }, [pageNum]);

    const handleViewDetails = (jobId) => {
        navigate(`/job-detail/${jobId}`);
    };

    const handlePageChange = (newPageNum) => {
        if (newPageNum > 0 && newPageNum <= pageCount) {
            setPageNum(newPageNum);
        }
    };

    return (
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: `url(https://thumbs.dreamstime.com/z/vector-seamless-pattern-background-gold-wavy-line-modern-waves-texture-intricate-pipple-curly-stripe-repeating-contemporary-go-198527890.jpg)` }}>
            <div className="flex-grow p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        {jobs.map((like) => (
                            <div key={like.id} className="flex bg-purple-100 p-6 shadow-md rounded-lg group relative">
                                <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                                    <div className="w-full h-32 flex items-center justify-center mb-4">
                                        <img src={like.job.image} alt="Job" className="h-full object-cover rounded-md" />
                                    </div>
                                    <p className="mb-2 font-bold text-xl text-red-800">{like.job.title}</p>
                                    <p className="mb-2 text-lg text-gray-700">{like.job.company.companyName}</p>
                                </div>
                                <div className="w-2/3 bg-white p-6 ml-4 rounded-lg shadow-md">
                                    <h2 className="font-bold text-2xl mb-4 text-center">Thông tin công việc</h2>
                                    <p className="mb-4 text-lg">Địa chỉ: <span className='text-gray-500'>{like.job.company.address}</span></p>
                                    <p className="mb-4 text-lg">Ngày tạo: <span className='text-orange-400'> {like.job.created_date}</span></p>
                                </div>
                                <button
                                    onClick={() => handleViewDetails(like.job.id)}
                                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {pageCount > 1 && (
                    <div className="flex justify-center mt-4">
                        <button onClick={() => handlePageChange(pageNum - 1)} disabled={pageNum === 1} className="px-4 py-2 mx-2 bg-gray-300 rounded-lg">Previous</button>
                        <span className="px-4 py-2">{pageNum}</span>
                        <button onClick={() => handlePageChange(pageNum + 1)} disabled={pageNum === pageCount} className="px-4 py-2 mx-2 bg-gray-300 rounded-lg">Next</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ListJobLiked;
