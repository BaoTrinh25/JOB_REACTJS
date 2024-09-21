import React from 'react'
import img from "../assets/avatar_fe2.jpg"
import avatar from "../assets/default_avatar.png"

const Message = ({ isOwner }) => {
    return (
        <div className={`flex gap-5 mb-5 ${isOwner ? 'flex-row-reverse' : ''}`}>
            <div className='flex flex-col text-gray-500 font-light'>
                <img src={avatar} className='w-10 h-10 rounded-full object-cover' alt='' />
                <span>just now</span>
            </div>
            <div className={`flex flex-col gap-2.5 max-w-[80%] ${isOwner ? 'items-end' : 'items-start'}`}>
                <p className={`p-2.5 rounded-lg ${isOwner ? 'bg-blue-400 text-white rounded-tl-lg rounded-bl-lg' : 'bg-white text-gray-900 rounded-tr-lg rounded-br-lg'}`}>
                    hello
                </p>
                <img src={img} className='w-[50%]' alt='' />
            </div>
        </div>
    )
}

export default Message
