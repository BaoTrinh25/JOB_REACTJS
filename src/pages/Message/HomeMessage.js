import React from 'react'
import SidebarMessage from '../../component/Message/SidebarMessage';
import Chat from '../../component/Message/Chat';

const HomeMessages = () => {
  return (
    <div className="bg-[#adb5cc] h-screen flex items-center justify-center">
      <div className="border border-white rounded-lg w-10/12 md:w-5/6 h-[90%] flex overflow-hidden">
        <SidebarMessage />
        <Chat />
      </div>
    </div>
  )
}

export default HomeMessages