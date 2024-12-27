import React, { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Loader, Radio, Users } from 'lucide-react';
import userAvatar from "../../assets/images/user.png";
import { useAuthStore } from '../../store/useAuthStore';

function Sidebar() {
  const { getUsers, users, selectedUser,setSelectedUser, isUserLoading} = useChatStore();

  const {onlineUsers} = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);



  if (isUserLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <aside className='h-full w-20 lg:w-72 boarder-r border-base-300 flex flex-col transition-all duration-200'>
    <div className='border-b border-base-300 w-full p-5'>
      <div className='flex items-center gap-4'>
        <Users className='size-6' />
        <span className='font-semibold text-xl hidden lg:block'>Contacts</span>
      </div>
      <input type='radio' id='online' name='online' className='mt-8 mr-4 hidden lg:inline'></input>
      <label htmlFor='online' className='font-medium text-lg hidden lg:inline'>Show Online Only!</label>
    </div>

    <div className='overflow-y-auto w-full py-3 '>
      {users.map((user) => (
        <button key={user._id} onClick={() => setSelectedUser(user)} className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-all ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""} `}>
          <div className='relative mx-auto lg:mx-0'>
            <img src={user.profilePic || userAvatar} alt={user.fullName} className='size-12 object-cover rounded-full'></img>
            {onlineUsers.includes(user._id) &&(
              <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
            )}
          </div>
          <div className='hidden lg:block text-left min-w-0'>
            <div className='font-medium truncate'>{user.fullName}</div>
            <div className='text-sm italic text-zinc-500'>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
          </div>
        </button>
      ))}
    </div>
    </aside>
  )
}

export default Sidebar