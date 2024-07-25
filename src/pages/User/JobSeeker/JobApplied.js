import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIs, { authApi, endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';

const JobApplied = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = getToken(); 
      const response = await APIs.get(endpoints['job_applied'], {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      console.log(data)
      if (data && Array.isArray(data)) {
        setJobs(data);
        setFilteredJobs(data);
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
    fetchJobs();
  };

  const renderJobItem = (jobs) => (
    <div
      key={jobs.id}
      className="flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-7 border-2 border-lime-600 rounded-lg p-4 bg-yellow-50 mx-5 cursor-pointer w-full sm:w-1/3 md:w-1/4 lg:w-1/4"
      onClick={() => navigate(`/application-detail/${jobs.job.id}`)}
    >
      <img src={jobs.job.image} alt={jobs.job.title} className="w-14 h-14 rounded-sm border-2 border-cyan-900 mb-4" />
      <div className="flex-1 items-center m-auto">
        <h2 className="text-lg font-bold">{jobs.job.title}</h2>
        <p className="text-gray-600">Ngày đăng: {jobs.job.created_date}</p>
        <p className="text-red-800">Deadline: {jobs.job.deadline}</p>
        <p>Kinh nghiệm: {jobs.job.experience}</p>
        {/* <p>Khu vực: {job.area.name}</p> */}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto bg-slate-200 p-10">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : filteredJobs.length > 0 ? (
          <div className="container mx-auto px-4 flex flex-wrap justify-center">
            {filteredJobs.map(renderJobItem)}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600">
          <p>0 kết quả tìm kiếm</p>
        </div>
      )}
    </div>
  );
};

export default JobApplied;
