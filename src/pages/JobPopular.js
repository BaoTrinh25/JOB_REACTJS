import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularJob } from '../configs/APIs';

const JobPopular = () => {
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
        const data = await fetchPopularJob(currentPage);
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
      className="flex items-center mb-4 border-2 border-green-800 rounded-lg p-4 bg-indigo-50 cursor-pointer"
      onClick={() => navigate(`/job_detail/${job.id}`)}
    >
      <img src={job.image} alt={job.title} className="w-12 h-12 rounded-full mr-4" />
      <div className="flex-1">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <p className="text-red-800">Deadline: {job.deadline}</p>
        <p>{job.experience}</p>
        <p>{job.area.name}</p>
      </div>
    </div>
  );

  if (loading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {jobs.map(renderJobItem)}
    </div>
  );
};

export default JobPopular;