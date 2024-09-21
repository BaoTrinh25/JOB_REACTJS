import React, { useContext } from 'react'
import { MyDispatchContext, MyUserContext, useAuth } from '../../configs/Context';
import Logout from '../../pages/User/Logout';

const NavbarMessage = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const logout = Logout(dispatch);

  return (
    <div className="flex items-center justify-between bg-[#2f2d52] h-12 p-2 text-[#ddddf7]">
      <span className="font-bold hidden md:inline">Nako Chat</span>
      <div className="flex items-center gap-2">
        <img 
          src={user?.avatar} 
          alt="user avatar" 
          className="bg-[#ddddf7] h-6 w-6 rounded-full object-cover" 
        />
        <span>{user?.username}</span>
        <button 
          className="bg-[#5d5b8d] text-[#ddddf7] text-xs border-none cursor-pointer px-2 py-1"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default NavbarMessage