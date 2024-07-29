import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {fetchPopularJob } from '../../configs/APIs';
import SearchJobs from './SearchJobs';

const AllJobLatest = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '' });
  const navigate = useNavigate();

  const fetchJobs = async (pageNum = 1, keyword = '', location = '') => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await fetchPopularJob(pageNum, keyword, location);
      if (data && Array.isArray(data.results)) {
        setJobs(data.results);
        setPage(pageNum);
        setHasNextPage(!!data.next);
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
    fetchJobs();
  }, []);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchJobs(page + 1, searchParams.keyword, searchParams.location);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchJobs(page - 1, searchParams.keyword, searchParams.location);
    }
  };

  const handleSearch = (keyword, location) => {
    setSearchParams({ keyword, location });
    fetchJobs(1, keyword, location); // Tìm kiếm từ trang đầu tiên
  };

  const renderJobItem = (job) => (
    <div
      key={job.id}
      className="flex flex-row items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4 border-2 border-lime-600 rounded-lg p-6 bg-yellow-50 mx-2 cursor-pointer w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 h-40"
      onClick={() => navigate(`/job-detail/${job.id}`)}
    >
      <img src={job.image} alt={job.title} className="w-28 h-28 rounded-sm border-2 border-cyan-900 mr-4" />
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-base font-bold">{job.title}</h2>
        <p className="text-gray-600">Ngày đăng: {job.created_date}</p>
        <p className="text-red-800">Deadline: {job.deadline}</p>
        <p>Kinh nghiệm: {job.experience}</p>
        <p>Khu vực: {job.area.name}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto my-20">
      <SearchJobs onSearch={handleSearch} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : jobs.length > 0 ? (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {jobs.map(renderJobItem)}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600">
          <p>0 kết quả tìm kiếm</p>
        </div>
      )}
      {jobs.length > 0 && (
        <div className="flex justify-between items-center py-4">
          <button
            className={`bg-green-600 text-white py-2 px-4 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span className="text-lg">Trang {page}</span>
          <button
            className={`bg-green-600 text-white py-2 px-4 rounded ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNextPage}
            disabled={!hasNextPage}
          >
            Trang tiếp theo
          </button>
        </div>
      )}
    </div>
  );
};

export default AllJobLatest;
