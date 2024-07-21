import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import APIs, { authApi, endpoints } from "../../../configs/APIs";
import { MyUserContext } from "../../../configs/Context";
import { getToken } from "../../../utils/storage";
import { AiOutlineDelete } from "react-icons/ai";

const PostRecruitment = () => {
    const [job, setJob] = useState({});
    const [err, setErr] = useState(false);

    const user = useContext(MyUserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [areas, setAreas] = useState([]);
    const [employmentTypes, setEmploymentTypes] = useState([]);
    const [careers, setCareers] = useState([]);

    const [gender, setGender] = useState("");
    const [genderError, setGenderError] = useState(false);

    const [date, setDate] = useState(new Date());

    const fileInputRef = useRef(null);

    const fields = [
        {
            label: "Tiêu đề",
            name: "title",
            type: "text",
        },
        {
            label: "Hình ảnh",
            name: "image",
            type: "file",
        },
        {
            label: "Địa điểm",
            name: "location",
            type: "text",
        },
        {
            label: "Số lượng",
            name: "quantity",
            type: "number",
        },
        {
            label: "Mức lương",
            name: "salary",
            type: "number",
        },
        {
            label: "Vị trí",
            name: "position",
            type: "text",
        },
        {
            label: "Mô tả công việc",
            name: "description",
            type: "textarea",
        },
        {
            label: "Kinh nghiệm",
            name: "experience",
            type: "text",
        },
        {
            label: "Hạn chót",
            name: "deadline",
            type: "date",
        },
    ];

    const updateState = (field, value) => {
        setJob((current) => {
            return { ...current, [field]: value };
        });
    };

    const handleDateChange = (date) => {
        setDate(date);
        updateState("deadline", date.toISOString().split("T")[0]);
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
                alert(`Trường ${field.label} không được để trống.`);
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const res = await APIs.get(endpoints["areas"]);
                setAreas(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchEmploymentTypes = async () => {
            try {
                const res = await APIs.get(endpoints["employmenttypes"]);
                setEmploymentTypes(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchCareers = async () => {
            try {
                const res = await APIs.get(endpoints["careers"]);
                setCareers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAreas();
        fetchEmploymentTypes();
        fetchCareers();
    }, []);

    const postJob = async () => {
        setErr(false);

        if (!validateFields()) {
            return;
        }

        let form = new FormData();
        for (let key in job) {
            form.append(key, job[key]);
        }
        form.append("reported", "False");
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
                alert("Bài đăng đã được tạo thành công.");
                setJob({});
                setGender("");
                setDate(new Date());
                setSelectedImage(null);
                setSelectedFile(null);
                navigate("/list-posted");
            }
            console.log(res.data);
        } catch (ex) {
            console.error(ex.response);
            setErr(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 w-[70%] bg-red-200">
            <div className="bg-fuchsia-50 p-7 my-2 shadow rounded-xl">
                <h1 className="flex justify-center text-3xl my-5 pb-5 text-red-700 font-semibold">BÀI TUYỂN DỤNG</h1>
                <form className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col">
                            <label className="mb-1 font-semibold">{field.label}</label>
                            {field.type === "textarea" ? (
                                <textarea
                                    value={job[field.name] || ""}
                                    onChange={(e) => updateState(field.name, e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            ) : field.type === "file" ? (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={pickImage}
                                        className="p-2 border border-gray-300 rounded"
                                        ref={fileInputRef}
                                    />
                                    {selectedImage && (
                                        <div className="relative mt-2">
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="w-40 h-40 object-cover"
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
                                    className="p-2 border border-gray-300 rounded"
                                    dateFormat="dd-MM-yyyy"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    value={job[field.name] || ""}
                                    onChange={(e) => updateState(field.name, e.target.value)}
                                    className="p-2 border border-gray-300 rounded"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Chọn giới tính</label>
                        <select
                            value={gender}
                            onChange={(e) => handleGender(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
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

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Chọn loại hình công việc</label>
                        <select
                            value={job.employmentType || ""}
                            onChange={(e) => updateState("employmenttype", e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            {employmentTypes.map((types) => (
                                <option key={types.id} value={types.id}>
                                    {types.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Chọn khu vực</label>
                        <select
                            value={job.area || ""}
                            onChange={(e) => updateState("area", e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Chọn lĩnh vực</label>
                        <select
                            value={job.career || ""}
                            onChange={(e) => updateState("career", e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        >
                            {careers.map((career) => (
                                <option key={career.id} value={career.id}>
                                    {career.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {err && <p className="text-red-500">Có lỗi xảy ra. Vui lòng thử lại.</p>}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={postJob}
                            className={`text-white bg-green-500 py-2 px-7 rounded hover:bg-green-700 ${loading ? "opacity-50" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Đang đăng..." : "Đăng tuyển"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostRecruitment;
