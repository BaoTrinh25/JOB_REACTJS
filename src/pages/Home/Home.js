import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import APIs, { endpoints } from "../../configs/APIs";
import TopLatestJob from "./TopLatestJob";
import TopPopular from "./TopPopular";
import { MyUserContext } from "../../configs/Context";
import SearchJobs from "./SearchJobs";

const Home = () => {
  const navigate = useNavigate();
  const user = useContext(MyUserContext);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState([
    "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/Vcu01VpymXxg6EtnOaA30ss1hEJKioiF_1721893835____6a876215f94305f140826c1af20c28ef.png",
    "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/BANNER%20(2).png"
  ]);

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handlePreviousBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleSearch = (keyword, location, career) => {
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&career=${encodeURIComponent(career)}`);
  };

  return (
    <div>
      {!user ? (
        <div 
          className="min-h-screen p-4 bg-cover bg-center relative"
          style={{ backgroundImage: `url('https://www.amyporterfield.com/wp-content/uploads/2020/05/AdobeStock_323973881-700x411.png')` }}
        >
          <div className="relative w-full h-full">
            <div className="container mx-auto text-center relative z-10 py-12">
              <h1 className="text-green-600 text-2xl font-bold mb-4">Tìm việc làm nhanh 24h, việc làm mới nhất tại thành phố Hồ Chí Minh.</h1>
              <p className="text-gray-600 mb-6">Tiếp cận 1,000+ tin tuyển dụng việc làm mới mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam</p>
              <div className="mt-6">
                <SearchJobs onSearch={handleSearch} />
              </div>
              <div className="relative mt-8">
                <img src={banners[currentBanner]} alt="Banner" className="w-full h-auto" />
                <button 
                  onClick={handlePreviousBanner} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={handleNextBanner} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : user.role === 0 ? (
        <div className="flex flex-col md:flex-row h-[70vh] items-center justify-between p-8">
          <div className="flex-1 max-w-md ">
            <h1 className="text-5xl text-orange-800 mb-10">Welcome JobSeeker</h1>
            <h2 className="text-3xl mb-6">Start looking for jobs that match your criteria!</h2>
            <Link to="/jobs">
              <button className="w-[90%] p-4 mb-4 border rounded-full bg-slate-300 hover:bg-slate-500 flex items-center justify-center hover:border-2 hover:border-yellow-500">
                <FaUser className="mr-2" /> FIND JOBS
              </button>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={"https://th.bing.com/th/id/OIP.PPfKbaw5Q3qTk6URIM983AHaEW?rs=1&pid=ImgDetMain"} alt="Background" className="max-w-full h-auto" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-[75vh] items-center justify-between p-10">
          <div className="flex-1 max-w-md ">
            <h1 className="text-5xl text-orange-800 mb-10">Welcome Employer</h1>
            <h2 className="text-3xl mb-6">Let's start creating recruitment posts to find suitable candidates for you!</h2>
            <Link to="/post-recruitment">
              <button className="w-[90%] p-4 mb-4 border rounded-full bg-slate-300 hover:bg-slate-500 flex items-center justify-center hover:border-2 hover:border-yellow-500">
                <FaBriefcase className="mr-2 " /> POST JOBS
              </button>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={"https://cdni.iconscout.com/illustration/premium/thumb/we-are-hiring-2645886-2218311.png"} alt="Background" className="max-w-full h-auto" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-orange-700">Công việc mới nhất</h2>
            <button onClick={() => navigate("/jobs")} className="bg-lime-500 font-semibold">
              Xem tất cả
            </button>
          </div>
          <TopLatestJob />
        </div>

        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-orange-700">Công việc phổ biến</h2>
            <button onClick={() => navigate("/jobs-popular")} className="bg-lime-500 font-semibold">
              Xem tất cả
            </button>
          </div>
          <TopPopular />
        </div>
      </div>
    </div>
  );
};

export default Home;
