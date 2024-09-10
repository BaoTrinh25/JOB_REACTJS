import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIs, { endpoints } from "../../../configs/APIs";
import { getToken } from "../../../utils/storage";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";

const JobApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const token = getToken();
        const response = await APIs.get(endpoints["jobSeeker_applied"](jobId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    setSelectedCV("");
  };

  const handleAccept = async (applicantId) => {
    if (!window.confirm("Bạn có chắc chắn muốn chấp nhận ứng viên này?")) {
      return;
    }

    try {
      const token = getToken();
      const response = await APIs.patch(
        endpoints["update_status"](applicantId),
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Ứng viên đã được chấp nhận.");
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.id === applicantId
              ? { ...applicant, status: "Đã chấp nhận" }
              : applicant
          )
        );
      }
    } catch (error) {
      console.error("Error accepting applicant:", error);
    }
  };

  const handleReject = (applicantId) => {
    console.log("Từ chối ứng viên", applicantId);
  };

  const handleDelete = (applicantId) => {
    console.log("Xóa ứng viên", applicantId);
  };

  if (error)
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-6 text-center text-gray-800">
        {jobTitle}
      </h1>
      <p className="text-2xl mb-6 text-gray-800">Danh sách các ứng viên</p>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 mb-20">
          {applicants.length === 0 ? (
            <div className="text-center text-gray-500">
              Hiện không có ứng viên nào cho công việc này.
            </div>
          ) : (
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant.id} className="border-b border-gray-200 py-4">
                  <div className="flex justify-between items-start">
                    {/* User Information */}
                    <div className="w-1/3">
                      <div className="flex items-center">
                        {applicant.user.avatar ? (
                          <img
                            src={applicant.user.avatar}
                            alt="Avatar"
                            className="w-16 h-16 rounded-lg mr-3"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-500 mr-3" />
                        )}
                        <div>
                          <div className="flex text-lg font-semibold mb-2 text-gray-700">
                            <h2 className="pr-3">ỨNG VIÊN:</h2>
                            <p>{applicant.user.username}</p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Email:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user.email}
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Số điện thoại:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user.mobile}
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Giới tính:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user.gender === 0 ? "Nam" : "Nữ"}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Ngày ứng tuyển:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cover Letter */}
                    <div className="w-2/4 bg-red-50 p-4 rounded-lg text-center border-2">
                      <p className="font-semibold text-gray-700 mb-2">
                        Thư giới thiệu
                      </p>
                      <p className="text-gray-600 text-sm"><span className="pr-2">Nội dung:</span>
                        {stripHtml(applicant.content)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => openModal(applicant.user.jobSeeker.cv)}
                        className="flex items-center text-blue-700 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        <FaFileAlt className="mr-2" /> Xem CV
                      </button>
                      <button
                        onClick={() => handleAccept(applicant.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        {applicant.status === "Đã chấp nhận"
                          ? "Đã chấp nhận"
                          : "Chấp nhận"}
                      </button>
                      <button
                        onClick={() => handleReject(applicant.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleDelete(applicant.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Xóa
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 mt-19 pt-20">
          <div className="bg-white pt-8 p-2 rounded-lg w-full h-5/6 max-w-5xl max-h-3xl overflow-hidden relative">
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