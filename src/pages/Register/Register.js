import React, { useContext, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { MyDispatchContext } from "../../configs/Context";
import APIs, { endpoints } from "../../configs/APIs";

const Register = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const nav = useNavigate(); 

    const fields = [
        { label: "Username", icon: "email", field: "username" },
        { label: "Password", icon: "eye", field: "password", secureTextEntry: true },
        { label: "Confirm password", icon: "eye", field: "confirm", secureTextEntry: true },
    ];
    
    const [role, setRole] = useState("applicant");
    const [user, setUser] = useState({});
    const dispatch = useContext(MyDispatchContext);

    const change = (value, field) => {
        setUser((current) => {
        return { ...current, [field]: value };
        });
    };

  //Hàm đăng kí
   

    const handleRoleChange = (e) => {
        const value = e.target.value;

        const rolevalue = value === "applicant" ? 0 : 1;

        setRole(rolevalue)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

            // Xử lý logic đăng ký ở đây (có thể gửi dữ liệu lên server)
                if (user.password !== user.confirm) 
                    setError("Mật khẩu không khớp");
                else {
                    setError("");
                    setLoading(true);
                try {
                    let form = new FormData();
                    for (let f in user) {
                        form.append(f, user[f]);
                    }
                    form.append("role", role)
                    let res = await APIs.post(endpoints["register"], form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    });
                    if (res.status === 201) {
                        nav('/login');
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            alert("Đăng ký thành công");

            // switch (role) {
            //     case 'applicant':
            //         nav('/register-applicant');
            //         break;
            //     case 'employer':
            //         nav('/register-employer');
            //         break;
            //     case 'admin':
            //         nav('/');
            //         break;
            //     default:
            //         break;
            // }
            
        }
    };

    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageSelect = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //     const imageDataURL = e.target.result;
    //     setSelectedImage(imageDataURL);
    //     };

    //     reader.readAsDataURL(file);
    // };

    return (
        <div className="flex justify-center items-center h-screen pt-10">
            <form
                className="bg-slate-200 p-8 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>

                {fields.map((f) => (
                    <div key={f.field} className="mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={f.field}>{f.label}</label>
                        <input
                        type={f.secureTextEntry ? "password" : "text"}
                        id={f.field}
                        className="w-full px-3 py-2 border rounded"
                        value={user[f.field] || ""} // Thêm || "" để tránh hiển thị undefined khi giá trị chưa được định nghĩa
                        onChange={(event) => change(event.target.value, f.field)}// Chỉ truyền giá trị event.target.value
                        required
                        />
                    </div>
                ))}
                {/* <div class="block items-center mb-5">
                    <label class="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                        <span>Select an Image</span>
                        <input type="file" accept="image/*" onChange={handleImageSelect} class="hidden" />
                    </label>

                    {selectedImage && (
                        <div class="flex mt-4">
                        <img src={selectedImage} alt="Selected" class="max-w-[25%]" />
                        </div>
                    )}
                    
                </div> */}
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
                                checked={role === 0}
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
                                checked={role === 1}
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
                    loading={loading}
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
