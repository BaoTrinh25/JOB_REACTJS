import React, { useContext } from "react";
import Add from "../../assets/img.png";
import More from "../../assets/more.png";
import Cam from "../../assets/cam.png";
import Messages from "./Messages";
import Input from "./Input"


import { MyUserContext } from "../../configs/Context";

const Chat = () => {
  const user = useContext(MyUserContext);

  return (
    <div className="flex-[3] flex flex-col">
      <div className="h-12 bg-[#5d5b8d] flex items-center justify-between p-3 text-gray-300">
        <span>{user?.username}</span>
        <div className="flex gap-3">
          <img src={Cam} alt="Camera Icon" className="h-6 cursor-pointer" />
          <img src={Add} alt="Add Icon" className="h-6 cursor-pointer" />
          <img src={More} alt="More Options Icon" className="h-6 cursor-pointer" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
