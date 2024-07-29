import React, { useState } from 'react';

const SearchJobs = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(keyword, location);
  };

  return (
    <div className="container mx-auto my-8 flex justify-center">
      <div className="flex flex-col md:flex-row items-center w-full md:w-3/4 lg:w-2/3 bg-white p-4 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row w-full md:w-2/3 lg:w-3/4 items-center">
          <div className="flex flex-col w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label htmlFor="keyword" className="mb-2 font-semibold text-gray-700">Từ khóa</label>
            <div className="relative">
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Tên việc, công ty, từ khóa"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.386 4.387a1 1 0 01-1.415 1.414l-4.386-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label htmlFor="location" className="mb-2 font-semibold text-gray-700">Địa điểm</label>
            <div className="relative">
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
                placeholder="Thành phố, quận, huyện"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center md:justify-end mt-4 md:mt-0">
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Tìm việc làm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
