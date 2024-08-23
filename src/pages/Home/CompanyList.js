import React, { useState } from 'react';
import useFetchOptions from '../../configs/useEffects';

const CompanyList = () => {
  const { companies } = useFetchOptions(); 
  const [currentIndex, setCurrentIndex] = useState(0);


  // Function to handle next button click
  //Kiểm tra vị trí hiện tại có đang ở vị trí cuối cùng của mảng hay không, nếu chưa thì thực hiện khối lệnh trong if
  const handleNext = () => {
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to handle previous button click
  //Kiểm tra vị trí hiện tại lớn hơn 0 thì thực hiện giảm vị trí hiện tại đi 1 và cập nhật trạng thái thông qua setCurrentIndex
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get the current company to display
  const currentCompanies = companies.slice(currentIndex, currentIndex + 4);

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-700">Top Công ty hàng đầu</h2>
        <div className="flex space-x-2">
          <button
            className="bg-white text-green-600 rounded-full shadow-lg p-2 hover:bg-green-100 disabled:opacity-50"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="bg-white text-green-600 rounded-full shadow-lg p-2 hover:bg-green-100 disabled:opacity-50"
            onClick={handleNext}
            disabled={currentIndex >= companies.length - 4}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto space-x-4">
        {currentCompanies.map((company, index) => (
          <div
            key={index}
            className="w-56 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center space-y-2"
          >
            <img src={company.logo} alt={company.companyName} className="w-24 h-24 object-contain" />
            <h3 className="text-lg font-bold text-center">{company.companyName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
