import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { authApi, endpoints } from "../../../configs/APIs";
import { MyUserContext } from "../../../configs/Context";
import { getToken } from "../../../utils/storage";
import { AiOutlineDelete } from "react-icons/ai";
import SidebarEmployer from "../../../component/SidebarEmployer";
import useFetchOptions from "../../../configs/useEffects";
import NotificationModal from "../../../component/NotificationModal";

const PostRecruitment = () => {
    const [job, setJob] = useState({});
    const [err, setErr] = useState(false);

    const user = useContext(MyUserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { locations: areas, careers, employmenttypes } = useFetchOptions();
    const [gender, setGender] = useState("");
    const [genderError, setGenderError] = useState(false);
    const [date, setDate] = useState(new Date());
    const fileInputRef = useRef(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const closeModal = () => setModalIsOpen(false);

    const fields = [
        { label: "Tiêu đề", name: "title", type: "text" },
        { label: "Hình ảnh", name: "image", type: "file" },
        { label: "Địa điểm", name: "location", type: "text" },
        { label: "Vị trí", name: "position", type: "text" },
        { label: "Mô tả công việc", name: "description", type: "textarea" },
    ];

    const updateState = (field, value) => {
        setJob((current) => ({ ...current, [field]: value }));
    };

    const handleDateChange = (date) => {
        setDate(date);
        // updateState("deadline", date.toISOString().split("T")[0]);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        updateState("deadline", formattedDate);
    };

    const handleGender = (value) => {
        setGender(value);
        setGenderError(false);
        updateState("gender", value);
    };

    const pickImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setSelectedFile(file);
            updateState("image", file);
        }
    };

    const handleDeleteAvatar = () => {
        setSelectedImage(null);
        updateState("image", null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateFields = () => {
        for (let field of fields) {
            if (!job[field.name]) {
                setModalMessage(`Trường "${field.label}" không được để trống.`);
                setModalIsOpen(true);
                return false;
            }
        }
        return true;
    };

    const postJob = async () => {
        setErr(false);

        if (!validateFields()) {
            return;
        }

        let form = new FormData();
        for (let key in job) {
            form.append(key, job[key]);
        }
        // form.append("reported", "False");
        form.append("active", "True");
        form.append("company", user.company.id);
        setLoading(true);
        try {
            const token = getToken();
            const res = await authApi(token).post(
                endpoints["post_recruitment"],
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status === 201) {
                setModalMessage("Bài đăng đã được đăng thành công");
                setModalIsOpen(true);
                setJob({});
                setGender("");
                setDate(new Date());
                setSelectedImage(null);
                setSelectedFile(null);
                navigate("/job-posted");
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400 && ex.response.data.detail === "Bạn chỉ được đăng một bài tuyển dụng mỗi ngày.") {
                setModalMessage('Xin lỗi. Bạn chỉ được đăng một tin tuyển dụng mỗi ngày.');
            }
            setModalIsOpen(true);
            setErr(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-auto min-h-screen bg-gray-100">
            <SidebarEmployer />
            <div className="container mx-auto p-5 w-[70%] bg-white shadow-lg rounded-lg my-7">
                <h1 className="text-center text-3xl mb-6 text-green-700 font-semibold">BÀI TUYỂN DỤNG</h1>
                <form className="space-y-6">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col mb-4">
                            <label className="mb-2 font-semibold">{field.label}<span className="text-red-500">(*)</span></label>
                            {field.type === "textarea" ? (
                                <textarea
                                    value={job[field.name] || ""}
                                    onChange={(e) => updateState(field.name, e.target.value)}
                                    className="p-3 border border-gray-300 rounded"
                                />
                            ) : field.type === "file" ? (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={pickImage}
                                        className="p-3 border border-gray-300 rounded"
                                        ref={fileInputRef}
                                    />
                                    {selectedImage && (
                                        <div className="relative mt-3">
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="w-40 h-40 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleDeleteAvatar}
                                                className="absolute top-0 right-0 bg-white p-1 rounded-full"
                                            >
                                                <AiOutlineDelete className="text-red-800 hover:bg-red-200" size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : field.type === "date" ? (
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    className="p-3 border border-gray-300 rounded"
                                    dateFormat="dd-MM-yyyy"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    value={job[field.name] || ""}
                                    onChange={(e) => updateState(field.name, e.target.value)}
                                    className="p-3 border border-gray-300 rounded"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex flex-row space-x-4 mb-4">
                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Số lượng <span className="text-red-500">(*)</span>
                            </label>
                            <input
                                type="number"
                                value={job.quantity || ""}
                                onChange={(e) => updateState("quantity", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Hạn chót<span className="text-red-500">(*)</span>
                            </label>
                            <DatePicker
                                selected={date}
                                onChange={handleDateChange}
                                className="p-3 border border-gray-300 rounded"
                                dateFormat="dd-MM-yyyy"
                            />
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Loại hình công việc<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={job.employmenttype || ""}
                                onChange={(e) => updateState("employmenttype", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn loại hình</option>
                                {employmenttypes.map((types) => (
                                    <option key={types.id} value={types.id}>
                                        {types.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4 mb-4">
                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Kinh nghiệm<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={job.experience || ""}
                                onChange={(e) => updateState("experience", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn kinh nghiệm</option>
                                <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                                <option value="Dưới 1 năm">Dưới 1 năm</option>
                                <option value="Trên 1 năm">Trên 1 năm</option>
                                <option value="Trên 3 năm">Trên 3 năm</option>
                                <option value="Trên 5 năm">Trên 5 năm</option>
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Mức lương<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={job.salary || ""}
                                onChange={(e) => updateState("salary", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn mức lương</option>
                                <option value="Từ 1-2 triệu">Từ 1-2 triệu</option>
                                <option value="Từ 3-5 triệu">Từ 3-5 triệu</option>
                                <option value="Từ 5-10 triệu">Từ 5-10 triệu</option>
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Giới tính<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={gender}
                                onChange={(e) => handleGender(e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                                <option value="2">Both male and Female</option>
                            </select>
                            {genderError && (
                                <p className="text-red-500 text-sm mt-1">Vui lòng chọn giới tính hợp lệ.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4 mb-4">
                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Lĩnh vực<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={job.career || ""}
                                onChange={(e) => updateState("career", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn lĩnh vực</option>
                                {careers.map((career) => (
                                    <option key={career.id} value={career.id}>
                                        {career.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="mb-2 font-semibold">Khu vực<span className="text-red-500">(*)</span>
                            </label>
                            <select
                                value={job.area || ""}
                                onChange={(e) => updateState("area", e.target.value)}
                                className="p-3 border border-gray-300 rounded"
                            >
                                <option value="">Chọn khu vực</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {err && <p className="text-orange-500 ml-10">Vui lòng thử lại sau nếu bạn đã vượt giới hạn đăng bài hôm nay.
                        <p > Hoặc bạn có thể chọn gói đăng tin để tiếp tục đăng bài!</p>
                        <p
                          onClick={() => navigate("/package")}
                          style={{ cursor: 'pointer' }}
                          className="text-green-600 font-semibold"
                          > 
                            CLICK Ở ĐÂY
                        </p>
                    </p>}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={postJob}
                            className={`text-white bg-green-500 py-3 px-8 rounded hover:bg-green-700 ${loading ? "opacity-50" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Đang đăng..." : "Đăng tuyển"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal thông báo */}
            <NotificationModal
                isOpen={modalIsOpen}
                message={modalMessage}
                onClose={closeModal}
            />
        </div>
    );
};

export default PostRecruitment;