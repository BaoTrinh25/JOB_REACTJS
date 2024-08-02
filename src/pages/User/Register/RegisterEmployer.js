import React, { useState, useEffect } from 'react';
import APIs, { endpoints } from '../../../configs/APIs';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterEmployer = () => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [information, setInfomation] = useState('');
    const [address, setAddress] = useState('');
    const [company_type, setCompanyType] = useState(null); 
    const [alertShown, setAlertShown] = useState(false); // New state to track alert
    const navigate = useNavigate(); 
    const { userId } = useParams();


    const fieldLabels = {
        1: 'Tên công ty',
        2: 'Vị trí nhà tuyển dụng',
        3: 'Loại hình công ty',
        4: 'Địa chỉ',
        5: 'Thông tin công ty'
    };

    const values = {
        1: companyName,
        2: position,
        3: company_type,
        4: address,
        5: information
    };

    const handleNext = () => {
        if (!values[step]) { 
            setError(`Vui lòng nhập ${fieldLabels[step]}`);
            return;
        }
        setError(''); // Clear error if validation passes
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID is missing.');
            return;
        }

        const employerData = {
            position: position,
            companyName: companyName,
            information: information,
            company_type: company_type,
            address: address
        };

        const form = new FormData();
        for (const key in employerData) {
            if (Array.isArray(employerData[key])) {
                employerData[key].forEach((item, index) => {
                    form.append(`${key}[${index}]`, item);
                });
            } else {
                form.append(key, employerData[key]);
            }
        }

        console.log('Data being sent:', employerData); // Log dữ liệu được gửi đi
        try {
            const res = await APIs.post(endpoints["register_company"](userId), 
            form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', res.data); // Log dữ liệu trả về từ server
            if (!alertShown) {
                toast.success('Đăng kí thành công');
                setAlertShown(true); // Update state to prevent multiple alerts
              }
            navigate('/login'); // Chuyển hướng người dùng sau khi đăng ký thành công
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const progressPercentage = (step / 5) * 100;

    return (
        <div className="flex justify-center items-center min-h-screen py-10">
            <form
                className="bg-yellow-50 p-8 rounded shadow-md w-full max-w-2xl relative"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl text-red-900 font-bold mb-10 text-center">ĐĂNG KÝ THÔNG TIN NHÀ TUYỂN DỤNG</h2>

                <div className="mb-7">
                    {step > 1 && (
                        <button
                            type="button"
                            className="absolute left-4 top-10 text-black-700"
                            onClick={handlePrevious}
                        >
                            <div className='flex flex-row p-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className='text-sm'>Previous</span>
                            </div>
                        </button>
                    )}
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mb-5">
                        <div
                            className="bg-green-700 h-2.5 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                            Tên công ty
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            className="w-full px-3 py-2 border rounded"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                            Vị trí nhà tuyển dụng
                        </label>
                        <input
                            type="text"
                            id="position"
                            className="w-full px-3 py-2 border rounded"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company_type">
                            Loại hình công ty
                        </label>
                        <select
                            id="company_type"
                            className="w-full px-3 py-2 border rounded"
                            value={company_type}
                            onChange={(e) => setCompanyType(e.target.value)}
                            required
                        >
                            <option value="">Chọn loại hình công ty</option>
                            <option value={0}>Công ty TNHH</option>
                            <option value={1}>Công ty tu nhân</option>
                            <option value={2}>Công ty cổ phần</option>
                        </select>
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="w-full px-3 py-2 border rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="information">
                            Thông tin giới thiệu công ty
                        </label>
                        <input
                            type="text"
                            id="information"
                            className="w-full px-3 py-2 border rounded"
                            value={information}
                            onChange={(e) => setInfomation(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
            </form>
        </div>
    );
};

export default RegisterEmployer;
