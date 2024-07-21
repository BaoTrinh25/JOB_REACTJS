import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyUserContext } from "../../../configs/Context";
import { authApi, endpoints } from "../../../configs/APIs";
import { getToken } from "../../../utils/storage";
import { ErrorOutline } from "@mui/icons-material";

const JobApplication = () => {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [isStudent, setIsStudent] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [maxLength, setMaxLength] = useState(1000);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
    const user = useContext(MyUserContext);

    const handleApplyJob = async () => {
        setSnackbarVisible(false);

        if (!user) {
            alert("Bạn cần đăng nhập!");
            navigate("/login");
            return;
        }

        if (!content) {
            setSnackbarMessage("Bạn chưa nhập thư giới thiệu.");
            setSnackbarVisible(true);
            return;
        }

        if (content.length < 10) {
            setSnackbarMessage("Thư giới thiệu phải có ít nhất 10 kí tự.");
            setSnackbarVisible(true);
            return;
        }

        let form = new FormData();
        form.append("is_student", isStudent ? "True" : "False");
        form.append("content", content);
        form.append("status", "Pending");

        setLoading(true);
        try {
            const token = getToken();
            let res = await authApi(token).post(
                endpoints["apply_job"](jobId),
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (res.status === 201) {
                alert("Success", "Ứng tuyển thành công!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                console.log("Error data:", error.response.data);
            }
            setSnackbarMessage("Ứng tuyển không thành công. Bạn đã ứng tuyển công việc này trước đó. Hãy đợi thông báo từ Nhà tuyển dụng!");
            setSnackbarVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto bg-gray-100 p-10">
            <span className="flex justify-center text-3xl text-red-800 mb-7">ĐƠN ỨNG TUYỂN</span>
            <div>
                <label className="block mb-2 text-lg font-medium">
                    Bạn có phải là sinh viên?
                </label>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        id="student"
                        name="isStudent"
                        checked={isStudent}
                        onChange={() => setIsStudent(true)}
                        className="mr-2"
                    />
                    <label htmlFor="student" className="mr-4">
                        Có
                    </label>
                    <input
                        type="radio"
                        id="non-student"
                        name="isStudent"
                        checked={!isStudent}
                        onChange={() => setIsStudent(false)}
                        className="mr-2"
                    />
                    <label htmlFor="non-student">Không</label>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">Thư giới thiệu</label>
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg"
                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này"
                    value={content}
                    onChange={(e) => {
                        if (e.target.value.length > maxLength) {
                            setShowErrorSnackbar(true);
                        } else {
                            setContent(e.target.value);
                        }
                    }}
                    rows="5"
                    maxLength={maxLength}
                />
                <small className="block mt-1 text-gray-600">
                    {content.length}/{maxLength} ký tự
                </small>
            </div>

            <button
                onClick={handleApplyJob}
                className={`mt-4 bg-green-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Ứng tuyển"}
            </button>

            {snackbarVisible && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                    <ErrorOutline className="font-bold mr-2" />
                    <span className="block sm:inline"> {snackbarMessage}</span>
                </div>
            )}

            {showErrorSnackbar && (
                <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <strong className="font-bold">Chú ý</strong>
                    <span className="block sm:inline">
                        {" "}
                        Bạn đã vượt quá giới hạn số lượng ký tự cho phép!
                    </span>
                </div>
            )}
        </div>
    );
};

export default JobApplication;
