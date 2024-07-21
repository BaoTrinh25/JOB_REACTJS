import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../../../configs/APIs';
import { getToken } from '../../../utils/storage';
import { MyUserContext, MyDispatchContext } from '../../../configs/Context';
import { useDropzone } from 'react-dropzone';


const UpdateInfoApplicant = () => {
    const navigate = useNavigate();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);

    const [experience, setExperience] = useState('');
    const [salaryExpectation, setSalary] = useState('');
    // const [isCareerModal, setCareerModal] = useState(false);
    // const [selectedCareer, setSelectedCareer] = useState(null);
    // const [careers, setCareers] = useState([]);
    const [position, setPosition] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const experienceOptions = [' Dưới 1 năm','1 năm', '2 năm', '3 năm', '4 năm', '5+ năm'];
    // const salaryOptions = ['<5 triệu', '5-10 triệu', '10-20 triệu', '20-30 triệu', '>30 triệu'];
    const salaryOptions = [
        { label: '1-5 triệu', value: 5000000 },
        { label: '5-10 triệu', value: 10000000 },
        { label: '10-20 triệu', value: 20000000 },
        { label: '20-30 triệu', value: 30000000 },
        { label: '>30 triệu', value: 31000000 }
    ];


    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpeg', '.png', '.jpg', '.gif']
        }
    });

    const updateApplicantInfo = async () => {
        if (!experience || !position || !salaryExpectation || !selectedFile) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        try {
            let form = new FormData();
            form.append('experience', experience);
            // form.append('career', selectedCareer.id); 
            form.append('position', position);
            form.append('salary_expectation', salaryExpectation);
            form.append('cv', selectedFile);
            const token = getToken();
            const res = await authApi(token).put(
                endpoints["put_jobSeeker"]
                    (user.jobSeeker.id),
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (res.status === 200) {
                alert('Cập nhật thông tin thành công!');
                navigate('/applicant-profile')
                // dispatch({
                //     type: 'update_applicant',
                //     payload: res.data 
                // });
                // navigate("/ProfileApplicant");
            } else {
                console.error('Lỗi khi cập nhật thông tin');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
        }
    };

    const handleSubmit = () => {
        updateApplicantInfo();
    };

    const handleDeleteImage = () => {
        setSelectedFile(null);
    };

    return (
            <div className="mx-auto p-4 w-[70%] shadow-md my-10  rounded-lg max-w-2xl bg-fuchsia-50">
                <h2 className="text-3xl text-orange-700 flex justify-center my-10 ">CẬP NHẬT THÔNG TIN ỨNG VIÊN</h2>
                <p className="mb-4">Bạn vui lòng hoàn thiện các thông tin dưới đây:</p>

                {/* <div>
                    <TextField
                        select
                        label="Lĩnh vực công việc *"
                        value={selectedCareer ? selectedCareer.id : ''}
                        onClick={() => setCareerModal(true)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        {careers.map((career) => (
                            <MenuItem key={career.id} value={career.id}>
                                {career.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div> */}

                <div className="mb-4">
                    <label className="block text-gray-700">Vị trí *</label>
                    <input
                        type="text"
                        placeholder="Nhập vị trí muốn ứng tuyển"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Mức lương mong muốn *</label>
                    <select
                        value={salaryExpectation}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Chọn mức lương</option>
                        {salaryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="mb-4">
                <label className="block text-gray-700">Mức lương mong muốn *</label>
                <select
                    value={salaryExpectation}
                    onChange={(e) => setSalary(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                >
                    <option value="">Chọn mức lương</option>
                    {salaryOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div> */}

                <div className="mb-4">
                    <label className="block text-gray-700">Kinh nghiệm *</label>
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Chọn kinh nghiệm</option>
                        {experienceOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    <p className="text-gray-600">Kéo và thả CV vào đây, hoặc nhấp để chọn tệp</p>
                </div>
                {selectedFile && (
                    <div className="relative mt-4 mx-auto w-32 h-32">
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="w-full h-full object-cover" />
                        <button
                            onClick={handleDeleteImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <p className="absolute top-0 -right-10 text-red-500 p-1 -mt-3 -mr-2">Hủy</p>
                    </div>
                )}

                <div className="flex justify-center my-10">
                    <button onClick={handleSubmit} className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        Cập nhật
                    </button>
                </div>
            </div>
    );
};

export default UpdateInfoApplicant;
