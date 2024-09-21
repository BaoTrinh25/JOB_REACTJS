import React from 'react'
import avatar from "../../assets/default_avatar.png";

const Chats = () => {
  return (
    <div>
      <div
        className="flex items-center gap-2 p-2 text-white cursor-pointer hover:bg-[#2f2d52]"
      >
        <img
          src={avatar}
          alt="User Avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <span className="text-lg font-medium">Jane</span>
          <p className="text-sm text-gray-400">Hello</p>
        </div>
      </div>
      <div
        className="flex items-center gap-2 p-2 text-white cursor-pointer hover:bg-[#2f2d52]"
      >
        <img
          src={avatar}
          alt="User Avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <span className="text-lg font-medium">Jane</span>
          <p className="text-sm text-gray-400">Hello</p>
        </div>
      </div>
      <div
        className="flex items-center gap-2 p-2 text-white cursor-pointer hover:bg-[#2f2d52]"
      >
        <img
          src={avatar}
          alt="User Avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <span className="text-lg font-medium">Jane</span>
          <p className="text-sm text-gray-400">Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats