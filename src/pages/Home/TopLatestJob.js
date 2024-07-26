import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Pagination, Autoplay } from 'swiper/modules';
import { fetchAllJob } from '../../configs/APIs';

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

    const sortedJobs = allJobs.slice(0, 12);
    setJobs(sortedJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderJobItem = (job) => (
    <div
      key={job.id}
      className="flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-7 border-2 border-lime-600 rounded-lg p-6 bg-yellow-50 mx-4 my-5 cursor-pointer h-[300px]"
      onClick={() => navigate(`/job-detail/${job.id}`)}
    >
      <img src={job.image} alt={job.title} className="w-32 h-24 rounded-sm border-2 border-cyan-900 mb-4" />
      <div className="flex-1 flex flex-col">
        <h2 className="font-bold">{job.title}</h2>
        <p className="text-red-800 text-sm">Deadline: {job.deadline}</p>
        <p className="text-sm">Kinh nghiệm: {job.experience}</p>
        <p className="text-sm">Khu vực: {job.area.name}</p>
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
    <div className="container mx-auto px-4">
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]} 
      >
        {jobs.map((job) => (
          <SwiperSlide key={job.id}>
            {renderJobItem(job)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopLatestJob;
