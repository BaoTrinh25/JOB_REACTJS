// import React, { useState } from 'react';

// // Dữ liệu giả lập
// const mockJobs = [
//   { id: 1, title: 'Frontend Developer', company: 'Tech Co.', location: 'New York', salary: '$80,000 - $120,000' },
//   { id: 2, title: 'Backend Engineer', company: 'Data Systems', location: 'San Francisco', salary: '$90,000 - $140,000' },
//   { id: 3, title: 'Full Stack Developer', company: 'StartUp Inc.', location: 'Remote', salary: '$70,000 - $110,000' },
//   { id: 4, title: 'UI/UX Designer', company: 'Creative Agency', location: 'London', salary: '$60,000 - $100,000' },
//   { id: 5, title: 'Data Scientist', company: 'AI Research', location: 'Boston', salary: '$100,000 - $150,000' },
// ];

// const JobList = () => {
//   const [jobs, setJobs] = useState(mockJobs);

//   return (
//     <div className="container mx-auto p-4 bg-slate-300">
//       <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
//       <div className="grid gap-4">
//         {jobs.map((job) => (
//           <div key={job.id} className="bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold">{job.title}</h2>
//             <p className="text-gray-600">{job.company}</p>
//             <div className="mt-2">
//               <span className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2">
//                 {job.location}
//               </span>
//               <span className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-1">
//                 {job.salary}
//               </span>
//             </div>
//             <button className="mt-4 bg-cyan-900 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 ">
//               Apply Now
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobList;
import React, { useEffect, useState } from 'react';
import { fetchPopularJobs } from '../configs/APIs';

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
      const data = await fetchPopularJobs(pageNum);
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
    <div key={job.id} className="flex items-center mb-4 border-2 border-green-800 rounded-lg p-4 bg-green-300 w-full">
      <img src={job.image} alt={job.title} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{job.title}</h2>
        <p className="text-red-600">Deadline: {job.deadline}</p>
        <p>{job.experience}</p>
        <p>{job.area.name}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 bg-slate-300">
      <header className="flex items-center justify-between bg-green-600 p-4 text-white">
        <button onClick={() => window.history.back()} className="text-white">Back</button>
        <h1 className="text-2xl">Công việc phổ biến</h1>
      </header>
      <div className="my-4">
        <input
          type="text"
          placeholder="Nhập từ khóa..."
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
          {filteredJobs.map(renderJobItem)}
        </div>
      )}
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
    </div>
  );
};

export default JobList;
