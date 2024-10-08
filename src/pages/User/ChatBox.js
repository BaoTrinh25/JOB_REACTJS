import React, { useState, useEffect, useRef } from "react";
import avatar_default from '../../assets/default_avatar.png';

const ChatBox = ({ currentChatUser, currentUser, jobId, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${jobId}/`);

    newSocket.onopen = () => {
      console.log("WebSocket Connected");
      newSocket.send(JSON.stringify({
        type: "previous_messages",
        sender_id: currentUser.id,
        receiver_id: currentChatUser.id,
        jobId: jobId
      }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "previous_messages") {
        setMessages(data.messages);
      } else {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    };

    newSocket.onclose = () => console.log("WebSocket Disconnected");

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [currentChatUser, currentUser, jobId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const messageData = {
        type: "chat",
        message: input,
        sender_id: currentUser.id,
        receiver_id: currentChatUser.id,
        jobId: jobId,
        sender: {
          id: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar
        }
      };
      socket.send(JSON.stringify(messageData));
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-64 h-96 bg-white shadow-lg rounded-t-lg z-10 mr-5 border-2 border-orange-200">
      <div className="flex justify-between items-center bg-slate-500 p-3 rounded-t-lg">
        <div className="flex items-center">
          <img 
            src={currentChatUser?.avatar || avatar_default}
            alt="Avatar" 
            className="w-8 h-8 rounded-full mr-2"
          />
          <h2 className="text-lg font-bold text-white">{currentChatUser.username}</h2>
        </div>
        <button onClick={onClose} className="text-white text-xl hover:text-red-500">
          &times;
        </button>
      </div>
      <div className="flex flex-col mt-4 h-64 overflow-y-auto px-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex items-start ${
              msg.sender_id === currentUser.id ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender_id !== currentUser.id && (
              <img 
                src={msg.sender?.avatar || avatar_default}
                alt="Avatar" 
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div className={`p-2 rounded-lg ${
              msg.sender_id === currentUser.id ? "bg-blue-100" : "bg-gray-100"
            } max-w-[70%]`}>
              <p className="text-sm">{msg.message}</p>
            </div>
            {msg.sender_id === currentUser.id && (
              <img 
                src={currentUser.avatar || avatar_default}
                alt="Avatar" 
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-2 flex p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="w-full px-2 py-1 border border-gray-300 rounded-lg mr-2"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-700 hover:bg-yellow-900 text-white px-4 py-1 rounded-lg"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatBox;