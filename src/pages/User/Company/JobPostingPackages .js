import React from 'react';
import Dashboard from '../../../assets/dashboard_employer.png';
import { getToken } from "../../../utils/storage";

const JobPostingPackages = () => {
  const BASE_URL = 'https://baotrinh.pythonanywhere.com';

  const handleCheckout = async (priceId, productName) => {
    try {
      const token = getToken();
      const response = await fetch(`${BASE_URL}/payment_stripe/payment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price_id: priceId, 
          product_item: productName
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Error:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="relative bg-lime-50">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 filter blur-sm z-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:flex-row h-72">
          <div className="text-center md:text-left md:max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">
              Tìm nhân sự <span className="text-orange-600">chất lượng</span> theo cách hoàn toàn mới!
            </h1>
            <p className="mb-8 text-sm">
              NakoJob giúp bạn tìm ứng viên phù hợp thật nhanh và hiệu quả. Hệ thống NakoJob giúp bạn tìm các ứng viên thích hợp, đồng thời có thể quản lý thông tin các ứng viên.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-8">
            <img
              src="https://www.careerslinked.com/wp-content/uploads/2021/06/top-international-job-sites.jpeg"
              alt="Dashboard"
              className="w-[70%] max-w-md shadow-lg rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="py-10 w-[70%] mx-auto">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold">
            TẠI SAO CHỌN <span className="text-green-600">CHÚNG TÔI</span>
          </h2>
          <p className="mt-4 text-sm">Các doanh nghiệp lựa chọn NakoJob để tuyển dụng nhân sự</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-28 px-10">
          <div className="text-center text-sm">
            <img src="https://employer.jobsgo.vn/media/img/tai-sao4.png" alt="1.600.000+" className="mx-auto mb-4" />
            <h3 className="font-bold">1.000.000+</h3>
            <p>Lượng ứng viên truy cập sử dụng hàng tháng</p>
          </div>
          <div className="text-center text-sm">
            <img src="https://joineight.ai/wp-content/uploads/2020/12/ede-2048x1365.png" alt="Tuyển dụng đa kênh" className="mx-auto w-[70%]" />
            <h3 className="text-sm font-bold">Tuyển dụng nhanh chóng</h3>
            <p>Kết nối và tiếp cận với hàng ngàn ứng viên, đăng bài nhanh chóng</p>
          </div>
          <div className="text-center text-sm">
            <img src="https://employer.jobsgo.vn/media/img/tai-sao3.png" alt="Support 24/7" className="mx-auto mb-4" />
            <h3 className="text-sm font-bold">Support 24/7</h3>
            <p>Đội ngũ CSKH tận tình luôn sẵn sàng hỗ trợ Khách hàng</p>
          </div>
        </div>
      </div>
      <div className="relative bg-lime-50">
        <div className="absolute inset-0 bg-cover bg-center opacity-50 filter blur-sm z-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:flex-row h-72">
          <div className="mt-5 md:mt-0 md:ml-8">
            <img
              src={Dashboard}
              alt="Dashboard"
              className="w-full max-w-md shadow-lg rounded-xl"
            />
          </div>
          <div className="text-center md:text-left md:max-w-2xl ml-10">
            <h1 className="text-sm font-bold mb-4 text-orange-600">
              Tự động hoá quy trình quản lý ứng viên
            </h1>
            <p className="mb-8 text-sm">
              Cho phép bạn quản lý toàn bộ các job đăng tuyển và ứng viên rất chi tiết và hiệu quả.
            </p>
            <p className="mb-8 text-sm">
              Hàng nghìn ứng viên biết đến môi trường làm việc, văn hoá, cũng như business của doanh nghiệp bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold">
            BÁO GIÁ DỊCH VỤ ĐĂNG TIN TUYỂN DỤNG CỦA <span className="text-green-600">NAKO JOB</span>
          </h2>
          <p className="mt-4 text-sm">Chúng tôi cung cấp nhiều dịch vụ giúp doanh nghiệp kết nối với ứng viên phù hợp hiệu quả & tối ưu chi phí</p>
        </div>
        <div className="flex flex-col justify-center items-start gap-8 px-auto mx-auto w-[70%]">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-3/4 mx-auto">
            <div className="flex items-center mb-4">
              <img src="https://employer.jobsgo.vn/media/img/standard.png" alt="Standard Package" className="w-1/3 mr-4" />
              <div>
                <h3 className="text-sm font-bold">Gói BASIC</h3>
                <p className="text-orange-600 text-sm">1,000,000VNĐ</p>
                <ul className="mt-2 text-left text-sm">
                  <li>✔️ Đăng tối đa 3 tin tuyển dụng mỗi ngày</li>
                  <li>✔️ Tin tuyển dụng online 10 ngày</li>
                </ul>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition"
                  onClick={() => handleCheckout('price_1PzKGiP5Uv4CEUblO9ioWAJR', 'BASIC')}
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-3/4 mx-auto">
            <div className="flex items-center mb-4">
              <div>
                <h3 className="text-sm font-bold">Gói PREMIUM</h3>
                <p className="text-orange-600 text-sm">2,200,000VNĐ</p>
                <ul className="mt-2 text-left text-sm">
                  <li>✔️ Đăng tối đa 5 tin tuyển dụng mỗi ngày</li>
                  <li>✔️ Tin tuyển dụng online 30 ngày</li>
                </ul>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition"
                  onClick={() => handleCheckout('price_1PzxBPP5Uv4CEUbl90Ahfe1O', 'PREMIUM')}
                >
                  MUA NGAY
                </button>
              </div>
              <img src="https://employer.jobsgo.vn/media/img/standard.png" alt="Silver Package" className="w-1/3 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default JobPostingPackages;