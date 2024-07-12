import React, { useState } from 'react';

const RegisterApplicant = () => {
    const [step, setStep] = useState(1);
    const [position, setPosition] = useState('');
    const [salaryExpectation, setSalaryExpectation] = useState('');
    const [experience, setExperience] = useState('');
    const [careerField, setCareerField] = useState('');
    const [skills, setSkills] = useState([]);
    const [cv, setCv] = useState('');
    const [error, setError] = useState('');

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert('Thông tin đã được cập nhật thành công!');
    };

    const progressPercentage = (step / 6) * 100;

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                className="bg-slate-400 p-8 rounded shadow-md w-4000 relative"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">ĐĂNG KÝ THÔNG TIN ỨNG VIÊN</h2>

                <div className="mb-4">
                    {step > 1 && (
                        <button
                            type="button"
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-700"
                            onClick={handlePrevious}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
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
                            type="droplist"
                            id="position"
                            className="w-full px-3 py-2 border rounded"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                        <button type="button" className="mt-4 w-full bg-cyan-900 text-white py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salaryExpectation">
                            Mức lương mong muốn
                        </label>
                        <input
                            type="text"
                            id="salaryExpectation"
                            className="w-full px-3 py-2 border rounded"
                            value={salaryExpectation}
                            onChange={(e) => setSalaryExpectation(e.target.value)}
                            required
                        />
                        <button type="button" className="mt-4 w-full bg-cyan-900 text-white py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                            Kinh nghiệm làm việc
                        </label>
                        <input
                            type="text"
                            id="experience"
                            className="w-full px-3 py-2 border rounded"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                        <button type="button" className="mt-4 w-full bg-cyan-900 text-white py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="careerField">
                            Lĩnh vực nghề nghiệp
                        </label>
                        <input
                            type="text"
                            id="careerField"
                            className="w-full px-3 py-2 border rounded"
                            value={careerField}
                            onChange={(e) => setCareerField(e.target.value)}
                            required
                        />
                        <button type="button" className="mt-4 w-full bg-cyan-900 text-white py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 5 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                            Kỹ năng
                        </label>
                        <select
                            multiple
                            id="skills"
                            className="w-full px-3 py-2 border rounded"
                            value={skills}
                            onChange={(e) => setSkills(Array.from(e.target.selectedOptions, option => option.value))}
                            required
                        >
                            <option value="communication">Kỹ năng giao tiếp</option>
                            <option value="teamwork">Kỹ năng làm việc nhóm</option>
                            <option value="problem-solving">Kỹ năng giải quyết vấn đề</option>
                        </select>
                        <button type="button" className="mt-4 w-full bg-cyan-900 text-white py-2 rounded hover:bg-blue-700" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 6 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cv">
                            CV (Link hoặc tệp đính kèm)
                        </label>
                        <input
                            type="text"
                            id="cv"
                            className="w-full px-3 py-2 border rounded"
                            value={cv}
                            onChange={(e) => setCv(e.target.value)}
                            required
                        />
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 mt-4 bg-cyan-900 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterApplicant;
