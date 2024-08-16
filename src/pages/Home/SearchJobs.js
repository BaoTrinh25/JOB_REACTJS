import React, { useState, useEffect } from 'react';
import APIs, { endpoints } from '../../configs/APIs';

const SearchJobs = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [locations, setLocations] = useState([]);
  const [career, setCareers] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await APIs.get(endpoints["areas"]);
        setLocations(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCareers = async () => {
      try {
        const res = await APIs.get(endpoints["careers"]);
        setCareers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCareers();
    fetchLocation();
  }, []);

  const handleSearch = () => {
    onSearch(keyword, location, career);
  };

  return (
    <div className="container mx-auto my-8 flex justify-center">
      <div className="flex items-center w-full md:w-3/4 lg:w-2/3 bg-white p-2 shadow-md rounded-full">
        <div className="flex flex-1 items-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border-none rounded-full px-4 py-2 focus:outline-none placeholder-gray-400"
            placeholder="Vị trí tuyển dụng"
          />
        </div>
        <div className="flex items-center mx-2">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none bg-transparent focus:outline-none text-gray-700"
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
            onChange={(e) => setCareers(e.target.value)}
            className="border-none bg-transparent focus:outline-none text-gray-700"
          >
            <option value="">Tất cả ngành nghề</option>
            {career.map((career) => (
              <option key={career.id} value={career.name}>
                {career.name}
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
