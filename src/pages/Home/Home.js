import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUser } from 'react-icons/fa';
import APIs, {endpoints} from "../../configs/APIs";
import moment from "moment";
import TopLatestJob from "./TopLatestJob";
import TopPopular from "./TopPopular";
import { MyUserContext } from "../../configs/Context";

const Home = () => {
  const navigate = useNavigate();
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const user = useContext(MyUserContext);

  const loadTypes = async () => {
    try {
      let res = await APIs.get(endpoints['employmenttypes']);
      setEmploymentTypes(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const search = (value, callback) => {
    setPage(1);
    callback(value);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  return (
    <div>
      {!user ? (
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
              New to DDT JOB? <Link to="/login" className="text-blue-700">Join now</Link>
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img src={"https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"} alt="Background" className="max-w-full h-auto" />
        </div>
      </div>
      ) : user.role === 0 ? (
        <div className="flex flex-col md:flex-row h-[70vh] items-center justify-between p-8">
          <div className="flex-1 max-w-md ">
            <h1 className="text-5xl text-orange-800 mb-10">Welcome JobSeeker</h1>
            <h2 className="text-3xl mb-6"> Start looking for jobs that match your criteria!</h2>
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
            <h2 className="text-3xl mb-6"> Let's start creating recruitment posts to find suitable candidates for you!</h2>
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
