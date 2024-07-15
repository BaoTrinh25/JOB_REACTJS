import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllJob } from '../configs/APIs';

const TopLatestJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    let allJobs = [];
    let currentPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      try {
        const data = await fetchAllJob(currentPage);
        if (data && Array.isArray(data.results)) {
          allJobs = [...allJobs, ...data.results];
          currentPage++;
          if (data.next === null) {
            hasMorePages = false;
          }
        } else {
          console.error('API response does not contain a results array');
          hasMorePages = false;
        }
      } catch (error) {
        console.error(error);
        hasMorePages = false;
      }
    }

    const sortedJobs = allJobs.slice(0, 4);
    setJobs(sortedJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderJobItem = (job) => (
    <div
      key={job.id}
      className="flex flex-col items-center mb-4 border-2 border-lime-600 rounded-lg p-4 bg-yellow-50 mx-5 cursor-pointer w-1/2"
      onClick={() => navigate(`/job-detail/${job.id}`)}
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

  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 flex">
      {jobs.map(renderJobItem)}
    </div>
  );
};

export default TopLatestJob;