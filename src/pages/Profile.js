import { useContext } from "react";
import { MyDispatchContext, MyUserContext } from "../configs/Context";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const user = useContext(MyUserContext)
    const dispatch = useContext(MyDispatchContext)
    const nav = useNavigate()

    const handleLogout = () => {
        // Thực hiện các thao tác đăng xuất ở đây (ví dụ: xóa token, reset state, vv.)
        dispatch({"type": "logout"})
        
        // Chuyển hướng về trang chủ
        nav('/');
      };
    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-between p-8">
            <div className="flex-1 max-w-md ">
                <h1 className="text-2xl text-orange-500 mb-6">Thông Tin Người dùng</h1>
                <h2>Chào {user.username}</h2>
                <p>{user.role}</p>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
        
    );
};

export default Profile;