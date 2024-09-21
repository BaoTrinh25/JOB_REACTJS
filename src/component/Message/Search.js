import React, { useState } from 'react';
import avatar from "../../assets/avatar_fe2.jpg";


const Search = () => {
  const [username, setUsername] = useState('');
  const user = { avatar: 'https://via.placeholder.com/50', username: 'John Doe' }; // Example user

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      // Handle search action here
      console.log('Searching for:', username);
    }
  };

  const handleSelect = () => {
    // Handle user select action
    console.log('User selected:', user.username);
  };

  return (
    <div className="border-b border-gray-500">
      <div className="p-2">
        <input
          type="text"
          placeholder="Find a user"
          className="bg-transparent border-none text-white outline-none placeholder-lightgray"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div
        className="flex items-center gap-2 p-2 text-white cursor-pointer hover:bg-[#2f2d52]"
        onClick={handleSelect}
      >
        <img
          src={avatar}
          alt="User Avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <span className="text-lg font-medium">{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
