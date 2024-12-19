import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser:null,
  isSigningUp:false,
  isLoggingIn:false,
  isUpdatingProfile:false,

  isCheckingAuth:true,

  checkAuth: async()=> {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({authUser:response.data});
    } catch (error) {
      console.log("Error in check Auth function", error)
      set({authUser:null})
    }finally{
      set({ isCheckingAuth:false })
    }
  },

  signup: async(data)=> {
    set({isSigningUp : true})
    try {
      const response = await axiosInstance.post("/auth/signup",data);
      set({authUser:response.data})
      toast.success("Account created successfully!")
    } catch (error) {
      console.log("Error in signup function", error.response.data.message)
    }finally{
      set({isSigningUp:false})
    }
  },

  logout:async(data) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({authUser:null});
      toast.success("Logout successfully")
    } catch (error) {
      console.log("Error in logout function", error.response.data.message)
    }
  }
}))