import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import Modal from 'react-modal';
import { BiPencil, BiTrash, BiDotsHorizontalRounded, BiStreetView, BiDetail } from 'react-icons/bi';
import SidebarEmployer from '../../../component/SidebarEmployer';

const ListPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [applications, setApplications] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  console.log(jobs);
  
  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      //Lấy danh sách job đã đăng của nhà tuyển dụng
      const token = getToken();
      const response = await APIs.get(endpoints['job_posted'], {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data && Array.isArray(data)) {
        setJobs(data);

        // Lấy số lượng ứng viên apply vào một job
        const apps = {};
        for (const job of data) {
          const appResponse = await APIs.get(endpoints['num_application'](job.id))
          apps[job.id] = appResponse.data.num_applications;
        }
        setApplications(apps);
      } else {
        console.error('API response does not contain a results array');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  //xóa bài đăng 
  const handleDeleteJob = async () => {
    try {
      const token = getToken();
      const response = await APIs.delete(endpoints['delete_job'](jobToDelete), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        setIsDeleteModalOpen(false);
        setJobToDelete(null);
        handleRefresh();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchJobs();
  };

  const openDeleteModal = (jobId) => {
    setJobToDelete(jobId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  const toggleDropdown = (jobId) => {
    setDropdownOpen(dropdownOpen === jobId ? null : jobId);
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex h-auto min-h-screen bg-gray-100">
      <SidebarEmployer />
      <div className="flex-1 p-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
          </div>
        ) : (
          <div className="">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-green-700">QUẢN LÝ TUYỂN DỤNG</h2>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={() => navigate('/post-recruitment')}
              >
                + Đăng tin ngay
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-lg">
              <div className="flex gap-4">
                <select className="p-2 bg-white border border-gray-300 rounded-md">
                  <option value="">Tất cả tin đăng</option>
                  {/* Các option khác */}
                </select>
              </div>

              <div className="min-w-full bg-white shadow-md rounded-lg mt-4">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Tiêu đề bài đăng</th>
                      <th className="py-3 px-6 text-left">Thời hạn</th>
                      <th className="py-3 px-6 text-center">Lượt ứng tuyển</th>
                      <th className="py-3 px-6 text-center">Danh sách ứng viên</th>
                      <th className="py-3 px-6 text-center">Tùy chọn</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {jobs.map(job => (
                      <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td
                          className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                          onClick={() => navigate(`/job-detail/${job.id}`)}
                        >
                          <div className="flex items-center">
                            <span className="font-medium">{job.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">{new Date(job.deadline).toLocaleDateString()}</td>
                        <td className="py-3 px-6 text-center">{applications[job.id] || 0}</td>
                        <td 
                          className="py-3 px-6 text-center hover:text-red-700 text-blue-800 font-bold cursor-pointer" 
                          onClick={() => navigate(`/jobapplicants-list/${job.id}`)}>Xem</td>
                        <td className="py-3 px-6 text-center relative">
                          <button onClick={() => toggleDropdown(job.id)}>
                            <BiDotsHorizontalRounded className="h-6 w-6 text-gray-700" />
                          </button>
                          {dropdownOpen === job.id && (
                            <div
                              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                              ref={dropdownRef} // Attach ref to this dropdown
                            >
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                                onClick={() => navigate(`/update-post-recruitment/${job.id}`)}
                              >
                                <BiPencil className="h-5 w-5 mr-2" /> Sửa tin
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                                onClick={() => navigate(`/job-detail/${job.id}`)}
                              >
                                <BiDetail className="h-5 w-5 mr-2" />Xem bài đăng
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center hover:text-red-700"
                                onClick={() => openDeleteModal(job.id)}
                              >
                                <BiTrash className="h-5 w-5 mr-2" /> Ẩn bài đăng
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10">
                  <p className="text-lg font-bold text-black">Bạn chưa có tin tuyển dụng nào!</p>
                  <p className="text-sm text-gray-500 mb-4">Tạo tin đăng tuyển để tìm kiếm ứng viên ngay!</p>
                  <button
                    className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
                    onClick={() => navigate('/post-recruitment')}
                  >
                    Tạo tin ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Confirm Delete Job"
          className="bg-white rounded-lg p-8 max-w-md mx-auto mt-20 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-bold mb-4">Xác nhận ẩn bài viết</h2>
          <p className="mb-4">Bạn có chắc chắn muốn ẩn bài viết này không?</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md px-4 py-2 mr-2"
              onClick={closeDeleteModal}
            >
              Hủy
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
              onClick={handleDeleteJob}
            >
              Xóa
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListPosted;
