import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/job-seeker.png';
import { FaHome, FaBriefcase, FaSignInAlt, FaUserPlus, FaUser, FaCaretDown, FaUserEdit, FaNotesMedical, FaShoppingCart, FaFacebookMessenger, FaListUl } from 'react-icons/fa';
import { MyUserContext, MyDispatchContext } from '../configs/Context';
import { Dropdown } from 'flowbite-react';
import { BsFileEarmarkPost, BsFillBookmarkFill } from 'react-icons/bs';
import ChatBox from '../pages/User/ChatBox';
import avatar_default from '../assets/default_avatar.png';

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigate = useNavigate();
  const [showChatList, setShowChatList] = useState(false);
  const chatDropdownRef = useRef(null);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentJobId, setCurrentJobId] = useState(null);


  useEffect(() => {
    if (user) {
      const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user.id}/`);

      newSocket.onopen = () => {
        console.log("WebSocket Connected");
        newSocket.send(JSON.stringify({
          type: "user_chat_rooms",
          user_id: user.id
        }));
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "user_chat_rooms") {
          setChatRooms(data.rooms);
          console.log(data.rooms);
          
        }
      };

      newSocket.onclose = () => console.log("WebSocket Disconnected");

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("user");
    dispatch({ type: 'logout' });
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSelectChatUser = (selectedUser, jobId) => {
    setShowChatList(false);
    setCurrentChatUser(selectedUser);
    setCurrentJobId(jobId);
  };

  const closeChatBox = () => {
    setCurrentChatUser(null);
    setCurrentJobId(null);
  };

  // Close chat list when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatDropdownRef.current && !chatDropdownRef.current.contains(event.target)) {
        setShowChatList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <>
      <header className="bg-green-700 flex fixed w-full top-0 z-50">
        <div className="w-[30%] flex items-center">
          <Link to='/'>
            <div className="flex items-center ml-7">
              <img src={logo} alt="Logo" className="h-12 w-12 mr-5" />
              <h1 className="text-white text-3xl font-bold font-serif">NAKO JOB</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center ml-auto w-60%">
          <nav className="p-4 flex justify-between items-center mr-5">
            <ul className="flex space-x-8">
              {!user || user.role === 0 ? (
                <>
                  <li className="text-center group">
                    <Link to="/" className="text-white group-hover:text-yellow-400">
                      <FaHome className="text-white group-hover:text-yellow-400 mx-auto" />
                      Trang chủ
                    </Link>
                  </li>
                  <li className="text-center group">
                    <Link to="/jobs" className="text-white group-hover:text-yellow-400">
                      <FaBriefcase className="text-white group-hover:text-yellow-400 mx-auto" />
                      Việc làm
                    </Link>
                  </li>
                </>
              ) : null}
              {user && user.role === 0 ? (
                <>
                  <li className="text-center group">
                    <Link to="/job-applied" className="text-white group-hover:text-yellow-400">
                      <FaNotesMedical className="text-white group-hover:text-yellow-400 mx-auto" />
                      Việc làm đã ứng tuyển
                    </Link>
                  </li>
                  <li className="text-center group">
                    <Link to="/liked-job" className="text-white group-hover:text-yellow-400">
                      <BsFillBookmarkFill className="text-white group-hover:text-yellow-400 mx-auto" />
                      Việc làm đã lưu
                    </Link>
                  </li>
                  <li className="text-center group relative" ref={chatDropdownRef}>
                    <button
                      onClick={() => setShowChatList(!showChatList)}
                      className="text-white group-hover:text-yellow-400"
                    >
                      <FaFacebookMessenger className="text-white group-hover:text-yellow-400 mx-auto" />
                      Nhắn tin
                    </button>

                    {showChatList && (
                      <div className="absolute right-0 mt-2 w-80 bg-teal-50 rounded-md shadow-lg z-50 border-2 border-orange-200">
                        <div>
                          <div className="px-4 py-2 border-b rounded-md border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700">Tin nhắn</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {chatRooms.map((room) => (
                              <div
                                key={room.room_id}
                                className="flex items-center p-2 hover:bg-teal-100 cursor-pointer border-b border-gray-200"
                                onClick={() => handleSelectChatUser(room.sender_user, room.job_id)}
                              >
                                <img
                                  src={room.sender_user.avatar || avatar_default}
                                  alt="Avatar"
                                  className="w-10 h-10 rounded-full mr-3"
                                />
                                 <div className="flex flex-col items-start">
                                  <p className="font-semibold">{room.sender_user?.username}</p>
                                  <p className="text-xs text-red-800">{room.job_title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                </>
              ) : user && user.role === 1 ? (
                <>
                  <li className="text-center group">
                    <Link to="/package" className="text-white group-hover:text-yellow-400">
                      <FaShoppingCart className="text-white group-hover:text-yellow-400 mx-auto" />
                      Gói đăng tin
                    </Link>
                  </li>
                  <li className="text-center group">
                    <Link to="/post-recruitment" className="text-white group-hover:text-yellow-400">
                      <BsFileEarmarkPost className="text-white group-hover:text-yellow-400 mx-auto" />
                      Đăng bài
                    </Link>
                  </li>
                  <li className="text-center group relative" ref={chatDropdownRef}>
                    <button
                      onClick={() => setShowChatList(!showChatList)}
                      className="text-white group-hover:text-yellow-400"
                    >
                      <FaFacebookMessenger className="text-white group-hover:text-yellow-400 mx-auto" />
                      Nhắn tin
                    </button>

                    {showChatList && (
                      <div className="absolute right-0 mt-2 w-80 bg-teal-50 rounded-md shadow-lg z-50 border-2 border-orange-200">
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 ">Tin nhắn</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            {chatRooms.map((room) => (
                              <div
                                key={room.room_id}
                                className="flex items-center p-2 hover:bg-teal-100 cursor-pointer border-b border-gray-200"
                                onClick={() => handleSelectChatUser(room.sender_user, room.job_id)}
                              >
                                <img
                                  src={room.sender_user.avatar || avatar_default}
                                  alt="Avatar"
                                  className="w-10 h-10 rounded-full mr-3"
                                />
                                 <div className="flex flex-col items-start">
                                  <p className="font-semibold">{room.sender_user?.username}</p>
                                  <p className="text-xs text-red-800">{room.job_title}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                  <li className="text-center group">
                    <Link to="/job-posted" className="text-white group-hover:text-yellow-400">
                      <FaListUl className="text-white group-hover:text-yellow-400 mx-auto" />
                      Bảng điều khiển
                    </Link>
                  </li>
                </>
              ) : null}
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
                      {user.role === 1 ? "Nhà tuyển dụng" : "Ứng Viên"}
                    </span>
                  </div>
                  <FaCaretDown className="ml-1 group-hover:text-yellow-400 mt-auto" />
                </div>}
              >
                <Dropdown.Item onClick={() => handleNavigation(user.role === 1 ? "/employer-profile" : "/applicant-profile")}>
                  <div className="flex items-center">
                    <FaUserEdit className="mr-2" /> Hồ sơ
                  </div>
                </Dropdown.Item>

                <Dropdown.Item onClick={handleLogout}>
                  <div className='group flex'>
                    <FaSignInAlt className="mr-2 mt-1" />
                    <span>Đăng xuất</span>
                  </div>
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-yellow-400">
                  <FaSignInAlt className="inline mr-1" /> Đăng nhập
                </Link>
                <Link to="/register" className="text-white hover:text-yellow-400 mx-3 mr-7">
                  <FaUserPlus className="inline mr-1" /> Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {currentChatUser && (
        <ChatBox
          currentChatUser={currentChatUser}
          currentUser={user}
          jobId={currentJobId}
          onClose={closeChatBox}
        />
      )}
    </>
  );
};

export default Header;
