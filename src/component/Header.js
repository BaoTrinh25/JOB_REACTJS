import React, { useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/job-seeker.png';
import { FaHome, FaBriefcase, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, FaUser, FaCaretDown, FaUserEdit, FaNotesMedical } from 'react-icons/fa';
import { MyUserContext, MyDispatchContext } from '../configs/Context';
import { Dropdown } from 'flowbite-react';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'logout' });
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-green-700 flex fixed w-full top-0 z-50">
      <div className="w-[30%] flex items-center">
        <Link to='/'>
          <div className="flex items-center ml-7">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-5" />
            <h1 className="text-white text-3xl font-bold font-serif">DTT JOB</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center ml-auto w-60%">
        <nav className="p-4 flex justify-between items-center mr-5">
          <ul className="flex space-x-8">
            <li className="text-center group">
              <Link to="/" className="text-white group-hover:text-yellow-400">
                <FaHome className="text-white group-hover:text-yellow-400 mx-auto" />
                Home
              </Link>
            </li>
            <li className="text-center group">
              <Link to="/jobs" className="text-white group-hover:text-yellow-400">
                <FaBriefcase className="text-white group-hover:text-yellow-400 mx-auto" />
                Jobs
              </Link>
            </li>
            {user && user.role === 0 ? (
              <>
                <li className="text-center group">
                  <Link to="/job-applied" className="text-white group-hover:text-yellow-400">
                    <FaNotesMedical className="text-white group-hover:text-yellow-400 mx-auto" />
                    Applied Job
                  </Link>
                </li>
                <li className="text-center group">
                  <Link to="/liked-job" className="text-white group-hover:text-yellow-400">
                    <AiFillLike className="text-white group-hover:text-yellow-400 mx-auto" />
                    Liked Job
                  </Link>
                </li>
              </>
            ) : user && user.role === 1 ? (
              <>
                <li className="text-center group">
                  <Link to="/post-job" className="text-white group-hover:text-yellow-400">
                    <FaInfoCircle className="text-white group-hover:text-yellow-400 mx-auto" />
                    Post a Job
                  </Link>
                </li>
                <li className="text-center group">
                  <Link to="/posted-jobs" className="text-white group-hover:text-yellow-400">
                    <FaEnvelope className="text-white group-hover:text-yellow-400 mx-auto" />
                    Job Posted 
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-center group">
                  <Link to="/about" className="text-white group-hover:text-yellow-400">
                    <FaInfoCircle className="text-white group-hover:text-yellow-400 mx-auto" />
                    About
                  </Link>
                </li>
                <li className="text-center group">
                  <Link to="/contact" className="text-white group-hover:text-yellow-400">
                    <FaEnvelope className="text-white group-hover:text-yellow-400 mx-auto" />
                    Contact
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="h-10 w-px bg-gray-300 mx-2"></div>

        <div>
          {user && user.role !== null ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<div className="text-white flex group m-3">
                <div className='flex flex-col items-center'>
                  <FaUser className="mr-2 my-1 group-hover:text-yellow-400" />
                  <span className="text-sm group-hover:text-yellow-400">
                    {user.role === 1 ? "Employer Profile" : "Applicant Profile"}
                  </span>
                </div>
                <FaCaretDown className="ml-1 group-hover:text-yellow-400 mt-auto" />
              </div>}
            >
              <Dropdown.Item onClick={() => handleNavigation(user.role === 1 ? "/employer-profile" : "/applicant-profile")}>
                <div className="flex items-center">
                  <FaUserEdit className="mr-2" /> My Profile
                </div>
              </Dropdown.Item>

              <Dropdown.Item onClick={handleLogout}>
                <div className='group flex'>
                  <FaSignInAlt className="mr-2 mt-1" />
                  <span>Log out</span>
                </div>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-400">
                <FaSignInAlt className="inline mr-1" /> Sign in
              </Link>
              <Link to="/register" className="text-white hover:text-yellow-400 mx-3 mr-7">
                <FaUserPlus className="inline mr-1" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
