import React from 'react'
import Message from '../Message'

const Messages = () => {
  return (
    <div className="bg-[#ddddf7] p-2.5 overflow-y-scroll" style={{ height: 'calc(100% - 100px)' }}>
      <Message isOwner={true} /> 
      <Message isOwner={false} /> 
      <Message isOwner={true} /> 
      <Message isOwner={false} /> 
      
    </div>
  )
}

export default Messages
