import React, { useState, useEffect } from 'react';
import APIs, { endpoints } from '../configs/APIs';

const About = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); 
      try {
        const res = await APIs.get(endpoints['users']);
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers(); 
}, []); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={user.avatar} alt={user.username} className="rounded-full w-20 h-20 mx-auto mb-2" />
              <p className="text-center text-lg font-semibold">{user.first_name} {user.last_name}</p>
              <p className="text-center text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
