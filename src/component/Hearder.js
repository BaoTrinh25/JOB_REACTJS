import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/job-seeker.png'
import { FaHome, FaBriefcase, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-teal-800 flex">
      <div className="w-50%] flex items-center">
        <div className="flex items-center ml-5">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-5" />
          <h1 className="text-orange-600 text-2xl font-bold">DTT JOB</h1>
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <nav className="p-4 flex justify-between items-center mr-5">
          <ul className="flex space-x-8">
            <li className="text-center group">
              <Link to="/" className="text-white group-hover:text-orange-600">
                <FaHome className="text-white group-hover:text-orange-600 mx-auto" />
                Home
              </Link>
            </li>
            <li className="text-center group">
              <Link to="/jobs" className="text-white group-hover:text-orange-600">
                <FaBriefcase className="text-white group-hover:text-orange-600 mx-auto" />
                Jobs
              </Link>
            </li>
            <li className="text-center group">
              <Link to="/about" className="text-white group-hover:text-orange-600">
                <FaInfoCircle className="text-white group-hover:text-orange-600 mx-auto" />
                About
              </Link>
            </li>
            <li className="text-center group">
              <Link to="/contact" className="text-white group-hover:text-orange-600">
                <FaEnvelope className="text-white mx-auto group-hover:text-orange-600" /> Contact
              </Link> 
            </li>
          </ul>
        </nav>
        <div className="h-10 w-px bg-gray-300"></div>
        <div>
            <Link to="/login" className="text-white hover:text-orange-600 mx-3">
              <FaSignInAlt className="inline mr-1" /> Sign in
            </Link>
            <Link to="/register" className="text-white hover:text-orange-600 mx-3 mr-7">
              <FaUserPlus className="inline mr-1" /> Register
            </Link>
          </div>
      </div>
    </header>
  );
};

export default Header;
