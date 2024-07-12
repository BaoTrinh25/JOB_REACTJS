import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import APIs, { endpoints } from '../configs/APIs';
import moment from "moment";
import "moment/locale/vi";
import { FaTag, FaHeart } from 'react-icons/fa';
import JobPopular from "./JobPopular";
import LatestJob from "./LatestJob";

const Home = () => {
  const navigate = useNavigate();
  const [companyTypes, setCompanyTypes] = useState([]);
  const [post, setPost] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  const loadTypes = async () => {
    try {
      let res = await APIs.get(endpoints['companytypes']);
      setCompanyTypes(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadPost = async () => {
    if (page > 0) {
      let url = `${endpoints["jobs"]}?title=${title}&type_id=${typeId}&page=${page}`;
      try {
        setLoading(true);
        let res = await APIs.get(url);
        if (page === 1) setPost(res.data.results);
        else if (page > 1)
          setPost((current) => {
            return [...current, ...res.data.results];
          });

        if (res.data.next === null) {
          setPage(0);
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    }
  };

  const search = (value, callback) => {
    setPage(1);
    callback(value);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  useEffect(() => {
    loadPost();
  }, [title, typeId, page]);

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen items-center justify-between p-8">
        <div className="flex-1 max-w-md ">
          <h1 className="text-5xl text-orange-800 mb-6">Welcome to your professional community</h1>
          <button className="w-full p-4 mb-4 border rounded-full border-gray-300 flex items-center justify-center hover:border-2 hover:border-gray-500">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="mr-2" />
            Continue with Google
          </button>
          <Link to="/login">
            <button className="w-full p-4 mb-4 border rounded-full border-gray-300 flex items-center justify-center hover:border-2 hover:border-gray-500">
              <FaUser className="mr-2" /> Sign in with Your Account
            </button>
          </Link>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-gray-600">
              By clicking Continue to join or sign in
            </p>
            <p className="text-sm text-gray-600 mt-4">
              New to LinkedIn? <Link to="/login" className="text-blue-700">Join now</Link>
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src={"https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"} alt="Background" className="max-w-full h-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex overflow-x-auto py-2 justify-center">
            <button
              onClick={() => search("", setTypeId)}
              className={`flex items-center px-4 py-2 rounded-full mr-5 ${!typeId ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
            >
              <FaHeart className="mr-2" />
              All
            </button>
            {companyTypes?.map((type) => (
              <button
                key={type.id}
                onClick={() => search(type.id, setTypeId)}
                className={`flex items-center px-4 py-2 rounded-full mr-2 ${type.id === typeId ? 'bg-lime-500 text-white' : 'bg-gray-200'}`}
              >
                <FaTag className="mr-2" />
                {type.type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bài đăng tuyển dụng..."
            value={title}
            onChange={(e) => search(e.target.value, setTitle)}
            className="w-full h-13 px-4 py-2 m-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-orange-700">Công việc mới nhất</h2>
            <button onClick={() => navigate("/jobs")} className="bg-lime-500 font-semibold">
              Xem tất cả
            </button>
          </div>
          <div className="flex overflow-x-auto space-x-4">
            {post.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-red-600 mb-2">Deadline: {moment(item.deadline).format('DD/MM/YYYY')}</p>
                <p className="text-gray-600 mb-1">{item.experience}</p>
                <p className="text-gray-600">{item.area.name}</p>
                <button
                  onClick={() => navigate(`/job_detail/${item.id}`)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-300"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
          <LatestJob />
         
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-orange-700">Công việc phổ biến</h2>
            <button onClick={() => navigate("/jobs")} className="bg-lime-500 font-semibold">
              Xem tất cả
            </button>
          </div>
          <LatestJob />
        </div>
       
       
      </div>
    </div>
  );
};

export default Home;
