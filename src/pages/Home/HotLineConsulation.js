import React from 'react';

const HotlineConsultation = () => {
  return (
    <div className="p-6 bg-green-50 rounded-lg shadow-lg mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center md:space-x-4">
          <div className="text-left">
            <h3 className="text-xl font-bold text-green-600">Hotline Tư Vấn</h3>
            <p className="text-gray-600">Dành cho Người tìm việc</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-2xl font-bold text-gray-900">Tìm việc khó đã có TopCV</p>
          <p className="text-green-600">(024) 6680 ****</p>
          <button className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
            GỌI NGAY
          </button>
          <p className="mt-2 text-gray-600">Email hỗ trợ Ứng viên: <a href="mailto:hotro@nako.vn" className="text-green-600">hotro@jobsg.vn</a></p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <img src="https://th.bing.com/th/id/OIP.jEUZdWs0u_yTeNsI6xynCAAAAA?rs=1&pid=ImgDetMain" alt="Support" className="w-24 h-24 rounded-full object-cover mr-4" />
          <img src="https://studyinukraine.gov.ua/wp-content/uploads/2022/03/hotline-phone.png" alt="Support" className="w-24 h-24 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default HotlineConsultation;
