import React, { useEffect, useState } from 'react';
import { fetchAllJob } from '../configs/APIs';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJobs = async (pageNum = 1) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await fetchAllJob(pageNum);
      if (data && Array.isArray(data.results)) {
        setJobs(data.results);
        setFilteredJobs(data.results);
        setPage(pageNum);
        setHasNextPage(!!data.next);
      } else {
        console.error('API response does not contain a results array');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchJobs(1);
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      fetchJobs(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchJobs(page - 1);
    }
  };

  // Tìm kiếm theo tiêu đề công việc
  const search = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const renderJobItem = (job) => (
    <div key={job.id} className="flex items-center mb-4 border-2 border-lime-600 rounded-lg p-4 bg-yellow-50 w-1/3">
      <img src={job.image} alt={job.title} className="w-12 h-12 rounded-3xl border-cyan-900 mr-4 border-2" />
      <div className="flex-1">
        <h2 className="text-lg font-serif">{job.title}</h2>
        <p className="text-orange-800">Deadline: {job.deadline}</p>
        <p>{job.experience}</p>
        <p>{job.area.name}</p>
      </div>
    </div>
  );

  // ẩn các nút chuyển trang nếu danh sách chưa vượt quá 10 công việc trên 1 trang
  const shouldShowPagination = filteredJobs.length > 10;

  return (
    <div className="container mx-auto p-4 pt-20 bg-slate-200">
      <h1 className='font-semibold'>Danh sách các bài tuyển dụng</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Tìm kiếm với title..."
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {filteredJobs.slice((page - 1) * 10, page * 10).map(renderJobItem)}
        </div>
      )}
      {shouldShowPagination && (
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

export default JobList;
