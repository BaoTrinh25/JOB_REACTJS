import React, { useEffect, useState } from 'react';
import { getToken } from '../../../utils/storage';
import { authApi, endpoints } from '../../../configs/APIs';
import { useNavigate } from 'react-router-dom';
import SidebarApplicant from '../../../component/SidebarApplicant';

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
            <SidebarApplicant className="flex-shrink-0" />
            <div className="flex-grow p-8 bg-white bg-opacity-90 rounded-lg shadow-lg overflow-y-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                ) : (
                    <div className='border-2 shadow-lg bg-gray-50 bg-opacity-90 rounded-lg p-4'>
                        <div className='text-3xl pl-4 text-green-700'> VIỆC LÀM ĐÃ LƯU</div>
                        <div class="border-t border-gray-300 my-4"></div>
                        <div className="grid grid-cols-1 gap-6 mt-6">
                            {jobs.map((like) => (
                                <div key={like.id} className="flex bg-purple-100 p-3 shadow-md rounded-lg group relative max-h-52">
                                    <div className="w-1/4 bg-slate-300 p-2 rounded-lg shadow-md">
                                        <div className="w-full h-32 flex items-center justify-center mb-2">
                                            <img src={like.job.image} alt="Job" className="h-full object-cover rounded-md" />
                                        </div>
                                        
                                        <p className="mb-2 text-xl text-center text-gray-700">{like.job.company.companyName}</p>
                                    </div>
                                    <div className="w-3/4 bg-white p-6 ml-4 rounded-lg shadow-md">
                                        <p className="mb-2 font-bold text-xl text-red-800">{like.job.title}</p>
                                        <p className="mb-2 text-sm">Địa chỉ: <span className='text-gray-700'>{like.job.company.address}</span></p>
                                        <p className="mb-2 text-sm">Nghề nghiệp: <span className='text-gray-700'>{like.job.career.name}</span></p>
                                        <p className="mb-2 text-sm">Loại công việc: <span className='text-gray-700'>{like.job.employmenttype.type}</span></p>
                                        <p className="mb-2 text-sm">Hạn cuối: <span className='text-orange-400'> {like.job.deadline}</span></p>

                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(like.job.id)}
                                        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white text-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            ))}
                        </div>
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
