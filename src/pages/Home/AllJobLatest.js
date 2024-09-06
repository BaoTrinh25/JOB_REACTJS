import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { fetchAllJob } from '../../configs/APIs';
import SearchJobs from './SearchJobs';
import SearchFilter from './SearchFilter'; // Import the new component

const AllJobLatest = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '', career: '' });
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();

  const fetchJobs = async (pageNum = 1, keyword = '', location = '', career = '') => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await fetchAllJob(pageNum, keyword, location, career);
      if (data && Array.isArray(data.results)) {
        setJobs(data.results);
        setPage(pageNum);
        setHasNextPage(!!data.next);
        setHasPrevPage(!!data.previous);
        // Sử dụng giá trị count để tính tổng số trang
        if (data.count > 0) {
          setTotalPages(Math.ceil(data.count / data.results.length)); // Total pages based on count and current result size
        } else {
          setTotalPages(0);
        }
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
    const queryParams = new URLSearchParams(routerLocation.search);
    const keyword = queryParams.get('keyword') || '';
    const locationValue = queryParams.get('location') || '';
    const career = queryParams.get('career') || '';
    setSearchParams({ keyword, location: locationValue, career });
    fetchJobs(1, keyword, locationValue, career);
  }, [routerLocation.search]);

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchJobs(page + 1, searchParams.keyword, searchParams.location, searchParams.career);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchJobs(page - 1, searchParams.keyword, searchParams.location, searchParams.career);
    }
  };

  const handleSearch = (keyword, location, career) => {
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&career=${encodeURIComponent(career)}`);
  };

  const renderJobItem = (job) => (
    <div
      key={job.id}
      className="flex flex-row items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4 border-2 border-lime-600 rounded-lg p-6 bg-yellow-50 mx-2 cursor-pointer w-5/6 sm:w-5/6 md:w-5/6 lg:w-5/6 h-40"
      onClick={() => navigate(`/job-detail/${job.id}`)}
    >
      <img src={job.image} alt={job.title} className="w-28 h-28 rounded-sm border-2 border-cyan-900 mr-4" />
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-base font-bold line-clamp-1">{job.title}</h2>
        <p className="text-gray-600 line-clamp-1">{job.company.companyName}</p>
        <p className="text-red-800">Deadline: {job.deadline}</p>
        <p className='line-clamp-1'>Kinh nghiệm: {job.experience}</p>
        <p>Khu vực: {job.area.name}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className='bg-slate-200 p-1' style={{ backgroundImage: `url('https://www.amyporterfield.com/wp-content/uploads/2020/05/AdobeStock_323973881-700x411.png')` }}>
        <SearchJobs onSearch={handleSearch} />
        <SearchFilter /> {/* Add the SearchFilter component */}
      </div>
      <div className='container mx-auto my-20'>
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
          <div className="flex justify-center items-center py-4">
            <button
              className={`text-gray-500 py-2 px-4 rounded ${page === 1 ? 'cursor-not-allowed' : ''}`}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              ← Previous
            </button>
            <div className="flex mx-4 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => fetchJobs(index + 1, searchParams.keyword, searchParams.location, searchParams.career)}
                  className={`${
                    page === index + 1
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500'
                    } px-3 py-2`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className={`text-gray-500 py-2 px-4 rounded ${!hasNextPage ? 'cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={!hasNextPage}
            >
              Next →
            </button>
          </div>

        )}
      </div>
    </div>
  );
};

export default AllJobLatest;