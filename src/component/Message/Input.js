import React from 'react'
import Img from "../../assets/img.png"
import Attach from "../../assets/attach.png"

const Input = () => {
  return (
    <div className="h-12 bg-white p-2.5 flex items-center justify-between">
      <input
        type='text'
        className="w-[75%] border-none outline-none text-[#2f2d52] text-lg placeholder:text-gray-300"
        placeholder="Type something..."
      />
      <div className="flex items-center gap-2.5">
        <img src={Attach} alt="" className="h-6 cursor-pointer" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <img src={Img} alt="" className="h-6 cursor-pointer" />

        <button className="border-none py-1 px-4 text-white bg-[#45527f] cursor-pointer">Send</button>
      </div>
    </div>
  )
}

export default Input
