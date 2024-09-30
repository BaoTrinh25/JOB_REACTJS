import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa';
import TopLatestJob from "./TopLatestJob";
import TopPopular from "./TopPopular";
import { MyUserContext } from "../../configs/Context";
import SearchJobs from "./SearchJobs";
import CompanyList from "./CompanyList";
import HotlineConsultation from "./HotLineConsulation";

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
    <div className="bg-slate-100">
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
        <div className="flex flex-col md:flex-row h-[70vh] items-center justify-between p-8 pl-10 bg-slate-200">
          <div className="flex-1 max-w-md ">
            <h1 className="text-4xl text-orange-800 mb-10">Chào mừng Ứng Viên, {user.username}</h1>
            <h2 className="text-xl mb-6">Ứng tuyển 1 chạm - Mọi lúc mọi nơi</h2>
            <h2 className="text-xl mb-6">Bắt đầu tìm kiếm công việc phù hợp với tiêu chí của bạn!</h2>
            <Link to="/jobs">
              <button className="w-[90%] p-4 mb-4 border rounded-full bg-slate-300 hover:bg-slate-500 flex items-center justify-center hover:border-2 hover:border-yellow-500">
                <FaUser className="mr-2" /> FIND JOBS
              </button>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={"https://www.pngkey.com/png/full/224-2241610_job.png"} alt="Background" className="max-w-xl h-auto" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row h-[75vh] items-center justify-between p-10 bg-slate-200">
          <div className="flex-1 max-w-md mt-10">
            <h1 className="text-5xl text-orange-800 mb-7">Chào mừng Nhà Tuyển Dụng, {user.username}</h1>
            <h2 className="text-2xl mb-6">Nơi gặp gỡ giữa doanh nghiệp
              và 1 triệu ứng viên chất lượng!</h2>
            <h3 className="text-lg mb-6">Tuyển người dễ dàng với NAKO - Chúng tôi luôn có ứng viên phù hợp cho bạn</h3>
            <Link to="/post-recruitment">
              <button className="w-[90%] p-4 mb-4 border rounded-full bg-slate-300 hover:bg-slate-500 flex items-center justify-center hover:border-2 hover:border-yellow-500">
                <FaBriefcase className="mr-2 " /> ĐĂNG TIN NGAY
              </button>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <img src={"https://ntd.vieclam24h.vn/_next/image?url=%2Fimg%2Flanding_page_right.png&w=750&q=75"} alt="Background" className="max-w-[90%] h-auto" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <div className="flex justify-center items-center mb-10">
          <TopLatestJob />
        </div>

        <div className="flex justify-center items-center">
          <TopPopular />
        </div>

        <div className="mt-10 flex justify-center items-center">
          <CompanyList />
        </div>
        <div className="mt-10">
          <HotlineConsultation />
        </div>
      </div>
    </div>
  );
};

export default Home;
