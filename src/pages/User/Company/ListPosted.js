import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import Modal from 'react-modal';
import { BiPencil, BiTrash } from 'react-icons/bi';
import SidebarEmployer from '../../../component/SidebarEmployer';

const ListPosted = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = getToken();
      const response = await APIs.get(endpoints['job_posted'], {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      if (data && Array.isArray(data)) {
        setJobs(data);
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

  return (
    <div className="flex h-screen">
      <SidebarEmployer />
      <div className="container mx-auto bg-slate-200 p-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-center">
              <thead>
                <tr className='bg-red-100'>
                  <th className="py-2 px-4 border-b">Tiêu đề</th>
                  <th className="py-2 px-4 border-b">Deadline</th>
                  <th className="py-2 px-4 border-b">Số lượng tuyển</th>
                  <th className="py-2 px-4 border-b">Edit</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td
                      className="py-2 px-4 border-b cursor-pointer text-black-600 text-left"
                      onClick={() => navigate(`/job-detail/${job.id}`)}
                    >
                      {job.title}
                    </td>
                    <td className="py-2 px-4 border-b">{job.deadline}</td>
                    <td className="py-2 px-4 border-b">{job.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-green-600"
                        onClick={() => navigate(`/edit-job/${job.id}`)}
                      >
                        <BiPencil className="h-5 w-5 mx-auto" />
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-red-600"
                        onClick={() => openDeleteModal(job.id)}
                      >
                        <BiTrash className="h-5 w-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Confirm Delete Job"
          className="bg-white rounded-lg p-8 max-w-md mx-auto mt-20 shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-bold mb-4">Xác nhận xóa bài viết</h2>
          <p className="mb-4">Bạn có chắc chắn muốn xóa bài viết này không?</p>
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
