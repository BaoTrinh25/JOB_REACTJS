import React, { useState, useEffect } from "react";
import avatar_default from '../../assets/default_avatar.png';

const UserChatList = ({ user, onSelectChatUser }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${user.id}/`);
    setSocket(ws);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "user_chat_rooms", user_id: user.id }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'user_chat_rooms') {
        setChatRooms(data.rooms);
        console.log(data.rooms);
      }
    };

    return () => {
      ws.close();
    };
  }, [user.id]);

  return (
    <div className="user-chat-list">
      {chatRooms.map((room, index) => (
        <div
          key={index}
          className="flex items-center p-2 border-b cursor-pointer hover:bg-gray-600 "
          onClick={() => onSelectChatUser(room.sender_user)}
        >
          <img
            src={room.sender_user.avatar || avatar_default}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{room.sender_user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChatList;