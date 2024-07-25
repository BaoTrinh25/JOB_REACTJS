import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllJob } from '../../configs/APIs';
import SearchJobs from './SearchJobs';

const AllJobLatest = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

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
        if (data.results.length > 0) {
          setSelectedJob(data.results[0]);
        }
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

  const containsAllWords = (text, searchWords) => {
    return searchWords.every(word =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  // const search = (query) => {
  //   setSearchQuery(query);
  //   if (query.trim() === "") {
  //     setFilteredJobs(jobs);
  //   } else {
  //     const searchWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  //     const filtered = jobs.filter((job) =>
  //       containsAllWords(job.title, searchWords) ||
  //       containsAllWords(job.area.name, searchWords) ||
  //       containsAllWords(job.experience, searchWords) ||
  //       containsAllWords(job.company.companyName, searchWords) ||
  //       containsAllWords(job.career.name, searchWords) ||
  //       containsAllWords(job.employmenttype.type, searchWords) ||
  //       containsAllWords(`${job.title} ${job.area.name} ${job.experience} ${job.company.companyName} ${job.career.name} ${job.employmenttype.type}`, searchWords)
  //     );
  //     setFilteredJobs(filtered);
  //   }
  // };

  const handleSearch = (keyword, location) => {
    const filtered = jobs.filter(job =>
      (keyword === '' || job.title.includes(keyword) || job.company.companyName.includes(keyword)) &&
      (location === '' || job.area.name.includes(location))
    );
    setFilteredJobs(filtered);
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

  const shouldShowPagination = filteredJobs.length > 10;

  return (
    <div className="container mx-auto my-20">
      {/* <div className="my-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo title hoặc khu vực, lĩnh vực, tên cty, loại hình công việc, kinh nghiệm..."
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {searchQuery && (
        <p className="text-gray-600 mb-4">
          Tìm thấy {filteredJobs.length} kết quả cho "{searchQuery}"
        </p>
      )} */}
      <SearchJobs onSearch={handleSearch} />
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredJobs.slice((page - 1) * 10, page * 10).map(renderJobItem)}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600">
          <p>0 kết quả tìm kiếm</p>
        </div>
      )}
      {filteredJobs.length > 0 && shouldShowPagination && (
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
