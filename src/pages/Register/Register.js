import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate (); 

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu có ít nhất 5 ký tự và chứa ít nhất một chữ cái và một chữ số
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

        if (!password.match(passwordRegex)) {
            setError(
                "Mật khẩu phải có ít nhất 5 ký tự và chứa ít nhất một chữ cái và một chữ số"
            );
        } else if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
        } else if (!role) {
            setError("Vui lòng chọn vai trò");
        } else {
            setError("");
            // Xử lý logic đăng ký ở đây (có thể gửi dữ liệu lên server)
            alert("Đăng ký thành công");

            switch (role) {
                case 'applicant':
                    nav('/register-applicant');
                    break;
                case 'employer':
                    nav('/register-employer');
                    break;
                case 'admin':
                    nav('/');
                    break;
                default:
                    break;
            }
            
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                className="bg-slate-200 p-8 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        User Name
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border rounded"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border rounded"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Choose Role
                    </label>
                    <div>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                className="form-radio"
                                name="role"
                                value="applicant"
                                checked={role === "applicant"}
                                onChange={handleRoleChange}
                                required
                            />
                            <span className="ml-2">Applicant</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio"
                                name="role"
                                value="employer"
                                checked={role === "employer"}
                                onChange={handleRoleChange}
                                required
                            />
                            <span className="ml-2">Employer</span>
                        </label>
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-900"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
                    <span className="text-sm">Already on DTT Job?</span>{" "}
                    <Link to="/login" className="text-blue-950 underline">
                    Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
