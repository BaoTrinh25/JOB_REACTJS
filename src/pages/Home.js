// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-between p-8">
      <div className="flex-1 max-w-md ">
        <h1 className="text-5xl text-orange-700 mb-6">Welcome to your professional community</h1>
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
  );
};

export default Home;
