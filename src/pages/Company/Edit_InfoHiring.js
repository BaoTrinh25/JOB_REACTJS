import React, { useState, useContext, useRef } from 'react';
import { MyUserContext } from '../../configs/Context';
import { useNavigate } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import { AiOutlineDelete } from 'react-icons/ai';

const EditInfoHiring = () => {
    const user = useContext(MyUserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        username: user.username || '',
        gender: user.gender || 0,
        email: user.email || '',
        mobile: user.mobile || '',
        avatar: user.avatar || '',
    });
    const [avatarImage, setAvatarImage] = useState(null);
    const editorRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        console.log("Saved Data: ", formData);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImage(file);
        }
    };

    const handleAvatarUpload = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImage();
            console.log(canvas.toDataURL());
        }
    };

    const handleDeleteAvatar = () => {
        setAvatarImage(null);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                        {avatarImage && (
                            <div className="ml-4 relative">
                                <AvatarEditor
                                    ref={editorRef}
                                    image={avatarImage}
                                    width={250}
                                    height={250}
                                    border={50}
                                    color={[255, 255, 255, 0.6]} // RGBA
                                    scale={1.2}
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
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditInfoHiring;
