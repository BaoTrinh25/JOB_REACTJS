import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyDispatchContext } from "../../../configs/Context";
import APIs, { endpoints } from "../../../configs/APIs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [alertShown, setAlertShown] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null); // Avatar state to store base64 string
    const navigate = useNavigate();

    const fields = [
        { label: "Username", icon: "email", field: "username" },
        { label: "Password", icon: "eye", field: "password", secureTextEntry: true },
        { label: "Confirm password", icon: "eye", field: "confirm", secureTextEntry: true },
    ];

    const [role, setRole] = useState(0);
    const [user, setUser] = useState({});
    const dispatch = useContext(MyDispatchContext);

    const change = (value, field) => {
        setUser((current) => {
            return { ...current, [field]: value };
        });
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        const rolevalue = value === "applicant" ? 0 : 1;
        setRole(rolevalue);
    };

    // Function to handle avatar upload and convert to base64
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file); // Save the file for uploading
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!user.username || !user.password || !user.confirm) {
            setError("Vui lòng điền đầy đủ các trường thông tin.");
            return;
        }

        if (user.password !== user.confirm) {
            setError("Mật khẩu không khớp");
            return;
        }

        setError("");
        setLoading(true);

        try {
            let form = new FormData();
            for (let f in user) {
                form.append(f, user[f]);
            }
            form.append("role", role);

            if (avatar) {
                form.append("avatar", avatar); 
            }

            let res = await APIs.post(endpoints["register_user"], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 201) {
                const userId = res.data.id;
                toast.success('Đăng kí thành công');
                setTimeout(() => {
                    if (role === 0) {
                        navigate(`/register-applicant/${userId}`);
                    } else if (role === 1) {
                        navigate(`/register-employer/${userId}`);
                    }
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            if (!alertShown) {
                toast.error('Đăng kí thất bại. Vui lòng thử lại hoặc đổi username!');
                setAlertShown(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-opacity-50" style={{ backgroundImage: "url('https://gpshortcuts.co.uk/images/reghere.jpg')" }}>
            <div className="flex w-3/5 bg-white rounded-xl shadow-lg overflow-hidden h-[90%]">
                <div className="w-1/2 bg-cover" style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.udofYzIAT3FeEUnExxvgVAAAAA?pid=ImgDet&w=207&h=155&c=7&dpr=1.5')" }}>
                    <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white text-xl">
                            <h1 className="text-4xl font-bold mb-7">Welcome NAKO JOB</h1>
                            <p className="p-3">Please fill out the form to create your account and join our community of job seekers and employers.</p>
                            <p className="text-orange-400 mb-3">Let's get started!</p>
                            <p className="text-3xl">__NAKO JOB__</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-8">
                    <h2 className="text-xl font-bold mb-4 text-center">REGISTER</h2>

                    {fields.map((f) => (
                        <div key={f.field} className="mb-2">
                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor={f.field}>{f.label}</label>
                            <input
                                type={f.secureTextEntry ? "password" : "text"}
                                id={f.field}
                                className="w-full px-3 py-2 border rounded"
                                value={user[f.field] || ""}
                                onChange={(event) => change(event.target.value, f.field)}
                                required
                            />
                        </div>
                    ))}

                    <div className="mb-4 text-xs">
                        <label className="block text-gray-700 text-xs font-bold mb-2">Avatar Upload</label>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-xs font-bold mb-2">
                            Choose Role
                        </label>
                        <div>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="role"
                                    value="applicant"
                                    checked={role === 0}
                                    onChange={handleRoleChange}
                                    required
                                />
                                <span className="ml-2 text-xs">Applicant</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="role"
                                    value="employer"
                                    checked={role === 1}
                                    onChange={handleRoleChange}
                                    required
                                />
                                <span className="ml-2 text-xs">Employer</span>
                            </label>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-xs">Already on NAKO Job?</span>{" "}
                        <Link to="/login" className="text-green-600 underline">
                            SIGN IN
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
