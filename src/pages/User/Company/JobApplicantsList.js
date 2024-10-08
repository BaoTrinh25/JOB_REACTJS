import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import APIs, { authApi, endpoints } from "../../../configs/APIs";
import { getToken } from "../../../utils/storage";
import { FaCommentDots, FaFileAlt, FaUserCircle } from "react-icons/fa";
import { MyUserContext } from "../../../configs/Context";
import ChatBox from "../ChatBox";
import ConfirmModal from "../../../component/ConfirmModal";
import NotificationModal from "../../../component/NotificationModal";

const JobApplicantsList = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState("");
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const user = useContext(MyUserContext);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");


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
        console.log(response.data);

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

  const openConfirmModal = (applicantId, action) => {
    setSelectedApplicant(applicantId);
    setConfirmAction(action);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedApplicant(null);
    setConfirmAction(null);
  };

  const handleConfirmAccept = async () => {
    if (selectedApplicant) {
      try {
        const token = getToken();
        const response = await authApi(token).patch(
          endpoints["update_status"](jobId, selectedApplicant),
          { status: "Accepted" }
        );

        if (response.status === 200) {
          setApplicants((prevApplicants) =>
            prevApplicants.map((applicant) =>
              applicant.id === selectedApplicant
                ? { ...applicant, status: 2 }
                : applicant
            )
          );
          setNotificationMessage("Ứng viên đã được chấp nhận thành công.");
          setNotificationModalOpen(true);
        }
      } catch (error) {
        console.error("Error accepting applicant:", error);
        setNotificationMessage("Đã xảy ra lỗi khi chấp nhận ứng viên.");
        setNotificationModalOpen(true);
      } finally {
        closeConfirmModal();
      }
    }
  };

  const handleConfirmReject = async () => {
    if (selectedApplicant) {
      try {
        const token = getToken();
        const response = await authApi(token).patch(
          endpoints["update_status"](jobId, selectedApplicant),
          { status: "Rejected" }
        );

        if (response.status === 200) {
          setApplicants((prevApplicants) =>
            prevApplicants.map((applicant) =>
              applicant.id === selectedApplicant
                ? { ...applicant, status: 3 }
                : applicant
            )
          );
          setNotificationMessage("Ứng viên đã bị từ chối thành công.");
          setNotificationModalOpen(true);
        }
      } catch (error) {
        console.error("Error rejecting applicant:", error);
        setNotificationMessage("Đã xảy ra lỗi khi từ chối ứng viên.");
        setNotificationModalOpen(true);
      } finally {
        closeConfirmModal();
      }
    }
  };

  const openChatBox = (applicant) => {
    if (!chatBoxOpen) {
      setCurrentChatUser(applicant.user);
      setChatBoxOpen(true);
    } else {
      setChatBoxOpen(false);
      setCurrentChatUser(null);
    }
  };

  const closeChatBox = () => {
    setChatBoxOpen(false);
    setCurrentChatUser(null);
  };

  const openModal = (cvLink) => {
    setSelectedCV(cvLink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCV("");
  };

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="container mx-auto p-4 bg-cover bg-center w-full min-h-screen" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/wall-blank-paper-frame-with-acorn-decoration_53876-105706.jpg?w=996&t=st=1727511578~exp=1727512178~hmac=5c37806fb505d3257e983bfedabda531ab3125918e7c3818576398545c519050')" }}>
      <h1 className="text-3xl font-bold my-10 text-center text-red-900">
        {jobTitle}
        <p className="text-lg my-7 text-gray-600">____Danh sách các ứng viên____</p>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      ) : (
        <div className="bg-gray-200 shadow-lg rounded-lg p-6 border-2 border-orange-200 ml-24 my-10 w-[70%]">
          {applicants.length === 0 ? (
            <div className="text-center text-gray-500">
              Hiện không có ứng viên nào cho công việc này.
            </div>
          ) : (
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant.id} className="border-b border-black py-4">
                  <div className="flex justify-between items-start">
                    <div className="w-1/3 pr-4">
                      <div className="flex items-center">
                        {applicant.user?.avatar ? (
                          <img
                            src={applicant.user?.avatar}
                            alt="Avatar"
                            className="w-20 h-20 rounded-ls mr-3"
                          />
                        ) : (
                          <FaUserCircle className="text-3xl text-gray-500 mr-3" />
                        )}
                        <div>
                          <div className="flex text-sm font-semibold mb-2 text-yellow-700">
                            <h2 className="pr-1">ỨNG VIÊN:</h2>
                            <p>{applicant.user?.username}</p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Email:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user?.email}
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-1 text-gray-700 text-sm">
                              SĐT:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user?.mobile}
                            </p>
                          </div>
                          <div className="flex mb-2">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Giới tính:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant.user?.gender === 0 ? "Nam" : "Nữ"}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="font-semibold pr-3 text-gray-700 text-sm">
                              Ngày nộp:
                            </p>
                            <p className="text-gray-600 text-sm">
                              {applicant?.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-2/4 relative bg-white p-7 rounded-lg mr-4 ">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 w-full h-full"
                        style={{ backgroundImage: "url('https://img.freepik.com/free-photo/wall-blank-paper-frame-with-acorn-decoration_53876-105706.jpg?w=996&t=st=1727511578~exp=1727512178~hmac=5c37806fb505d3257e983bfedabda531ab3125918e7c3818576398545c519050')" }}
                      />
                      <div className="relative z-10 flex items-center justify-center">
                        <p className="font-semibold text-yellow-700 mb-2">Thư giới thiệu</p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        <span className="pr-2 font-semibold text-green-600">Nội dung:</span>
                        <span>{stripHtml(applicant.content)}</span>
                      </p>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => openModal(applicant.user.jobSeeker.cv)}
                        className="flex items-center text-blue-700 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        <FaFileAlt className="mr-2" /> Xem CV
                      </button>
                      <button
                        onClick={() => openChatBox(applicant)}
                        className="flex items-center text-orange-700 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        <FaCommentDots className="mr-2" /> Nhắn tin
                      </button>
                      <div className="flex flex-col space-y-3">
                        {applicant.status === 3 ? (
                          <button
                            className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg cursor-not-allowed text-sm"
                            style={{ minWidth: '100px' }}
                          >
                            Đã từ chối
                          </button>
                        ) : applicant.status !== 2 ? (
                          <>
                            <button
                              onClick={() => openConfirmModal(applicant.id, 'accept')}
                              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-lg shadow-md text-sm"
                              style={{ minWidth: '100px' }}
                            >
                              Chấp nhận
                            </button>
                            <button
                              onClick={() => openConfirmModal(applicant.id, 'reject')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md text-sm"
                              style={{ minWidth: '100px' }}
                            >
                              Từ chối
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-gray-500 text-white font-semibold py-2 rounded-lg cursor-not-allowed text-sm"
                            style={{ minWidth: '100px' }}
                          >
                            Đã chấp nhận
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Render the ChatBox component */}
      {chatBoxOpen && (
        <ChatBox
          currentChatUser={currentChatUser}
          currentUser={user} // assuming 'user' is the current user context
          jobId={jobId}
          onClose={closeChatBox}
        />
      )}

      {/* Render the CV modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4">
            <button
              className="text-red-700 hover:text-red-800"
              onClick={closeModal}
            >
              Đóng
            </button>
            <iframe
              src={selectedCV}
              title="CV Viewer"
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Render the ConfirmModal */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmAction === 'accept' ? handleConfirmAccept : handleConfirmReject}
        title={confirmAction === 'accept' ? "Xác nhận chấp nhận" : "Xác nhận từ chối"}
        message={confirmAction === 'accept' ? "Bạn có chắc chắn muốn chấp nhận ứng viên này?" : "Bạn có chắc chắn muốn từ chối ứng viên này?"}
      />

      {/* Render the NotificationModal */}
      <NotificationModal
        isOpen={notificationModalOpen}
        message={notificationMessage}
        onClose={() => setNotificationModalOpen(false)}
      />
    </div>
  );
};

export default JobApplicantsList;