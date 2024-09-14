import React, { useState, useEffect } from 'react';
import APIs, { endpoints } from '../../../configs/APIs';
import { useNavigate, useParams } from 'react-router-dom';

const RegisterApplicant = () => {
    const [step, setStep] = useState(1);
    const [position, setPosition] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedCareer, setSelectedCareer] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [cv, setCv] = useState(null);
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([]);
    const [areas, setAreas] = useState([]);
    const [careers, setCareers] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const res = await APIs.get(endpoints["careers"]);
                setCareers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCareers();
    }, [navigate]);

    const fieldLabels = {
        1: 'Vị trí ứng tuyển',
        2: 'Mức lương mong muốn',
        3: 'Kinh nghiệm làm việc',
        4: 'Lĩnh vực nghề nghiệp',
        5: 'CV'
    };

    const values = {
        1: position,
        2: salaryExpectation,
        3: experience,
        4: selectedCareer,
        5: cv
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

    const handleCareerChange = (e) => {
        setSelectedCareer(e.target.value);
    };

    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('User ID is missing.');
            return;
        }

        const applicantData = {
            position: position,
            salary_expectation: salaryExpectation,
            experience: experience,
            career: parseInt(selectedCareer),
            cv: cv ? cv.name : ""
        };

        const form = new FormData();
        for (const key in applicantData) {
            if (Array.isArray(applicantData[key])) {
                applicantData[key].forEach((item, index) => {
                    form.append(`${key}[${index}]`, item);
                });
            } else {
                form.append(key, applicantData[key]);
            }
        }

        console.log('Data being sent:', applicantData); // Log dữ liệu được gửi đi
        try {
            const res = await APIs.post(endpoints["register_jobseeker"](userId),
                form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', res.data); // Log dữ liệu trả về từ server
            alert('Thông tin đã được cập nhật thành công!');
            navigate('/login'); // Chuyển hướng người dùng sau khi đăng ký thành công
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const progressPercentage = (step / 5) * 100;

    return (
        <div className="flex justify-center items-center min-h-screen py-10" style={{ backgroundImage: 'url(https://image.slidesdocs.com/responsive-images/background/yellow-business-atmosphere-plane-creative-geometric-powerpoint-background_9f48dc374b__960_540.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <form
                className="bg-yellow-50 p-8 rounded-2xl shadow-md w-full max-w-2xl relative"
                onSubmit={handleSubmit}
                style={{ backgroundImage: 'url(https://th.bing.com/th/id/OIP.Z2t4mX9C0tZXnGBuNfdXZQHaEb?rs=1&pid=ImgDetMain)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <h2 className="text-2xl text-red-900 font-bold mb-10 text-center">ĐĂNG KÝ THÔNG TIN ỨNG VIÊN</h2>

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
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="position">
                            Vị trí ứng tuyển
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

                {step === 2 && (
                    <div className="mb-4">
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="salaryExpectation">
                            Mức lương mong muốn
                        </label>
                        <select
                            id="salaryExpectation"
                            className="w-full px-3 py-2 border rounded"
                            value={salaryExpectation}
                            onChange={(e) => setSalaryExpectation(e.target.value)}
                            required
                        >
                            <option value="">Chọn mức lương mong muốn</option>
                            <option value="1-3 triệu">1-3 triệu</option>
                            <option value="4-6 triệu">4-6 triệu</option>
                            <option value="7-10 triệu">7-10 triệu</option>
                            <option value="10-15 triệu">10-15 triệu</option>
                            <option value="Trên 15 triệu">Trên 15 triệu</option>
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

                {step === 3 && (
                    <div className="mb-4">
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="experience">
                            Kinh nghiệm làm việc
                        </label>
                        <select
                            id="experience"
                            className="w-full px-3 py-2 border rounded"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        >
                            <option value="">Chọn số năm</option>
                            <option value="Dưới 1 năm">Dưới 1 năm</option>
                            <option value="2 năm">2 năm</option>
                            <option value="3 năm">3 năm</option>
                            <option value="4 năm">4 năm</option>
                            <option value="5 năm">5 năm</option>
                            <option value="Trên 5 năm">Trên 5 năm</option>
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
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="career">
                            Lĩnh vực nghề nghiệp
                        </label>
                        <select
                            id="career"
                            className="w-full px-3 py-2 border rounded"
                            value={selectedCareer}
                            onChange={handleCareerChange}
                            required
                        >
                            <option value="">Chọn lĩnh vực</option>
                            {careers.map(career => (
                                <option key={career.id} value={career.id}>
                                    {career.name}
                                </option>
                            ))}
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

                {step === 5 && (
                    <div className="mb-4">
                        <label className="block text-black text-xl font-bold mb-2" htmlFor="cv">
                            Upload CV
                        </label>
                        <input
                            type="file"
                            id="cv"
                            className="w-full px-3 py-2 border rounded"
                            onChange={handleFileChange}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                            >
                                Hoàn tất
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

export default RegisterApplicant;
