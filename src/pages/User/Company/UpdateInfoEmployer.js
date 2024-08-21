import React, { useState, useContext, useRef } from 'react';
import { MyUserContext, MyDispatchContext } from '../../../configs/Context';
import { useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';

const UpdateInfoProfileEmployer = () => {
    const user = useContext(MyUserContext);
    const navigate = useNavigate();
    const dispatch = useContext(MyDispatchContext);

    const [formData, setFormData] = useState({
        companyName: user.company.companyName || '',
        information: user.company.information || '',
        address: user.company.address || '',
        company_type: user.company.company_type || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleSave = async () => {
    //     try {
    //         let form = new FormData();
    //         Object.keys(formData).forEach((key) => {
    //             form.append(key, formData[key]);
    //         });
    //         updateEmployer(form); 
    //     } catch (ex) {
    //         console.error(ex);
    //     }
    // };

    const updateEmployer = async () => {
        let form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });
        try {
            const token = getToken();
            console.log('Data sending to server:', form); // Log form data before sending

            const res = await authApi(token).patch(endpoints["patch_company"]
                (user.company.id), 
                form, 
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response from server:', res.data); // Log response from server

            if (res.status === 200) {
                alert('Cập nhật thông tin thành công!');
                navigate('/employer-profile');
            } else {
                console.error('Lỗi khi cập nhật thông tin');
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <div className="flex flex-row items-start p-6 bg-gray-100 min-h-screen">
            <div className="bg-fuchsia-50 shadow-md rounded-lg p-6 w-[60%] max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4 flex justify-center pb-5 text-red-700">Cập nhật thông tin công ty</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Information</label>
                        <textarea
                            name="information"
                            value={formData.information}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company Type</label>
                        <select
                            name="company_type"
                            value={formData.company_type}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        >
                            <option value={0}>Công ty TNHH</option>
                            <option value={1}>Công ty Cổ phần</option>
                            <option value={2}>Công ty Tư nhân</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={updateEmployer}
                            className="bg-green-500 text-white py-2 rounded-lg px-10"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfoProfileEmployer;
