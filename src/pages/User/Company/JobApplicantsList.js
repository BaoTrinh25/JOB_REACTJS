import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIs, { endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import { FaFileAlt, FaUserCircle } from 'react-icons/fa';

const JobApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const token = getToken();
        const response = await APIs.get(endpoints['jobSeeker_applied'](jobId), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplicants(response.data);
        if (response.data.length > 0) {
          setJobTitle(response.data[0].job.title);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const openModal = (cvLink) => {
    setSelectedCV(cvLink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCV('');
  };

  if (error) return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">{jobTitle}</h1>
      <p className="text-2xl font-bold mb-6 text-gray-800">Danh sách các ứng viên</p>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {applicants.length === 0 ? (
            <div className="text-center text-gray-500">Hiện không có ứng viên nào cho công việc này.</div>
          ) : (
            <ul>
              {applicants.map(applicant => (
                <li key={applicant.id} className="border-b border-gray-200 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {applicant.user.avatar ? (
                        <img 
                          src={applicant.user.avatar} 
                          alt="Avatar" 
                          className="w-16 h-16 rounded-full mr-3"
                        />
                      ) : (
                        <FaUserCircle className="text-3xl text-gray-500 mr-3" />
                      )}
                      <div>
                        <div className='flex text-lg font-semibold mb-2 text-gray-700'>
                          <h2 className="pr-3">Ứng viên:</h2>
                          <p>{applicant.user.username}</p>
                        </div>
                        <div className='flex mb-2'>
                          <p className="font-semibold pr-3 text-gray-700">Thư giới thiệu:</p>
                          <span className="text-gray-600">
                            {stripHtml(applicant.content)}
                          </span>
                        </div>
                        <div className='flex'>
                          <p className="font-semibold pr-3 text-gray-700">Ngày ứng tuyển:</p>
                          <p className="text-gray-600">
                            {applicant.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => openModal(applicant.jobSeeker?.cv)}
                        className="flex items-center text-blue-700 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        <FaFileAlt className="mr-2" /> View CV
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full h-full max-w-4xl max-h-4xl overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
            >
              Close
            </button>
            <div className="w-full h-full flex justify-center items-center">
              <iframe
                src={selectedCV}
                className="w-full h-full transform scale-0.75"
                title="CV Viewer"
                style={{
                  transformOrigin: 'top left',
                  border: 'none'
                }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicantsList;
