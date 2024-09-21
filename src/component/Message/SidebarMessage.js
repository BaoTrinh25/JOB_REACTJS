import React, { useContext } from 'react'
import NavbarMessage from './NavbarMessage'
import Search from './Search'
import Chats from './Chats'


const SidebarMessage = () => {

  return (
    <div className="flex-[1.5] bg-[#3e3c61] relative">
      <NavbarMessage />
      <Search />
      <Chats />
    </div>


  )
}

export default SidebarMessage