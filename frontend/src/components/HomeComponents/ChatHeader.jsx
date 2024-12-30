import React from 'react'
import { useChatStore } from '../../store/useChatStore'
import { useAuthStore } from '../../store/useAuthStore';
import userAvatar from "../../assets/images/user.png";
import { X } from 'lucide-react';

function ChatHeader() {
  const{selectedUser, setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();
  return (
    <div className='px-4 py-2 border-b border-base-300 bg-base-100'>
          <div className='flex items-center justify-between gap-4 w-full'>
          <div className='flex items-center gap-4'>
            <div className='avatar size-12 rounded-full relative'>
              <img src={selectedUser.profilePic || userAvatar} className='rounded-full'></img>
            </div>
            <div>
              <h2 className='font-medium truncate'>{selectedUser.fullName}</h2>
              <p className='text-sm italic text-zinc-500'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
            </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className=' items-end'><X /></button>
          </div>
          </div>
  )
}

export default ChatHeader