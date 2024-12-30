import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios.js"
import { Socket } from "socket.io-client";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set,get) => ({
  messages:[],
  users:[],
  selectedUser: null,
  isUserLoading:false,
  isMsgLoading:false,

  getUsers:async() => {
    set({isUserLoading:true});
    try {
      const response = await axiosInstance.get("/msg/users");
      set({users:response.data});
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isUserLoading:false})
    }
  },

  getMsg:async(userId) => {
    set({isMsgLoading:true});
    try {
      const response = await axiosInstance.get(`/msg/${userId}`);
      set({messages:response.data});
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      set({isMsgLoading:false})
    }
  },

  sendMsg:async(msgData) => {
    const{selectedUser,messages} = get();
    try{
      const response = await axiosInstance.post(`/msg/send-msg/${selectedUser._id}`, msgData);
      set({messages:[...messages, response.data]});
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  setSelectedUser: (selectedUser)=> set({selectedUser}),

  listenToMsg: () => {
    const {selectedUser} = get();
    if(!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMsg", (newMessage) => {
      if(newMessage.senderId !== selectedUser._id) return;

      set({messages:[...get().messages, newMessage]})
    })
  },

  notListenToMsg : () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMsg");
  }

}))