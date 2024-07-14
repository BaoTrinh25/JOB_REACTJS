import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularJob } from '../configs/APIs';

const AllJobPopular = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async (pageNum = 1) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await fetchPopularJob(pageNum);
      if (data && Array.isArray(data)) {
        setJobs(data);
        setFilteredJobs(data);
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

  //Hàm containsAllWords kiểm tra xem tất cả các từ trong truy vấn có xuất hiện trong văn bản được tìm kiếm hay không.
  const containsAllWords = (text, searchWords) => {
    return searchWords.every(word =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  // Tìm kiếm theo tiêu đề + khu vực + kinh nghiệm công việc,........
  const search = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      //tách query thành các từ riêng biệt(cho phép tìm kiếm nhiều từ) và loại bỏ các khoảng trắng dư thừa.
      const searchWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
      const filtered = jobs.filter((job) =>
        containsAllWords(job.title, searchWords) ||
        containsAllWords(job.area.name, searchWords) ||
        containsAllWords(job.experience, searchWords) ||
        containsAllWords(job.company.companyName, searchWords) ||
        containsAllWords(job.career.name, searchWords) ||
        containsAllWords(job.employmenttype.type, searchWords) ||
        containsAllWords(`${job.title} ${job.area.name} ${job.experience} ${job.company.companyName} ${job.career.name} ${job.employmenttype.type}`, searchWords)
      );
      setFilteredJobs(filtered);
    }
  };
  // const search = (query) => {
  //   setSearchQuery(query);
  //   if (query === "") {
  //     setFilteredJobs(jobs);
  //   } else {
  //     const filtered = jobs.filter((job) =>
  //       job.title.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredJobs(filtered);
  //   }
  // };

  const renderJobItem = (job) => (
    <div
      key={job.id}
      className="flex flex-col items-center mb-4 border-2 border-lime-600 rounded-lg p-4 bg-yellow-50 mx-5 cursor-pointer w-1/4"
      onClick={() => navigate(`/job_detail/${job.id}`)}
    >
      <img src={job.image} alt={job.title} className="w-14 h-14 rounded-sm border-2 border-cyan-900 mb-4" />
      <div className="flex-1 items-center m-auto">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <p className="text-gray-600">Ngày đăng: {job.created_date}</p>
        <p className="text-red-800">Deadline: {job.deadline}</p>
        <p>Kinh nghiệm: {job.experience}</p>
        <p>Khu vực: {job.area.name}</p>
      </div>
    </div>
  );

  // ẩn các nút chuyển trang nếu danh sách chưa vượt quá 10 công việc trên 1 trang
  const shouldShowPagination = filteredJobs.length > 10;

  return (
    <div className="container mx-auto bg-slate-200 p-10">
      <div className="my-4">
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
      )}
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="container mx-auto px-4 flex">
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

export default AllJobPopular;
