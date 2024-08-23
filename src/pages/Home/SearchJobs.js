import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useFetchOptions from '../../configs/useEffects';

const SearchJobs = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [career, setCareer] = useState('');
  const { locations, careers } = useFetchOptions(); // Sử dụng useFetchOptions

  console.log(careers);

  const clearInput = () => {
    setKeyword('');
  };

  const handleSearch = () => {
    onSearch(keyword, location, career);  // Gọi hàm tìm kiếm với tất cả các tham số
  };

  return (
    <div className="container mx-auto my-8 flex justify-center">
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2 w-full max-w-4xl relative">
        <div className="flex flex-1 items-center">
          <FaSearch className='text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2 ' />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border-none rounded-full px-6 py-2 pl-12 focus:outline-none placeholder-gray-400"
            placeholder="Nhập từ khóa title"
          />
          {keyword && (
            <button
              className="absolute left-80 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={clearInput}
            >
              &#x2715;
            </button>
          )}
        </div>
        <div className="flex items-center mx-2">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="focus:outline-none text-gray-700 px-3 py-1 bg-transparent border-l border-gray-300 flex items-center"
          >
            <option value="">Chọn khu vực</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mx-2">
          <select
            value={career}
            onChange={(e) => setCareer(e.target.value)} // Sử dụng setCareer để cập nhật giá trị ngành nghề
            className="bg-transparent focus:outline-none text-gray-700 px-3 py-1 border-l border-gray-300 flex  items-center"
          >
            <option value="">Tất cả ngành nghề</option>
            {careers.map((care) => (
              <option key={care.id} value={care.name}>
                {care.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchJobs;
