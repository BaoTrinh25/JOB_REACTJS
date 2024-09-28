import React, { useState } from 'react';

const ChatBox = ({ job, curentChatUser, messages, sendMessage, input, setInput, setChatBoxOpen }) => {
    return (
        <div className="fixed bottom-0 right-0 w-80 h-80 bg-white shadow-lg border rounded-t-lg flex flex-col">
            <div className="flex justify-between items-center p-3 bg-gray-800 text-white">
                {user && user.role === 0 ? (
                    <span>NTD - {job.user.username}</span>
                ) : (
                    <span>Ứng viên - {curentChatUser.username}</span>
                )}
                
                <button onClick={() => setChatBoxOpen(false)} className="text-red-500">X</button>
            </div>
            <div className="flex-grow p-3 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <div className='flex flex-col mb-2'>
                            <div className="flex items-center">
                                <img
                                    src={msg.sender.avatar}
                                    alt="Avatar"
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                <p>
                                    <small>{msg.sender.username}</small>: {msg.message}
                                </p>
                            </div>
                            <span className='text-xs text-gray-500'>{job.title}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3">
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Nhập tin nhắn..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage} className="mt-2 w-full bg-yellow-700 text-white py-2 rounded">
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
