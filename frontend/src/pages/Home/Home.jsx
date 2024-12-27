import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import Sidebar from '../../components/HomeComponents/Sidebar';
import NoChatSelected from '../../components/HomeComponents/NoChatSelected';
import ChatContainer from '../../components/HomeComponents/ChatContainer';

function Home() {
  const {selectedUser} = useChatStore();
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex-items-center justify-center pt-20 lg:px-24 md:px-16 px-4'>
        <div className='bg-base-100 p-4 rounded-lg shadow-lg w-full h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home