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
        const fetchSkills = async () => {
            try {
                const res = await APIs.get(endpoints["skills"]);
                setSkills(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchAreas = async () => {
            try {
                const res = await APIs.get(endpoints["areas"]);
                setAreas(res.data);
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

        fetchSkills();
        fetchAreas();
        fetchCareers();
    }, [navigate]);

    const fieldLabels = {
        1: 'Vị trí ứng tuyển',
        2: 'Mức lương mong muốn',
        3: 'Kinh nghiệm làm việc',
        4: 'Lĩnh vực nghề nghiệp',
        5: 'Kỹ năng',
        6: 'Khu vực làm việc',
        7: 'CV'
    };

    const values = {
        1: position,
        2: salaryExpectation,
        3: experience,
        4: selectedCareer,
        5: selectedSkills.length > 0,
        6: selectedAreas.length > 0,
        7: cv
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

    const handleAreaChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map(option => parseInt(option.value, 10)); // Chuyển đổi thành số
        setSelectedAreas(selectedIds);
    };

    const handleSkillChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedIds = selectedOptions.map(option => parseInt(option.value, 10)); // Chuyển đổi thành số
        if (selectedIds.length <= 3) {
            setSelectedSkills(selectedIds);
        }
    };
    console.log(selectedSkills);
    console.log(selectedAreas);

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
            skills: selectedSkills.map(id => parseInt(id)),
            areas: selectedAreas.map(id => parseInt(id)),
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

    const progressPercentage = (step / 7) * 100;

    return (
        <div className="flex justify-center items-center min-h-screen py-10">
            <form
                className="bg-yellow-50 p-8 rounded shadow-md w-full max-w-2xl relative"
                onSubmit={handleSubmit}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryExpectation">
                            Mức lương mong muốn
                        </label>
                        {/* <input
                            type="number"
                            id="salaryExpectation"
                            className="w-full px-3 py-2 border rounded"
                            value={salaryExpectation}
                            onChange={(e) => setSalaryExpectation(e.target.value)}
                            required
                        /> */}
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="career">
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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                            Kỹ năng
                        </label>
                        <select
                            id="skills"
                            className="w-full px-3 py-2 border rounded"
                            multiple
                            value={selectedSkills}
                            onChange={handleSkillChange}
                            required
                        >
                            {skills.map(skill => (
                                <option key={skill.id} value={skill.id}>
                                    {skill.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-gray-600 text-sm mt-1">Chọn tối đa 3 kỹ năng</div>
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

                {step === 6 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areas">
                            Khu vực làm việc
                        </label>
                        <select
                            id="areas"
                            className="w-full px-3 py-2 border rounded"
                            multiple
                            value={selectedAreas}
                            onChange={handleAreaChange}
                            required
                        >
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
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

                {step === 7 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cv">
                            CV
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

export default RegisterApplicant;
