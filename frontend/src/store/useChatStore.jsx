import {create} from "zustand"
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios.js"

export const useChatStore = create((set) => ({
  messages:[],
  users:[],
  selectedUser:null,
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

  getMsg:async() => {
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



  setSelectedUser: (selectedUser)=> set({selectedUser}),

}))