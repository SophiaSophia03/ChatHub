import React from 'react'
import ChatIcon from "../../assets/images/chat.png";


function NoChatSelected() {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
      <div className='max-w-md text-center space-y-6'>
        <div className='flex justify-center gap-4 mb-4'>
          <div className='relative'>
            <div className='w-16 h-16 rounded-2xl flex text-center justify-center animate-bounce '>
              <img src={ChatIcon} alt="Chat Icon"></img>
            </div>
          </div>
        </div>
        <h2 className='text-2xl font-bold'>Welcome to ChatHub</h2>
        <p className='text-xl text-base-content/60'>Select a conversation from the sidebar to start chatting...</p>
      </div>
    </div>
  )
}

export default NoChatSelected